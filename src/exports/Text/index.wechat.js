/**
 * @author jiafengf.wang
 * @date 2020.07
 */
import * as React from 'react'
import { Text as RText } from '@remax/one';
import {flatStyle} from "../utils";
import applyLayout from '../../modules/applyLayout'
import applyNativeMethods from '../../modules/applyNativeMethods'
import filterSupportedProps from '../View/filterSupportedProps';
import StyleSheet from '../StyleSheet'
import { guid } from '../../modules/gidConduct';

class Text extends React.Component{
  constructor(props){
    super(props)
    this.wxId = '';
  }

  // todo 后续将singleStyle、multiStyle迁移到wxss
  handleNumberOfLines = () => {
    const singleStyle = {
      'overflow': 'hidden',
      'white-space': 'nowrap',
      'text-overflow': 'ellipsis'
    }
    const multiStyle = {
      'display': '-webkit-box',
      'text-overflow': 'ellipsis',
      'overflow': 'hidden',
      '-webkit-box-orient': 'vertical'
    }
    const numberOfLines = this.props.numberOfLines;
    if(numberOfLines === 1){
      return singleStyle;
    } else if(numberOfLines != null && numberOfLines > 1){
      return ({
        ...multiStyle,
        WebkitLineClamp: numberOfLines
      })
    } else {
      return ({});
    }
  }

  handleActionApi = () => {
    const {
      onPress,
      selectable,
      onLayout
    } = this.props;
    // fix 不知道为什么加上属性过滤就会导致样式错乱，暂时关闭过滤
    // const supportedProps = filterSupportedProps(this.props)
    const supportedProps = {}
    if(onPress){
      supportedProps.onTap = onPress
    }
    if(selectable){
      supportedProps.selectable = selectable
    }
    if(onLayout){
      // 处理ID
      if(this.props.id != null){
          this.wxId = this.props.id
      }else{
          this.wxId = guid();
      }
      supportedProps.id = this.wxId;
    }
    return supportedProps;
  }
  
  render() {
    const {
      children,
      onPress
    } = this.props;
    let { classList, style } = StyleSheet.convert(this.props.style)
    style = { 
      ...style,
      ...this.handleNumberOfLines()
    }
    return <RText 
      style={style} 
      className={classList.join(" ")}
      { ...this.handleActionApi() }
      children={children} />
  }
}

export default applyLayout(applyNativeMethods(Text))
