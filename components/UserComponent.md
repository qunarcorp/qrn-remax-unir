# RN实现微信自定义组件

## 简单介绍
remax会将我们的页面直接打成小程序的page，每次数据更新导致setData时都是页面级别的diff和渲染。
如果页面节点较多或者频繁UI更新时可能出现卡顿和响应慢的情况。但是，remax官方仅支持使用原生小程序，不支持直接使用React编写原生小程序。对此我们做了一些改造，通过配置的方式将一些RN编写的组件自动打包成微信的组件。

## 使用说明
需要在app.config.js中配置nativeComponents目录（和pages配置规则相同）。

```js
const nativeComponents = [
  'comp/todoList/index'
];
```
向组件中传递数据：由于小程序需要定义传入组件的类型（[微信自定义组件](https://developers.weixin.qq.com/miniprogram/dev/reference/api/Component.html)），所以框架内部只暴露了data传递渲染数据。非渲染数据以及一些function可以使用redux、mobx的方式直接注入组件
```js
<TodoList data={Object} />
```

## 改造说明
在remax打包基础上，区分出需要打包成component的逻辑。利用webpack-virtual-modules将component打包成带有特定后缀产物。自定义component的识别基本复用了原生component识别逻辑。区别在于原生的component有现成的产物，自定义component只是指向了component打包产物的路径。