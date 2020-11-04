/**
 * Created by guhaikuan on 2020/7/21
 */

import * as React from 'react'
import { Modal } from "@remax/one"
import View from "../View"
import StyleSheet from '../StyleSheet'

/**
 * hook QPopupLayer 组件
 * todo 遗留问题，因为动画会造成负面效果
 */
export default class extends React.Component{

    render(){
        return <Modal>
            <View style={[StyleSheet.absoluteFillObject,{backgroundColor:'rgba(0,0,0,0.5)'}]}>
                { this.props.children || null }
            </View>
        </Modal>
    }
}




