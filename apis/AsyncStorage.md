# AsyncStorage api

## 简单介绍
对应react-native-community社区的本地存储api https://react-native-community.github.io/async-storage/docs/api
## 使用说明

```js
// 包名待定
import AsyncStorage from 'react-native'
AsyncStorage.getItem('@key')
AsyncStorage.setItem('key', value)
AsyncStorage.removeItem('@MyApp_key')
AsyncStorage.getAllKeys()
```
## 属性说明
属性名|类型|参数|是否必须|说明|
---|---|---|---|---|
getItem | func | string | - | 获取缓存数据 |
setItem | func | string, string | - | 写入缓存数据 |
removeItem | func | string | - | 移除指定缓存数据 |
getAllKeys | func | void | - | 获取所有缓存数据key |