/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type { ColorValue } from '../../types';
import type { ViewProps } from '../View';

import applyNativeMethods from '../../modules/applyNativeMethods';

import React from 'react';
import { Switch as RSwitch } from '@remax/wechat'

type SwitchProps = {
  ...ViewProps,
  activeThumbColor?: ColorValue,
  activeTrackColor?: ColorValue,
  disabled?: boolean,
  onValueChange?: (e: any) => void,
  thumbColor?: ColorValue,
  trackColor?: ColorValue | {| false: ColorValue, true: ColorValue |},
  value?: boolean
};

const emptyObject = {};
const thumbDefaultBoxShadow = '0px 1px 3px rgba(0,0,0,0.5)';

class Switch extends React.Component<SwitchProps> {

  static displayName = 'Switch';

  render() {
    const {
      accessibilityLabel,
      activeThumbColor = '#009688',
      activeTrackColor = '#A3D3CF',
      disabled = false,
      onValueChange, // eslint-disable-line
      style = emptyObject,
      thumbColor = '#FAFAFA',
      trackColor = '#939393',
      value = false,
      ...other
    } = this.props;

    const supportedProps = {
      checked: value,
      disabled: disabled,
      onChange: this._handleChange,
      style: style,
      // style: [styles.nativeControl, styles.cursorInherit],
      type:'switch',
      color:activeThumbColor
    }
    return (
        <RSwitch {...supportedProps}/>
    );
  }

  _handleChange = (event: Object) => {
    const { onValueChange } = this.props;
    onValueChange && onValueChange(event.detail.value);
  };
}

export default applyNativeMethods(Switch);
