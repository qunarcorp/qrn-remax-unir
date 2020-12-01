# ImageBackground 组件

## 简单介绍
ImageBackground reamx版本实现
## 使用说明
```js
import * as React from 'react'
import {
    ImageBackground,
    Text
} from 'react-native'

const Index = ()=>{
    return <ImageBackground style={{width:200,height:200}} source={{uri:'https://gw.alipayobjects.com/mdn/rms_b5fcc5/afts/img/A*OGyZSI087zkAAAAAAAAAAABkARQnAQ'}}>
        <Text style={{color:'red'}}>hello</Text>
    </ImageBackground>
}
```

## 属性说明
属性名|类型|默认值|是否必须|说明|
---|---|---|---|---|
 style | style | false | 否 | 样式 |
 imageStyle | style | false | 否 | 图片样式 |
