import * as React from 'react'
import { Image as RImage } from '@remax/one'
import { flatStyle } from '../utils'

class Image extends React.Component{
    render() {
        const { style = {}, source = {}, ...others } = this.props;
        const {
            uri=''
        } = source;
        return <RImage style={flatStyle(style)} src={uri} {...others} />
    }
}

export default Image;
