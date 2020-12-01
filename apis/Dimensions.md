# Dimensions api

## 简单介绍
Dimensions reamx版本实现
## 使用说明
```js
import { Dimensions } from 'react-native'

const { width, height, fontScale, scale } = Dimensions.get("window");
const { width, height, fontScale, scale} = Dimensions.get("screen");
```

## 方法

* get()
```js
    static get('window' | 'screen')
```

* addEventListener()
```js
    static addEventListener(type, handler)
```

* removeEventListener()
```js
    static removeEventListener(type, handler)
```

* set()
```js
    const dim = { window: { width: 375, height: 640 },screen: { width: 375, height: 640 }}
    static set(dim)
```
