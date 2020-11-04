/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import ReactNativePropRegistry from '../../modules/ReactNativePropRegistry';
import flattenStyle from './flattenStyle';
import { inline, stringifyValueWithProperty } from './compile'

const absoluteFillObject = {
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0
};
const absoluteFill = ReactNativePropRegistry.register(absoluteFillObject);

/**
 * 处理 含有 className 和 object 的样式
 * @param styles
 * @returns {{style: {}, classList: []}}
 */
const convertStyle = (styles)=>{
  const classList = [];
  const style = {};
  const convert = (value)=>{
    if(typeof value === 'string'){
      classList.push(value)
    }else {
      if(Array.isArray(value)){
        value.forEach(item =>{
          convert(item)
        })
      }else {
        value && Object.assign(style,inline(value))
      }
    }
  }
  convert(styles)
  return {classList,style}
}

const StyleSheet = {
  absoluteFill,
  absoluteFillObject,
  compose(style1: any, style2: any) {
    if (process.env.NODE_ENV !== 'production') {
      /* eslint-disable prefer-rest-params */
      const len = arguments.length;
      if (len > 2) {
        const readableStyles = [...arguments].map(a => flattenStyle(a));
        throw new Error(
          `StyleSheet.compose() only accepts 2 arguments, received ${len}: ${JSON.stringify(
            readableStyles
          )}`
        );
      }
      /* eslint-enable prefer-rest-params */
    }

    if (style1 && style2) {
      return [style1, style2];
    } else {
      return style1 || style2;
    }
  },
  create(styles: Object) {
    const result = {};
    Object.keys(styles).forEach(key => {
      if (process.env.NODE_ENV !== 'production') {
        const validate = require('./validate');
        const interopValidate = validate.default ? validate.default : validate;
        interopValidate(key, styles);
      }
      result[key] = inline(styles[key])
    });
    return result;
  },
  flatten: flattenStyle,
  convert: convertStyle,

  // `hairlineWidth` is not implemented using screen density as browsers may
  // round sub-pixel values down to `0`, causing the line not to be rendered.
  hairlineWidth: 1
};

export default StyleSheet;

