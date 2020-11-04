/**
 * @author jiafengf.wang
 * @date 2020.07
 */
import * as React from 'react'
import { Input as RInput } from '@remax/one';
import StyleSheet from '../StyleSheet'

const SupportedProps = {
  "onFocus": 'onFocus',
  "style": 'style',
  "className": 'className',
  // "value": 'value',
  "onChangeText": 'onInput',
  "placeholder": 'placeholder',
  "maxLength": 'maxLength',
  "defaultValue": 'defaultValue',
  "autoFocus": 'focus',
  "secureTextEntry": 'password',
  "onSubmitEditing": 'onConfirm',
  "onBlur": 'onBlur'
}

/**
 * placeholderTextColor
 */

class TextInput extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      value: props.defaultValue,
      isClearing: false
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {value} = nextProps;
    if(prevState.isClearing){
      return {
        isClearing: false
      }
    }else{
      if (value !== prevState.value) {
          return {
            value,
          };
      }
    }
    return null;
  }

  /**
   * api clear
   */
  clear = () => {
    this.setState({
      value: '',
      isClearing: true
    })
  }

  _handleSupportedProps = () => {
    const _props = {}
    for (let key in this.props) {
      if (SupportedProps[key] && this.props.hasOwnProperty(key)) {
        _props[SupportedProps[key]] = this.props[key]
      }
    }
    /**
     * 处理样式
     */
    if(_props.style){
      const { classList: _classList, style: _style } = StyleSheet.convert(this.props.style)
      _props.style = _style;
      _props.classList = _classList.join(' ');
    }
    /**
     * 处理焦点获取回调
     */
    if(_props.onFocus){
      const _onFocus = (e) => {
        const _nativeEvent = {
          eventCount: 0,
          target: 0,
          text: e?.target?.value
        }
        this.props.onFocus({nativeEvent: _nativeEvent})
      }
      _props.onFocus = _onFocus
    }
    /**
     * 处理输入
     */
    if(_props.onInput){
      const _onInput = (e) => {
        this.props.onChangeText(e?.target?.value)
      }
      _props.onInput = _onInput
    }
    
    /**
     * 处理禁用
     */
    if(this.props.editable === false){ 
      _props.disabled = true
    }
    /**
     * 处理占位文本样式
     */
    if(this.props.placeholderTextColor){
      _props.placeholderStyle = {
        color: this.props.placeholderTextColor
      }
    }
    /**
     * 处理键盘确认按钮
     */
    if(_props.onConfirm){
      const _onConfirm = (e) => {
        const _nativeEvent = {
          eventCount: 0,
          target: 0,
          text: e?.target?.value
        }
        this.props.onSubmitEditing({nativeEvent: _nativeEvent})
      }
      _props.onConfirm = _onConfirm
    }
    _props.value = this.state.value
    /**
     * 避免渲染导致的闪烁
     */
    if(_props.placeholder && _props.value && _props.value.length > 0){
      _props.placeholder = ''
    }
    return _props;
  }

  render() {
    return <RInput {...this._handleSupportedProps()} />
  }
}

export default TextInput
