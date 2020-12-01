# Animated api

## 简单介绍
RN 中 AppState 的 remax 实现
## 使用说明

```js
import { AppState } from 'react-native';
```
## 方法说明

* addEventListener() 
    ```js
      addEventListener(type, handler);
    ```
    * type ```change | memoryWarning```，只有 ```change``` 有效会执行回调，```memoryWarning``` 未实现监控
    * 监听app前后台状态变化，应该使用 ```change```

* removeEventListener() 
    ```js
      removeEventListener(type, handler);
    ```
    * type ```change | memoryWarning```，只有 ```change``` 有效会执行回调，```memoryWarning``` 未实现监控


## 属性

* currentState ```background | active```
    ```js
      AppState.currentState;
    ```
