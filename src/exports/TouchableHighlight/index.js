/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */
'use strict'

import type { Props as TouchableWithoutFeedbackProps } from '../TouchableWithoutFeedback'
import ensurePositiveDelayProps from '../Touchable/ensurePositiveDelayProps'
import * as React from 'react'
import StyleSheet from '../StyleSheet'
import { View } from '@remax/one'
import createTouchableEvent from '../Touchable/TouchableEvent'

type PressEvent = Object;

type Props = $ReadOnly<{|
    ...TouchableWithoutFeedbackProps,
    activeOpacity?: ?number,
    underlayColor?: ?any,
    style?: ?any,
    onShowUnderlay?: ?() => void,
    onHideUnderlay?: ?() => void,
    testOnly_pressed?: ?boolean
|}>;

/**
 * A wrapper for making views respond properly to touches.
 * On press down, the opacity of the wrapped view is decreased, which allows
 * the underlay color to show through, darkening or tinting the view.
 *
 * The underlay comes from wrapping the child in a new View, which can affect
 * layout, and sometimes cause unwanted visual artifacts if not used correctly,
 * for example if the backgroundColor of the wrapped view isn't explicitly set
 * to an opaque color.
 *
 * TouchableHighlight must have one child (not zero or more than one).
 * If you wish to have several child components, wrap them in a View.
 *
 * Example:
 *
 * ```
 * renderButton: function() {
 *   return (
 *     <TouchableHighlight onPress={this._onPressButton}>
 *       <Image
 *         style={styles.button}
 *         source={require('./myButton.png')}
 *       />
 *     </TouchableHighlight>
 *   );
 * },
 * ```
 *
 *
 * ### Example
 *
 * ```ReactNativeWebPlayer
 * import React, { Component } from 'react'
 * import {
 *   AppRegistry,
 *   StyleSheet,
 *   TouchableHighlight,
 *   Text,
 *   View,
 * } from 'react-native'
 *
 * class App extends Component {
 *   constructor(props) {
 *     super(props)
 *     this.state = { count: 0 }
 *   }
 *
 *   onPress = () => {
 *     this.setState({
 *       count: this.state.count+1
 *     })
 *   }
 *
 *  render() {
 *     return (
 *       <View style={styles.container}>
 *         <TouchableHighlight
 *          style={styles.button}
 *          onPress={this.onPress}
 *         >
 *          <Text> Touch Here </Text>
 *         </TouchableHighlight>
 *         <View style={[styles.countContainer]}>
 *           <Text style={[styles.countText]}>
 *             { this.state.count !== 0 ? this.state.count: null}
 *           </Text>
 *         </View>
 *       </View>
 *     )
 *   }
 * }
 *
 * const styles = StyleSheet.create({
 *   container: {
 *     flex: 1,
 *     justifyContent: 'center',
 *     paddingHorizontal: 10
 *   },
 *   button: {
 *     alignItems: 'center',
 *     backgroundColor: '#DDDDDD',
 *     padding: 10
 *   },
 *   countContainer: {
 *     alignItems: 'center',
 *     padding: 10
 *   },
 *   countText: {
 *     color: '#FF00FF'
 *   }
 * })
 *
 * AppRegistry.registerComponent('App', () => App)
 * ```
 *
 */
// eslint-disable-next-line react/prefer-es6-class
class TouchableHighlight extends React.Component {
    displayName: 'TouchableHighlight'
    static defaultProps = {
        activeOpacity: 0.85,
        delayPressOut: 100,
        underlayColor: 'black'
    }
    constructor(props: any) {
        super(props)
        this.state = {
            backgroundColor: 'none',
            activeOpacity: 1
        }
    }

    getInitialState() {
        return {}
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
    touchableHandleActivePressIn = (e: PressEvent) => {
        this._showUnderlay(e)
        this.props.onPressIn && this.props.onPressIn(e)
    }

    touchableHandleActivePressOut = (e: PressEvent) => {
        this._hideUnderlay(e)
        this.props.onPressOut && this.props.onPressOut(e)
    }

    touchableHandlePress = (e: PressEvent) => {
        this.props.onPress && this.props.onPress(e)
    }

    touchableHandleLongPress = (e: PressEvent) => {
        this.props.onLongPress && this.props.onLongPress(e)
    }

    _hasPressHandler() {
        return !!(
            this.props.onPress ||
            this.props.onPressIn ||
            this.props.onPressOut ||
            this.props.onLongPress
        )
    }

    _showUnderlay(e: PressEvent) {
        this.setState({
            backgroundColor: this.props.underlayColor,
            activeOpacity: this.props.activeOpacity
        })
        this.props.onShowUnderlay && this.props.onShowUnderlay(e);
    }

    _hideUnderlay(e: PressEvent) {
        setTimeout(()=>{
            this.setState({
                backgroundColor: 'none',
                activeOpacity: 1
            })
            this.props.onHideUnderlay && this.props.onHideUnderlay(e);
        },this.props.delayPressOut)
    }

    render() {
        const child = React.Children.only(this.props.children);
        // fix touchable组件尺寸异常问题
        const { classList, style } = StyleSheet.convert(StyleSheet.flatten([
            styles.root,
            !this.props.disabled && styles.actionable,
            this.props.style,
            {
                backgroundColor: this.state.backgroundColor,

            }
        ]))
        return (
            <View
                onTouchStart={(e)=>this.touchableHandleActivePressIn(createTouchableEvent(e))}
                onTouchEnd={(e)=>this.touchableHandleActivePressOut(createTouchableEvent(e))}
                onTap={(e)=>this.touchableHandlePress(createTouchableEvent(e))}
                onLongTap={(e)=>this.touchableHandleLongPress(createTouchableEvent(e))}
                className="view-default"
                style={style}
            >
                {React.cloneElement(child, {
                    style: StyleSheet.flatten(StyleSheet.compose(
                        child.props.style,
                        {opacity:this.state.activeOpacity}
                    ))
                })}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    root: {
        userSelect: 'none'
    },
    actionable: {
        cursor: 'pointer',
        touchAction: 'manipulation'
    }
})

export default TouchableHighlight
