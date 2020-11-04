/**
 * Created by guhaikuan on 2020/7/17
 */
import * as React from 'react'
import { Slider } from '@remax/wechat'
import StyleSheet from '../StyleSheet'

export default class extends React.Component{
    static defaultProps = {
        thumbStyle:{},
        thumbSize:28,
        trackTintStyle:{},
        maximumTrackTintColor:"blue",
        minimumTrackTintColor:'grey',
        maximumValue:1,
        minimumValue:0,
        step:1,
        value:0,
        onValueChange:(value)=>{},
        onSlidingComplete:()=>{},
        style:{}
    }

    render(){
        const {
            thumbStyle,
            thumbSize,
            trackTintStyle,
            maximumTrackTintColor,
            minimumTrackTintColor,
            maximumValue,
            minimumValue,
            step,
            value,
            onValueChange,
            onSlidingComplete,
            style
        } = this.props;
        const supportedProps = {
            min:minimumValue,
            max:maximumValue,
            style:StyleSheet.flatten([style]),
            step,
            value,
            backgroundColor:maximumTrackTintColor,
            activeColor:minimumTrackTintColor,
            blockSize:thumbSize,
            blockColor:thumbStyle.backgroundColor || 'green',
            onChange:this.onChange
        }
        return <Slider {...supportedProps}/>
    }
    onChange = (event)=>{
        this.props.onValueChange && this.props.onValueChange(event.detail.value)
    }
}
