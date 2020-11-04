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
  source: true,
  resizeMode: true,
  onLoad: true,
  onError: true,
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
