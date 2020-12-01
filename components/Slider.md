# Slider 组件

## 简单介绍
使用 remax/wechat 里的 Slider 组件适配实现
## 使用说明

```js
import { Slider } from 'qunar-react-native';

<Slider
    minimumTrackTintColor="green"
    maximumValue={255}
    minimumValue={0}
    style={{ width: '100%' }}
    onValueChange={val => setColorGreen(val)}
    step={1}
    value={color}
/>
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
```
## 属性说明
属性名|类型|默认值|是否必须|说明|
---|---|---|---|---|
 style | style | false | 否 | 样式 |
 thumbStyle | object | false | 否 | 滑块样式 |
 thumbSize | number | false | 否 | 滑块大小 |
 maximumTrackTintColor | string | blue | 否 | 轨道右侧颜色 |
 minimumTrackTintColor | string | grey | 轨道左侧颜色 |
 step | number | 1 | 否 | 步长 |
 value | number | false | 否 | 值 |
 onValueChange | func | false | 否 | 回调value |
 
## 方法

    
## 不支持的RN属性
属性名|进度|说明|
---|---|---|
 trackTintStyle | 不支持 | 无法适配 |
 onSlidingComplete | 不支持 | 无法适配 |
