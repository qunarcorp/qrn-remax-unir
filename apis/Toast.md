# Toast api

## 简单介绍
Toast reamx版本实现
## 使用说明
```js
import { Toast } from 'qunar-react-native'

Toast.show("无图标，此时 title 文本最多可显示两行")}
Toast.show("无图标，此时 title 文本最多可显示两行",5000)}
```

## 方法

* show(message: String, duration: Number, offset: Number)
> 展示微信小程序toast默认样式，无icon，文本最多显示两行，offset 参数无效
