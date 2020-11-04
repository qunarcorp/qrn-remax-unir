/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @noflow
 */

import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import debounce from 'debounce';
import findNodeHandle from '../../exports/findNodeHandle';

const emptyObject = {};
const registry = {};

let id = 1;
const guid = () => `r-${id++}`;


wx.onWindowResize(()=>{
  // instance && instance._handleLayout();
})

const observe = instance => {
  instance._handleLayout();
};

const unobserve = instance => {
 
};

const safeOverride = (original, next) => {
  if (original) {
    return function prototypeOverride() {
      /* eslint-disable prefer-rest-params */
      original.call(this, arguments);
      next.call(this, arguments);
      /* eslint-enable prefer-rest-params */
    };
  }
  return next;
};

let wxQuery = null;
const getWxQuery = () => {
    if(!wxQuery){
        wxQuery = wx.createSelectorQuery();
    }
    return wxQuery;
} 

const applyLayout = Component => {
  const componentDidMount = Component.prototype.componentDidMount;
  const componentDidUpdate = Component.prototype.componentDidUpdate;
  const componentWillUnmount = Component.prototype.componentWillUnmount;

  Component.prototype.componentDidMount = safeOverride(
    componentDidMount,
    function componentDidMount() {
      if (this.props.onLayout) {
        observe(this);
      }
    }
  );

  Component.prototype.componentDidUpdate = safeOverride(
    componentDidUpdate,
    function componentDidUpdate(prevProps) {
      if (this.props.onLayout && !prevProps.onLayout) {
        observe(this);
      } else if (!this.props.onLayout && prevProps.onLayout) {
        unobserve(this);
      }
    }
  );

  Component.prototype.componentWillUnmount = safeOverride(
    componentWillUnmount,
    function componentWillUnmount() {
      if (this.props.onLayout) {
        unobserve(this);
      }
    }
  );

  Component.prototype._handleLayout = function() {
    let times = 0, hasCallBack = false;
    const { onLayout } = this.props;
    if (onLayout) {
      let inervalId = setInterval(()=>{
        times ++;
        getWxQuery().select('#' + this.wxId).boundingClientRect((res) => {
          const {
              left, top, width, height
          } = this.layoutRes || {};
          if(res && !hasCallBack && (
              left != res.left || 
              top != res.top || 
              width != res.width || 
              height != res.height)){
                  this.layoutRes = {
                      left: res.left,
                      top: res.top, 
                      width: res.width, 
                      height: res.height
                  }
                  const _res = {
                      nativeEvent: { 
                          layout: {
                              x: res.left,
                              y: res.top,
                              width: res.width,
                              height: res.height
                          }
                      }
                  }
                  hasCallBack = true
                  onLayout(_res)
          }
        }).exec();
        if(hasCallBack || times >= 5){
          clearInterval(inervalId)
        }
      }, 100) // 实际上运行是多数情况是回调耗时远大于50ms, 导致反复执行多次，虽然通过变量控制能够防止多次回调onLayout，但是有性能开销
    }
  };
  return Component;
};

export default applyLayout;
