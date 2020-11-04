/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type { ViewProps } from '../View';
import type { ResizeMode, Source, Style } from './types';

import StyleSheet from '../StyleSheet';
import * as React from 'react';
import RemaxImage from './RemaxImage'
import applyLayout from '../../modules/applyLayout'
import applyNativeMethods from '../../modules/applyNativeMethods'
import filterSupportedProps from './filterSupportedProps';
import { getImageInfo } from '@remax/wechat';
import { guid } from '../../modules/gidConduct';

export type ImageProps = {
  ...ViewProps,
  blurRadius?: number,
  defaultSource?: Source,
  draggable?: boolean,
  onError?: (e: any) => void,
  onLayout?: (e: any) => void,
  onLoad?: (e: any) => void,
  onLoadEnd?: (e: any) => void,
  onLoadStart?: (e: any) => void,
  onProgress?: (e: any) => void,
  resizeMode?: ResizeMode,
  source: Source,
  style?: Style
};

type State = {
  layout: Object,
  shouldDisplaySource: boolean
};


class Image extends React.Component<ImageProps, State> {
  static displayName = 'Image';

  static getSize(uri, success, failure) {
    getImageInfo({
      src:uri,
      success:({width,height})=>{
        success(width,height)
      },
      failure
    })

  }

  static prefetch(uri) {

  }

  static queryCache(uris) {

  }


  constructor(props, context) {
    super(props, context);
    this.wxId = '';
  }

  _handleSupportedProps = () => {
    const supportedProps = filterSupportedProps(this.props)
    
    if(supportedProps.onLayout){
      // 处理ID
      if(this.props.id != null){
          this.wxId = this.props.id
      }else{
          this.wxId = guid();
      }
      supportedProps.id = this.wxId;
    }
    return supportedProps;
  }

  render() {
    const { style: _style, resizeMode = 'scaleToFill' } = this.props;
    const { classList, style } = StyleSheet.convert(_style)
    return <RemaxImage 
      {...this._handleSupportedProps()} 
      style={style} 
      className={classList.join(" ")}
      resizeMode={resizeMode}
      />
  }
}
export default applyLayout(applyNativeMethods(Image));
