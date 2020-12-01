# Modal组件

## 简单介绍
使用 remax/one 里的 Modal 组件适配实现
## 使用说明

```js
import { Image } from 'react-native';

<Image
    source={{uri:'http://t8.baidu.com/it/u=1484500186,1503043093&fm=79&app=86&f=JPEG?w=1280&h=853'}}
    style={{width: 200, height: 200}}
    />
```
## 属性说明
属性名|类型|默认值|是否必须|说明|
---|---|---|---|---|
 style | style | false | 否 | 样式，默认半透明遮罩 |
 visible | boolean | false | 是 | 展示状态 |
 transparent | boolean | false | 否 | 是否全透明 |

 
## 方法
   * onShow 显示时回调
        
   * onDismiss 关闭时回调
   
   * onRequestClose 不支持

    
## 不支持的RN属性
属性名|进度|说明|
---|---|---|
 animationType | 不支持 | 无法适配 |
