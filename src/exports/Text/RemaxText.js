import * as React from 'react'
import { Text as RText } from '@remax/one';
import {flatStyle} from "../utils";
import StyleSheet from '../StyleSheet'

const Text = (props)=>{
    const { style = {},...others } = props;
    // console.log("StyleSheet-----",StyleSheet.flatten(style))
    return <RText style={StyleSheet.flatten(style)} {...others} />
}

export default Text
