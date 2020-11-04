/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */
'use strict';

import { AnimatedEvent } from './AnimatedEvent';
import AnimatedProps from './nodes/AnimatedProps';
import * as React from 'react';
import invariant from 'fbjs/lib/invariant';
import Text from '../../../exports/Text'
import objectUtil from './util'

function createAnimatedComponent(Component: any, defaultProps: any): any {
  invariant(
    typeof Component !== 'function' ||
      (Component.prototype && Component.prototype.isReactComponent),
    '`createAnimatedComponent` does not support stateless functional components; ' +
      'use a class component instead.',
  );

  class AnimatedComponent extends React.Component<Object> {
    _component: any;
    _invokeAnimatedPropsCallbackOnMount: boolean = false;
    _prevComponent: any;
    _propsAnimated: AnimatedProps;
    _eventDetachers: Array<Function> = [];

    static __skipSetNativeProps_FOR_TESTS_ONLY = false;

    constructor(props: Object) {
      super(props);
      this.state = {
        animationStyle:{}
      }
      this.animationConfig = undefined;
      this.log = false;
    }

    componentWillUnmount() {
      this._propsAnimated && this._propsAnimated.__detach();
      this._detachNativeEvents();
    }

    setNativeProps(props) {
      this._component.setNativeProps(props);
    }

    UNSAFE_componentWillMount() {
      this._attachProps(this.props);
    }

    componentDidMount() {
      if (this._invokeAnimatedPropsCallbackOnMount) {
        this._invokeAnimatedPropsCallbackOnMount = false;
        this._animatedPropsCallback();
      }
      this._propsAnimated.setNativeView(this._component);
      this._attachNativeEvents();
    }

    _attachNativeEvents() {
      // Make sure to get the scrollable node for components that implement
      // `ScrollResponder.Mixin`.
      const scrollableNode = this._component.getScrollableNode
        ? this._component.getScrollableNode()
        : this._component;

      for (const key in this.props) {
        const prop = this.props[key];
        if (prop instanceof AnimatedEvent && prop.__isNative) {
          prop.__attach(scrollableNode, key);
          this._eventDetachers.push(() => prop.__detach(scrollableNode, key));
        }
      }
    }

    _detachNativeEvents() {
      this._eventDetachers.forEach(remove => remove());
      this._eventDetachers = [];
    }

    // The system is best designed when setNativeProps is implemented. It is
    // able to avoid re-rendering and directly set the attributes that changed.
    // However, setNativeProps can only be implemented on leaf native
    // components. If you want to animate a composite component, you need to
    // re-render it. In this case, we have a fallback that uses forceUpdate.
    _animatedPropsCallback = (isStart) => {
      if (this._component == null) {
        // AnimatedProps is created in will-mount because it's used in render.
        // But this callback may be invoked before mount in async mode,
        // In which case we should defer the setNativeProps() call.
        // React may throw away uncommitted work in async mode,
        // So a deferred call won't always be invoked.
        this._invokeAnimatedPropsCallbackOnMount = true;
      } else if (
        AnimatedComponent.__skipSetNativeProps_FOR_TESTS_ONLY ||
        typeof this._component.setNativeProps !== 'function'
      ) {
        this.forceUpdate();
      } else {
        // console.log("_animatedPropsCallback-------",this._propsAnimated,isStart,this._propsAnimated.__getAnimatedValue())
        const {_style} = this._propsAnimated._props.style
        let transitionList = [];
        const toStyle = {};
        for (const key in _style) {
          if(_style[key] && _style[key].config){
            const {config} = _style[key]
            const easing = config.easing ? config.easing() : ''
            transitionList.push(`${config.duration}ms ${key} ${easing}`)
            toStyle[key] = config.toValue
          }
        }
        // console.log("普通style动画",transitionList.join(","),toStyle)
        const transform = _style.transform
        if(transform){
          const {_transforms} = transform;
          if(_transforms && _transforms.length > 0){
            for(const i in _transforms){
              const t = _transforms[i];
              Object.keys(t).map((item)=>{
                const value = t[item];
                if(value._parent && value._parent.config){
                  const config = value._parent.config;
                  const easing = config.easing ? config.easing() : ''
                  transitionList.push(`${config.duration}ms transform ${easing}`)
                  // 插值器
                  const {inputRange,outputRange} = value._config;
                  const _toValue = config.toValue * (parseInt(outputRange[outputRange.length - 1]) - parseInt(outputRange[0])) / (inputRange[inputRange.length - 1] - inputRange[0])
                  const unit = String(outputRange[0]).replace(/\d/g,'')
                  // console.log("--unit----",unit)
                  toStyle.transform = [{[item]:unit ? `${_toValue}${unit}` : _toValue}]
                  // console.log("transform 插值动画",transitionList.join(","),toStyle)
                }else{
                  const config = value.config;
                  if(config){
                    const easing = config.easing ? config.easing() : ''
                    transitionList.push(`${config.duration}ms transform ${easing}`)
                    toStyle.transform = [{[item]:config.toValue}]
                    // console.log("transform 普通动画-------",transitionList.join(","),toStyle)
                  }
                }
              })
            }
          }
        }
        if(isStart){
          // 防止多个动画存在时，导致重复设置
          this.startTimer && clearTimeout(this.startTimer)
          this.startTimer = setTimeout(()=>this.setState({animationStyle:{ transition: transitionList.join(",") ,...toStyle}}),20)
        }else{
          this.resetTimer && clearTimeout(this.resetTimer)
          this.resetTimer = setTimeout(()=>this.setState({animationStyle:{}}),10)
        }
      }
    };

    _attachProps(nextProps) {

      const oldPropsAnimated = this._propsAnimated;

      this._propsAnimated = new AnimatedProps(
        nextProps,
        this._animatedPropsCallback,
      );

      // When you call detach, it removes the element from the parent list
      // of children. If it goes to 0, then the parent also detaches itself
      // and so on.
      // An optimization is to attach the new elements and THEN detach the old
      // ones instead of detaching and THEN attaching.
      // This way the intermediate state isn't to go to 0 and trigger
      // this expensive recursive detaching to then re-attach everything on
      // the very next operation.
      oldPropsAnimated && oldPropsAnimated.__detach();
    }

    UNSAFE_componentWillReceiveProps(newProps) {
      this._attachProps(newProps);
    }

    componentDidUpdate(prevProps) {
      if (this._component !== this._prevComponent) {
        this._propsAnimated.setNativeView(this._component);
      }
      if (this._component !== this._prevComponent || prevProps !== this.props) {
        this._detachNativeEvents();
        this._attachNativeEvents();
      }
    }

    render() {
      const props = this._propsAnimated.__getValue();
      // console.log("==========================",[props.style,this.state.animationStyle])
      return (
        <Component
          {...defaultProps}
          {...props}
          style={[props.style,this.state.animationStyle]}
          ref={this._setComponentRef}
          // The native driver updates views directly through the UI thread so we
          // have to make sure the view doesn't get optimized away because it cannot
          // go through the NativeViewHierarchyManager since it operates on the shadow
          // thread.
          collapsable={false}
        />
      );
    }

    _setComponentRef = c => {
      this._prevComponent = this._component;
      this._component = c;
    };

    // A third party library can use getNode()
    // to get the node reference of the decorated component
    getNode() {
      return this._component;
    }
  }

  const propTypes = Component.propTypes;

  return AnimatedComponent;
}

export default createAnimatedComponent;
