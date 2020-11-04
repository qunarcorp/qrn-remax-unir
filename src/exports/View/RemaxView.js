/**
 * Created by guhaikuan on 2020/6/24
 */
import * as React from 'react'
import { View as RView } from '@remax/one'
import type { ViewProps } from './types';
import { flatStyle } from '../utils'
import createCompileableStyle from '../StyleSheet/createCompileableStyle'

export type { ViewProps };

const View = (props)=>{
    const { style = {},...others } = props;
    return <RView style={createCompileableStyle(flatStyle(style))} {...others} />
}
export default View
