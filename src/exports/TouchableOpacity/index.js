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

import type { Props as TouchableWithoutFeedbackProps } from '../TouchableWithoutFeedback'
import ensurePositiveDelayProps from '../Touchable/ensurePositiveDelayProps'
import * as React from 'react'
import StyleSheet from '../StyleSheet'
import { View } from '@remax/one'
import createTouchableEvent from '../Touchable/TouchableEvent'

const flattenStyle = StyleSheet.flatten

type PressEvent = Object;

type Props = $ReadOnly<{|
    ...TouchableWithoutFeedbackProps,
    activeOpacity?: ?number,
    style?: ?any
|}>;


// eslint-disable-next-line react/prefer-es6-class
class TouchableOpacity extends React.Component {

    static defaultProps = {
        activeOpacity: 0.2
    }

    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    getInitialState() {
        return {
            opacity: this._getChildStyleOpacityWithDefault()
        }
    }

    componentDidMount() {
        ensurePositiveDelayProps(this.props)
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        ensurePositiveDelayProps(nextProps)
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.disabled !== prevProps.disabled) {
            this._opacityInactive(250)
        }
    }

    /**
     * Animate the touchable to a new opacity.
     */
    setOpacityTo = (value: number, duration: number)=> {
        this.setState({opacity: value})
    }

    /**
     * `Touchable.Mixin` self callbacks. The mixin will invoke these if they are
     * defined on your component.
     */
    touchableHandleActivePressIn = (e: PressEvent)=> {
        this._opacityActive(0)
        this.props.onPressIn && this.props.onPressIn(e)
    }

    touchableHandleActivePressOut = (e: PressEvent) => {
        this._opacityInactive(2000)
        this.props.onPressOut && this.props.onPressOut(e)
    }

    touchableHandlePress = (e: PressEvent) => {
        this.props.onPress && this.props.onPress(e)
    }

    touchableHandleLongPress = (e: PressEvent) => {
        this.props.onLongPress && this.props.onLongPress(e)
    }

    touchableGetHitSlop = () => {
        return this.props.hitSlop
    }

    _opacityActive = (duration: number) => {
        this.setOpacityTo(this.props.activeOpacity, duration)
    }

    _opacityInactive = (duration: number) => {
        this.setOpacityTo(this._getChildStyleOpacityWithDefault(), duration)
    }

    _getChildStyleOpacityWithDefault = () => {
        const childStyle = flattenStyle(this.props.style) || {}
        return childStyle.opacity == null ? 1 : childStyle.opacity
    }

    render() {
        // fix touchable组件尺寸异常问题
        const { classList, style } = StyleSheet.convert(StyleSheet.flatten([
            styles.root,
            !this.props.disabled && styles.actionable,
            this.props.style,
            { opacity: this.state.opacity }
        ]))
        return (
            <View
                {...this.props}
                onTouchStart={(e)=>this.touchableHandleActivePressIn(createTouchableEvent(e))}
                onTouchEnd={(e)=>this.touchableHandleActivePressOut(createTouchableEvent(e))}
                onTap={(e)=>this.touchableHandlePress(createTouchableEvent(e))}
                onLongTap={(e)=>this.touchableHandleLongPress(createTouchableEvent(e))}
                className="view-default"
                style={style}
                testID={this.props.testID}
            >
                {this.props.children}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    root: {
        transitionProperty: 'opacity',
        transitionDuration: '0.15s',
        userSelect: 'none'
    },
    actionable: {
        touchAction: 'manipulation'
    }
})

export default TouchableOpacity;
