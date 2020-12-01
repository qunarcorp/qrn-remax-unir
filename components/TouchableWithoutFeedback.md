# TouchableWithoutFeedback组件

## 简单介绍
使用 remax/one 里的View组件适配实现
## 使用说明

```js
import { TouchableWithoutFeedback } from 'react-native';

<TouchableWithoutFeedback> 
</TouchableWithoutFeedback>
```
## 属性说明

属性名|类型|默认值|是否必须|说明|
-----|---|-----|-------|---|
 activeOpacity | number | false | 否 | 透明度 |
 style | View.style | false | 否 | 样式 |
 onPress| function(event:[TouchableEvent](TouchableOpacity.md)) | false | 否 | 点击 |
 onPressIn| function(event:[TouchableEvent](TouchableOpacity.md)) | false | 否 | 按下 |
 onPressOut| function(event:[TouchableEvent](TouchableOpacity.md)) | false | 否 | 抬起 |
 onLongPress| function(event:[TouchableEvent](TouchableOpacity.md)) | false | 否 | 长按 |
 
## 不支持的RN属性
属性名|进度|说明|
---|---|---|
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
