# StyleSheet api

## 简单介绍
RN 中 StyleSheet 的 remax 实现
## 使用说明

```js
import { StyleSheet } from 'react-native';
```
## 属性说明
属性名|类型|参数|是否必须|说明|
---|---|---|---|---|
 create | func | object | 是 |  |
 flatten | func | array | 是 |  |
 absoluteFillObject | object | - | 否 |  |
 convert | func | array &#124; object | 否 | 是否支持缩放 |
 
* StyleSheet
    - [x] create
    - [x] flatten
    - [x] absoluteFillObject
    - [x] convert 转换```class和object混合的style```
    ```javascript
        const { classList, style } = StyleSheet.convert(["index-app-header",{flex:1}]);
        // classList = [ "index-app-header" ]
        // style = { flex:1 }
    ```   

