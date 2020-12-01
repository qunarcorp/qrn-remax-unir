# RefreshControl组件

## 简单介绍
使用 remax/one 里的View组件适配实现
## 使用说明

```js
import { RefreshControl } from 'react-native';

<RefreshControl
    tintColor="black"
    progressBackgroundColor="white"
    refreshing={this.state.refreshing}
    onRefresh={()=> {
        this.setState({refreshing:true});
        setTimeout(()=> this.setState({refreshing:false}),2000)
    }}
    />
```
## 属性说明
属性名|类型|默认值|是否必须|说明|
---|---|---|---|---|
 tintColor | black &#124; white | black | 否 | 指示器颜色，只支持 black &#124; white |
 progressBackgroundColor | string | white | 否 | 指示器背景色 |
 refreshing | boolean | false | 是 | 刷新状态 |
 onRefresh | func | false | 是 | 下拉刷新回调 |

  
## 不支持的RN属性
属性名|进度|说明|
---|---|---|
 size | 不支持 | 暂未适配 |
 title | 不支持 | 暂未适配 |
 titleColor | 不支持 | 暂未适配 |
 progressViewOffset | 不支持 | 无法适配 |
 colors | 不支持 | 无法适配 |
 enabled | 不支持 | 无法适配 |

