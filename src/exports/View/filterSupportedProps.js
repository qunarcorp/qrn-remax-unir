/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @noflow
 */

const supportedProps = {
  children: true,
  pointerEvents: true,
  style: true,
  // testID: true,
  // 小程序适配，透传Touchable事件
  onPress: true,
  // Text
  selectable: true,
  className: true,
  hitSlop: true,
  animation: true,
  // Touchable
  // onTouchStart: true,
  // onTouchMove: true,
  // onTouchEnd: true,
  onLayout: true
};

const filterSupportedProps = props => {
  const safeProps = {};
  for (const prop in props) {
    if (props.hasOwnProperty(prop)) {
      if (supportedProps[prop] || prop.indexOf('aria-') === 0 || prop.indexOf('data-') === 0) {
        safeProps[prop] = props[prop];
      }
    }
  }
  return safeProps;
};

export default filterSupportedProps;
