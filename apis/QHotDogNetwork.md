# QHotDogNetWork api

## 简单介绍
QHotDogNetWork reamx版本实现
## 使用说明
```js
import { QHotDogNetWork } from 'qunar-react-native'

```

## 支持的参数
    serviceType,
    url,
    param,
    method,
    requestType,
    responseType,
    useCache,
    cacheKey,
    timeout, // 微信基础库>=2.10.0有效
    successCallback,
    failCallback,
    cacheCallback,
    serialize

## 方法

* postRequest()
```js
    QHotDogNetWork.postRequest(requestParam:object)
```

* cancelNetWorkTask()
```js
    // 发起网络请求，返回该网络请求的requestID
    const requestID = QHotDogNetWork.postRequest(requestParam);
    QHotDogNetWork.cancelNetWorkTask(requestID:int)
```
