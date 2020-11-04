/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type { TextProps } from './types';

import applyLayout from '../../modules/applyLayout';
import applyNativeMethods from '../../modules/applyNativeMethods';
import css from '../StyleSheet/css';
import filterSupportedProps from '../View/filterSupportedProps';
import * as React from 'react';
import StyleSheet from '../StyleSheet';
import TextAncestorContext from './TextAncestorContext';
import RemaxText from './RemaxText'

class Text extends React.Component<TextProps> {
  static displayName = 'Text';

  renderText(hasTextAncestor) {
    const { dir, forwardedRef, numberOfLines, onPress, selectable, style } = this.props;

    const supportedProps = filterSupportedProps(this.props);

    if (onPress) {
      supportedProps.accessible = true;
      supportedProps.onClick = this._createPressHandler(onPress);
      supportedProps.onKeyDown = this._createEnterHandler(onPress);
    }

    supportedProps.classList = [
      classes.text,
      hasTextAncestor === true && classes.textHasAncestor,
      numberOfLines === 1 && classes.textOneLine,
      numberOfLines != null && numberOfLines > 1 && classes.textMultiLine
    ];
    // allow browsers to automatically infer the language writing direction
    supportedProps.dir = dir !== undefined ? dir : 'auto';
    supportedProps.ref = forwardedRef;
    supportedProps.style = [
      style,
      numberOfLines != null && numberOfLines > 1 && { WebkitLineClamp: numberOfLines },
      selectable === false && styles.notSelectable,
      onPress && styles.pressable
    ];

    const component = hasTextAncestor ? 'text' : 'view';
    // console.log("supportedProps-----",JSON.stringify(supportedProps.style),StyleSheet.convert(supportedProps.style))
    const { classList, style:_style } = StyleSheet.convert(supportedProps.style)
    supportedProps.className = classList.join(" ");
    supportedProps.style = _style;
    // return createElement(component, supportedProps);
    return <RemaxText {...supportedProps}/>
  }

  render() {
    return (
      <TextAncestorContext.Consumer>
        {hasTextAncestor => {
          const element = this.renderText(hasTextAncestor);
          return hasTextAncestor ? (
            element
          ) : (
            <TextAncestorContext.Provider value={true}>{element}</TextAncestorContext.Provider>
          );
        }}
      </TextAncestorContext.Consumer>
    );
  }

  _createEnterHandler(fn) {
    return e => {
      if (e.keyCode === 13) {
        fn && fn(e);
      }
    };
  }

  _createPressHandler(fn) {
    return e => {
      e.stopPropagation();
      fn && fn(e);
    };
  }
}

const classes = css.create({
  text: {
    border: '0 solid black',
    boxSizing: 'border-box',
    color: 'black',
    display: 'inline',
    font: '14px System',
    margin: 0,
    padding: 0,
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word'
  },
  textHasAncestor: {
    color: 'inherit',
    font: 'inherit',
    whiteSpace: 'inherit'
  },
  textOneLine: {
    maxWidth: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  // See #13
  textMultiLine: {
    display: '-webkit-box',
    maxWidth: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    WebkitBoxOrient: 'vertical'
  }
});

const styles = StyleSheet.create({
  notSelectable: {
    userSelect: 'none'
  },
  pressable: {
    cursor: 'pointer'
  }
});

export default applyLayout(applyNativeMethods(Text));
