/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * @flow
 */

'use strict'

import ensurePositiveDelayProps from '../Touchable/ensurePositiveDelayProps'
import * as React from 'react'
import StyleSheet from '../StyleSheet'
import { View } from '@remax/one'
import createTouchableEvent from '../Touchable/TouchableEvent'

type BlurEvent = Object;
type FocusEvent = Object;
type PressEvent = Object;
type LayoutEvent = Object;
type EdgeInsetsProp = Object;

const PRESS_RETENTION_OFFSET = {
    top: 20,
    left: 20,
    right: 20,
    bottom: 30
}

const OVERRIDE_PROPS = [
    'accessibilityLabel',
    'accessibilityHint',
    'accessibilityIgnoresInvertColors',
    'accessibilityRole',
    'accessibilityState',
    'hitSlop',
    'nativeID',
    'onBlur',
    'onFocus',
    'onLayout',
    'testID'
]

export type Props = $ReadOnly<{|
    accessible?: ?boolean,
    accessibilityLabel?: ?string,
    accessibilityHint?: ?string,
    accessibilityIgnoresInvertColors?: ?boolean,
    accessibilityRole?: ?string,
    accessibilityState?: ?Object,
    children?: ?React.Node,
    delayLongPress?: ?number,
    delayPressIn?: ?number,
    delayPressOut?: ?number,
    disabled?: ?boolean,
    hitSlop?: ?EdgeInsetsProp,
    nativeID?: ?string,
    touchSoundDisabled?: ?boolean,
    onBlur?: ?(e: BlurEvent) => void,
    onFocus?: ?(e: FocusEvent) => void,
    onLayout?: ?(event: LayoutEvent) => mixed,
    onLongPress?: ?(event: PressEvent) => mixed,
    onPress?: ?(event: PressEvent) => mixed,
    onPressIn?: ?(event: PressEvent) => mixed,
    onPressOut?: ?(event: PressEvent) => mixed,
    pressRetentionOffset?: ?EdgeInsetsProp,
    rejectResponderTermination?: ?boolean,
    testID?: ?string
|}>;

/**
 * Do not use unless you have a very good reason. All elements that
 * respond to press should have a visual feedback when touched.
 *
 * TouchableWithoutFeedback supports only one child.
 * If you wish to have several child components, wrap them in a View.
 */
// eslint-disable-next-line react/prefer-es6-class
class TouchableWithoutFeedback extends React.Component {
    displayName: 'TouchableWithoutFeedback'

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        ensurePositiveDelayProps(this.props)
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        ensurePositiveDelayProps(nextProps)
    }

    /**
     * `Touchable.Mixin` self callbacks. The mixin will invoke these if they are
     * defined on your component.
     */
    touchableHandlePress = (e: PressEvent) => {
        this.props.onPress && this.props.onPress(e)
    }

    touchableHandleActivePressIn = (e: PressEvent) => {
        this.props.onPressIn && this.props.onPressIn(e)
    }

    touchableHandleActivePressOut = (e: PressEvent) => {
        this.props.onPressOut && this.props.onPressOut(e)
    }

    touchableHandleLongPress = (e: PressEvent) => {
        this.props.onLongPress && this.props.onLongPress(e)
    }

    render() {
        // fix touchable组件尺寸异常问题
        const { classList, style } = StyleSheet.convert(this.props.style)
        return (<View
                onTouchStart={(e)=>this.touchableHandleActivePressIn(createTouchableEvent(e))}
                onTouchEnd={(e)=>this.touchableHandleActivePressOut(createTouchableEvent(e))}
                onTap={(e)=>this.touchableHandlePress(createTouchableEvent(e))}
                onLongTap={(e)=>this.touchableHandleLongPress(createTouchableEvent(e))}
                className="view-default"
                style={style}
            >
                {this.props.children}
            </View>
        )
    }
}

export default TouchableWithoutFeedback
