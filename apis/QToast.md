# Toast api

## 简单介绍
Toast reamx版本实现
## 使用说明
```js
import { QToast } from '@qnpm/q-components';


QToast.show('提示文案提示文案提示文案')
QToast.show('订阅成功', { 
    type:'success'
    strategy: 1, 
    position: 0, 
    iconUrl: 'https://s.qunarzz.com/q_design_font/images/toastSuccess.png'
    })
```

## 方法

* show(message: String, options: { type, strategy, position, iconUrl })
> 展示微信小程序toast默认样式，无icon时，文本最多显示两行，有icon时，文本最多展示7个汉字长度，strategy 和 position 参数无效

options

属性名|类型|参数|是否必须|说明|
---|---|---|---|---|
 type | string | success,loading,none | 否 | 注意和QDesign 支持的type不一致 |
 strategy | number | - | 否 | 无效 |
 position | number | - | 否 | 无效 |
 iconUrl | string | - | 否 | 只支持本地图片 |
