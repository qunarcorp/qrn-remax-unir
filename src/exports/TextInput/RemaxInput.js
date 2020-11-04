import * as React from 'react'
import { Input as RInput } from '@remax/one'
import { flatStyle } from '../utils'

class Input extends React.Component{
    render() {
        const { style = {}, source = {}, ...others } = this.props;
        const {
            uri=''
        } = source;
        return <RInput style={flatStyle(style)} src={uri} {...others} />
    }
}

export default Input;
