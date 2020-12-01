## QAV 客户端手动埋点

> API兼容性：   
> QRN:v2.3.0      
> iOS:80011137   
> Android:60001168   

> API QAV.logMsg 兼容性：   
> QRN:v3.12.0      
> iOS:80011167   
> Android:60001239   


`QAV`用来做客户端手动埋点。

## API

<blockquote class="api">
<strong>QAV.log</strong>
<span>(tag: String, message: String, options: {pageId: string, referer: string, ...opts}) 此方法已不建议使用，请使用下面的QAV.logMsg</span>
</blockquote>
客户端手动埋点功能，`tag` 是控件手动唯一标识，`message` 是被操作的控件包含的一组文本。    
`tag`值可以为空，`message`不能为空, options 参数，pageId、referer等必要内容，其它值会以参数形式发送godEye平台。
<!-- 这个手动埋点数据将会和其他的埋点数据用 `^` 拼接起来。 -->

<!-- `tag` 的生成格式如下：
<div align="middle">
<img src="images/api-QAV-tag.png" width="1000"   />
</div> -->

<blockquote class="api">
<strong>QAV.logMsg</strong>
<span>(message: String, options: {pageId: string, referer: string, ...opts})</span>
</blockquote>
客户端手动埋点功能，``message` 是被操作的控件包含的一组文本。    
`message`不能为空, options 参数，pageId、referer等必要内容，其它值会以参数形式发送godEye平台。  
如果是从上面 `QAV.log` 方法迁移过来的，`tag` 可以拼接到 `message` 里。周知取数据方新的拼接规则即可。  

## 使用说明

```typescript
import { QAV } from 'qunar-react-native';

//手动埋点
QAV.log('tagString','messageString', {pageId: 'pageId', referer: 'referer'}); //此方法已不建议使用，后续请使用下面的方法

QAV.logMsg('messageString', {pageId: 'pageId', referer: 'referer'});
```
