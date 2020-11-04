/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import type { ViewProps } from './types'

import applyLayout from '../../modules/applyLayout'
import applyNativeMethods from '../../modules/applyNativeMethods'
import filterSupportedProps from './filterSupportedProps'
import StyleSheet from '../StyleSheet'
import TextAncestorContext from '../Text/TextAncestorContext'
import * as React from 'react'
import RemaxView from './RemaxView'
import Text from '../Text'
import { guid } from '../../modules/gidConduct';

export type { ViewProps }

const calculateHitSlopStyle = hitSlop => {
    const hitStyle = {}
    for (const prop in hitSlop) {
        if (hitSlop.hasOwnProperty(prop)) {
            const value = hitSlop[prop]
            hitStyle[prop] = value > 0 ? -1 * value : 0
        }
    }
    return hitStyle
}
 
let wxQuery = null;
const getWxQuery = () => {
    if(!wxQuery){
        wxQuery = wx.createSelectorQuery();
    }
    return wxQuery;
} 

class View extends React.Component<ViewProps> {
    static displayName = 'View'
    constructor(props){
        super(props)
        this.wxId = '';
        this.layoutRes = {}
    }

    renderView(hasTextAncestor) {
        const hitSlop = this.props.hitSlop
        const supportedProps = filterSupportedProps(this.props)

        if (process.env.NODE_ENV !== 'production') {
            React.Children.toArray(this.props.children)
                .forEach(item => {
                    if (typeof item === 'string') {
                        console.error(
                            `Unexpected text node: ${item}. A text node cannot be a child of a <View>.`
                        )
                    }
                })
        }
        supportedProps.style = StyleSheet.compose(
            hasTextAncestor && styles.inline,
            this.props.style
        )
        supportedProps.style = this.props.style;
        supportedProps.onTap = this.props.onPress
        const pointerEventsEnum = {
            'auto':'auto',
            'none':'none',
            'box-none':'box-none',
            'box-only':'box-only',
        }
        if(supportedProps.pointerEvents){
            const events = supportedProps.pointerEvents;
            if(events === pointerEventsEnum.auto || events === pointerEventsEnum.none){
                supportedProps.style = StyleSheet.compose(
                    {pointerEvents:pointerEventsEnum[events]},
                    supportedProps.style
                )
            }else {
                console.log('pointerEvents尚不支持auto | none 以外的属性值～。～')
                // throw new Error("pointerEvents only support auto|none in wechat")
            }
        }

        if (hitSlop) {
            const hitSlopStyle = calculateHitSlopStyle(hitSlop)
            const hitSlopChild = <Text style={[styles.hitSlop,hitSlopStyle]}/>
            supportedProps.children = React.Children.toArray([hitSlopChild, supportedProps.children])
        }
        const { classList, style } = StyleSheet.convert(supportedProps.style)
        // 默认样式
        supportedProps.className = "view-default " + classList.join(" ");
        supportedProps.style = style;
        supportedProps.id = this.props.id;
        if(supportedProps.onLayout){
            // 处理ID
            if(this.props.id != null){
                this.wxId = this.props.id
            }else{
                this.wxId = guid();
            }
            supportedProps.id = this.wxId;
        }
        return (<RemaxView {...supportedProps}/>)
    }



    render() {
        return (
            <TextAncestorContext.Consumer>
                {hasTextAncestor => this.renderView(hasTextAncestor)}
            </TextAncestorContext.Consumer>
        )
    }
}

const styles = StyleSheet.create({
    inline: {
        display: 'inline-flex'
    },
    hitSlop: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1
    }
})

export default applyLayout(applyNativeMethods(View))
