## NetInfo 
react native 社区组件

### Usage
import NetInfo from "@react-native-community/netinfo";

> addEventListener()

``` 
    // v4.xx写法
    const removeListener = NetInfo.addEventListener(eventName, handler); 
    // 或者
    // v5.xx写法
    const removeListener = NetInfo.addEventListener(handler); 

    // 取消监听
    removeListener()  // 在2.9.3版本一下不能无法实现取消监听，开发环境会提示错误
```

名称|	类型|	必填|	说明
---|---|---|---
eventName|	enum(connectionChange, change)|	是|	事件名
handler|	function|	是|	监听函数

> removeEventListener() // 在2.9.3版本一下不能无法实现取消监听，开发环境会提示错误

``` 
NetInfo.removeEventListener(eventName, handler); 
```
名称|	类型|	必填|	说明
---|---|---|---
eventName|	enum(connectionChange, change)|	是|	事件名
handler|	function|	是|	监听函数
> getConnectionInfo()

```
NetInfo.getConnectionInfo((res) => {
    // 回调数据结构
    // res: {
    //     isConnected: bool
    //     type: string
    // }
    
    // do ...
});
```
