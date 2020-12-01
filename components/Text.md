# Text组件

## 简单介绍
使用 remax/one 里的View组件适配实现
## 使用说明

```js
import { Text } from 'react-native';

<Text 
    style={{width: 200, height: 200}}
    numberOfLines={1}
    onLayout={(e) => console.log(e)}
    >
    Hello
</Text>
```
## 属性说明
属性名|类型|默认值|是否必须|说明|
---|---|---|---|---|
 style | style | false | 否 | rn样式 |
 selectable | bool | false | 否 | 是否支持长按复制 |
 numberOfLines | number | false | 否 | 行数 |
 onPress | func | false | 否 | 点击事件 |
 ellipsizeMode |  | false | 否 | 尚未适配 |
 onLongPress |  | false | 否 | 尚未适配 |
 onLayout   | func | null | 否 | onLayout

 
## 不支持的RN属性
属性名|进度|说明|
---|---|---|
 onTextLayout | 不支持 | 无法适配 |
 pressRetentionOffset | 不支持 | 无法适配 |
 adjustsFontSizeToFit | 不支持 | 无法适配 |
 allowFontScaling | 不支持 | 无法适配 |

