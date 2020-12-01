# Image组件

## 简单介绍
使用 remax/one 里的View组件适配实现
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
 style | style | false | 否 | 样式 |
 source | object | false | 否 | 图片资源 |
 onLoad | func | false | 否 | 加载完成回调 |
 onError | func | false | 否 | 加载错误回调 |
 resizeMode | scaleToFill<br>aspectFit<br>aspectFill<br>caleToFill<br>widthFix<br>heightFix<br>top<br>bottom<br>center<br>left<br>right<br>top left<br>top right<br>bottom left<br>bottom right | 否 | 缩放类型 |
 loadingIndicatorSource | source | false | 否 | 尚未适配 |
 blurRadius |  | false | 否 | 尚未适配 |
 
## 方法
   * getSize
   
        ```Image.getSize(uri, success, [failure]);```
        
   * getSizeWithHeaders 不支持
   
   * prefetch 不支持
   
   * abortPrefetch 不支持
   
   * queryCache 不支持
   
   * resolveAssetSource 不支持
    
## 不支持的RN属性
属性名|进度|说明|
---|---|---|
 onLayout | 不支持 | 无法适配 |
 onLoadEnd | 不支持 | 无法适配 |
 onLoadStart | 不支持 | 无法适配 |
 onLayout | 不支持 | 无法适配 |
 accessibilityLabel | 不支持 | 无法适配 |
 accessible | 不支持 | 无法适配 |
 capInsets | 不支持 | 无法适配 |
