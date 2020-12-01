# View组件

## 简单介绍
使用 remax/one 里的View组件适配实现
## 使用说明

```js
import { View , Text } from 'react-native';

<View style={{flex:1}} 
    <Text>Hello World</Text>
</View>
```
## 属性说明
属性名|类型|默认值|是否必须|说明|
---|---|---|---|---|
 style | style | false | 否 | rn样式 |
 pointerEvents | none &#124; auto | false | 否 | 是否支持长按复制 |
 hitSlop | object | false | 否 | 点击区域是否放大 |


## 不支持的RN属性
属性名|进度|说明|
---|---|---|
 onLayout | 不支持 | 无法适配 |
