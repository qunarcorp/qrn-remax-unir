# TouchableOpacity组件

## 简单介绍
使用 remax/one 里的View组件适配实现
## 使用说明

```js
import { TouchableOpacity } from 'react-native';

<TouchableOpacity 
    activeOpacity={0.6}  
>
</TouchableOpacity>
```
## 属性说明
属性名|类型|默认值|是否必须|说明|
-----|---|-----|-------|---|
 activeOpacity | number | false | 否 | 透明度 |
 style | View.style | false | 否 | 样式 |
 onPress| function(event:TouchableEvent) | false | 否 | 点击 |
 onPressIn| function(event:TouchableEvent) | false | 否 | 按下 |
 onPressOut| function(event:TouchableEvent) | false | 否 | 抬起 |
 onLongPress| function(event:TouchableEvent) | false | 否 | 长按 |
 
### TouchableEvent
> nativeEvent 中属性比rn少，缺少locationX，locationY
```javascript
    const event = {
            nativeEvent: {
                changedTouches: [
                    {
                        identifier: 0,
                        pageX: 152,
                        pageY: 74,
                        clientX: 152,
                        clientY: 74,
                        force: 1
                    }
                ],
                pageX: 152.390625,
                pageY: 74.15234375,
                timestamp: 3472
            }
    }
```

## 不支持的RN属性
属性名|进度|说明|
---|---|---|
 hasTVPreferredFocus | 不支持 | 无法适配 |
 tvParallaxProperties | 不支持 | 无法适配 |
 nextFocusForward | 不支持 | 无法适配 |
 nextFocusLeft | 不支持 | 无法适配 |
 nextFocusRight | 不支持 | 无法适配 |
 nextFocusUp | 不支持 | 无法适配 |
