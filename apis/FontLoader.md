# FontLoader api

## 简单介绍
QRN 中 FontLoader 的 remax 实现
## 使用说明

```js
import { FontLoader } from 'qunar-react-native';
const fontSet = {
    hotel_rn_icon: 'https://s.qunarzz.com/hotel_rn_source/hotel_rn_iconFont/0.0.196/hotel_rn_icon.ttf',
    hotel_rn_icon_new: 'https://s.qunarzz.com/hotel_rn_source/hotel_rn_iconFont_new/1.0.2/hotel_rn_icon_new.ttf',
};
FontLoader.loadFontSet(fontSet);
```
## 属性说明
属性名|类型|参数|是否必须|说明|
---|---|---|---|---|
 loadFontSet | func | object | 是 | 加载字体文件 |

