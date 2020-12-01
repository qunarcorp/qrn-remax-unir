# TouchableHighlight组件

## 简单介绍
使用 remax/one 里的View组件适配实现
## 使用说明

```js
import { TouchableHighlight } from 'react-native';

<TouchableHighlight 
     style={{alignItems: "center"}} 
     activeOpacity={0.1}
     underlayColor='red'
     onShowUnderlay={console.log('show event')}
>
</TouchableHighlight>
```
## 属性说明

属性名|类型|默认值|是否必须|说明|
-----|---|-----|-------|---|
 style | View.style | false | 否 | 样式 |
 onPress| function | false | 否 | 点击 |
 onPressIn| function(event:[TouchableEvent](TouchableOpacity.md)) | false | 否 | 按下 |
 onPressOut| function(event:[TouchableEvent](TouchableOpacity.md)) | false | 否 | 抬起 |
 onLongPress| function(event:[TouchableEvent](TouchableOpacity.md)) | false | 否 | 长按 |
 onHideUnderlay| function(event:[TouchableEvent](TouchableOpacity.md)) | false | 否 | 底层隐藏后立即调用 |
 onShowUnderlay| function(event:[TouchableEvent](TouchableOpacity.md)) | false | 否 | 底层显示后立即调用 |
 underlayColor| color | false | 否 | 当点击时显示的底层颜色 |
 activeOpacity | number | false | 否 | 决定被点击时的视图透明度. 介于0～1. 默认0.85. 需要设置underlayColor |
 

## 不支持的RN属性
属性名|进度|说明|
---|---|---|
 activeOpacity | 待实现|透明度，需要开发 |
 hasTVPreferredFocus | 不支持 | 无法适配 |
 tvParallaxProperties | 不支持 | 无法适配 |
 nextFocusForward | 不支持 | 无法适配 |
 nextFocusLeft | 不支持 | 无法适配 |
 nextFocusRight | 不支持 | 无法适配 |
 nextFocusUp | 不支持 | 无法适配 |
 accessibilityIgnoresInvertColors|不支持 | 无法适配 |
 accessible|不支持 | 无法适配 |
 accessibilityLabel|不支持 | 无法适配 |
 accessibilityHint|不支持 | 无法适配 |
 accessibilityRole|不支持 | 无法适配 |
 accessibilityState|不支持 | 无法适配 |
 accessibilityActions|不支持 | 无法适配 |
 onAccessibilityAction|不支持 | 无法适配 |
 accessibilityValue|不支持 | 无法适配 |
 testOnly_pressed|不支持 | 无法适配 |


