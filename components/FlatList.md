# FlatList组件

## 简单介绍
使用 remax/wechat、remax/ali 里的ScrollView组件适配实现
## 使用说明

```js
import { FlatList } from 'react-native';

<FlatList
    style={{height: '100%'}}
    onScroll={(e)=>{
        console.log(e)
    }}
    data={[1,2,3]}
    renderItem={({item,index})=>{
        return <Text key={index}>{item}</Text>
    }}
/>
```
## 属性说明
属性名|类型|默认值|是否必须|说明|
---|---|---|---|---|
onScroll | function | false | 否 | 滚动事件回调 |
style | style | false | 否 | 样式 |
horizontal | bool | false | 否 | 是否水平方向 |
scrollEnabled | bool | true | 否 | 是否可以滚动 |
wx-height | number | 100vh | 是 | 微信小程序必须设置高度 |
scrollTo  | func   | 0 | 否 | scrollTo(100) |
data  | array   | [] | 否 | 数据源 |
renderItem  | func({item,index})   | false | 否 | 渲染条目 |
ItemSeparatorComponent  | React.ComponentType<any> &#124; React.Element<any>   | false | 否 | 分割线 |
ListHeaderComponent  | React.ComponentType<any> &#124;React.Element<any>   | false | 否 | header |
ListFooterComponent  | React.ComponentType<any> &#124; React.Element<any>   | false | 否 | footer |
ListEmptyComponent  | React.ComponentType<any> &#124; React.Element<any>   | false | 否 | empty |
keyExtractor  | function(item,index)   | false | 是 | key |
numColumns  | number   | 1 | 否 | 列 |
onEndReached  | func   | false | 否 | 滚动到底部/最右侧回调 |
onEndReachedThreshold  | number   | 50 | 否 | 距离底部/最右侧 多少触发onEndReached，区别于RN，为具体PX值 |
refreshing | boolean | false | 是 | 刷新状态 |
onRefresh | func | false | 是 | 下拉刷新回调 |
refreshControl  | [RefreshControl](refreshcontrol.md) | null | 否 | 下拉刷新指示器 |


## 方法 
* scrollToEnd 目前默认滚动效果带动画, 不支持关闭动画
     
    ```js
     scrollToEnd({animated:true});
    ```
* scrollToIndex 目前默认滚动效果带动画, 不支持关闭动画
    ```js
      scrollToEnd({index:1,animated:true});
    ```
* scrollToItem 未适配，请使用scrollToIndex
    
* scrollToOffset 目前默认滚动效果带动画, 不支持关闭动画
    ```js
      scrollToIndex({offset:1,animated:true});
    ```


## 不支持的RN属性
属性名|进度|说明|
---|---|---|
 columnWrapperStyle | 不支持 | 暂未适配 |
 getItemLayout | 不支持 | 暂未适配 |
 initialNumToRender | 不支持 | 暂未适配 |
 initialScrollIndex | 不支持 | 暂未适配 |
 onRefresh | 不支持 | 暂未适配 |
 refreshing | 不支持 | 暂未适配 |
 onViewableItemsChanged | 不支持 | 暂未适配 |
 progressViewOffset | 不支持 | 暂未适配 |
 extraData | 不支持 | 暂未适配 |
