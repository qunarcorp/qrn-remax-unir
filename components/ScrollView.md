# ScrollView组件

## 简单介绍
使用 remax/wechat、remax/ali 里的ScrollView组件适配实现
## 使用说明

```js
import { ScrollView } from 'react-native';

<ScrollView
    ref = {(o) => this.scrollRef = o}
    style={{height: 1000}}
    onScroll={(e)=>{
        console.log(e)
    }}
    scrollEnabled = {true}
>
    {/*  */}
</ScrollView>
```
## 属性说明
属性名|类型|默认值|是否必须|说明|
---|---|---|---|---|
onScroll | function | false | 否 | 滚动时间回调 |
style | style | false | 否 | 样式 |
horizontal | bool | false | 否 | 是否水平方向 |
scrollEnabled | bool | true | 否 | 是否可以滚动 |
wx-height | number | 100vh | 是 | 微信小程序必须设置高度 |
scrollTo  | func   | 0 | 否 | scrollTo(100) |
scrollsToTop  | boolean   | false | 否 | iOS点击顶部状态栏、安卓双击标题栏时，滚动条返回顶部，只支持竖向 |
refreshControl  | [RefreshControl](refreshcontrol.md) | null | 否 | 下拉刷新指示器 |

## tips:
优先级：wx-height < style.height < style.maxHeight
wx-height 默认值是 100vh
style.height 和 style.maxHeight 二者至少有一个需要赋值


## 不支持的RN属性
属性名|进度|说明|
---|---|---|

