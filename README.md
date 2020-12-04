# 欢迎来到Qunar-RN跨端方案网站!

本网站意在介绍Qunar的RN到微信小程序的核心基础组件库的内容。Qunar提供了一套从RN映射到Remax组件的基础库，用于实现RN到小程序的跨端开发。基于此库，可以基本实现只开发RN，直接展现在微信小程序上看到效果。

## 组件库使用步骤：
### 1. 初始化一个RN工程
首先利用RN官方推荐的工具初始化一个RN工程，这里建议使用 [expo](https://docs.expo.io/)
初始化。

```shell script
# install the command line tools
npm install --global expo-cli
# Create a new project
expo init expo-demo
```
### 2. 安装[Remax](https://remaxjs.org/guide/quick-start)

```shell script
npm install remax
```
### 3. 安装qrn-remax-unir

```shell script
npm install qrn-remax-unir
```
### 4. 修改目录结构适配remax的要求
因为expo本身和remax是没有关系的，两个框架的结合需要手动修改目录结构，调整到小程序要求的目录结构。
从原目录结构
```
expo-demo
   ├── App.js
   ├── app.json
   ├── assets
   ├── babel.config.js
   └── package.json
```
调整成
```
expo-demo
    ├── App.js
    ├── App.web.js
    ├── README.md
    ├── app.json
    ├── assets
    ├── babel.config.js
    ├── mini.project.json
    ├── package.json
    ├── project.config.json
    ├── public
    │   ├── icon.png
    │   └── index.html
    ├── remax.config.js
    ├── src
    │   ├── app.config.js
    │   ├── app.css
    │   ├── app.js
    │   └── pages
    └── yarn.lock
```
其中的
```
babel.config.js
mini.project.json
remax.config.js
src/app.js
src/app.css
src/app.config.js
```
均从remax初始化的项目中拷贝而来。
对于/src/pages/目录的结构，也需要遵循remax的要求。
例如:appl.config.js中，指定pages的目录
```
const pages = ['pages/home/index'];
```
那么就需要建立/src/pages/home/index.js这个路径及文件。
作为小程序端的入口。
而对于原App.js文件，可以把首页同样指定到这个文件路径下。
```
import App from './src/pages/home/index';
export default App;
```
保证两端的入口文件一致，方便两端同时进行调试。

### 5. 运行开发模式
针对RN端的开发这里不再赘述，当完成以上步骤当改造后，就可以执行
```shell script
remax build -w -t wechat
```
指令生成dist目录了，之后再利用微信ide打开就可以愉快的开发了！
为了方便起见，可以在package.json中，添加脚本：
```json
{
  "scripts": {
    "dev:wx": "remax build -w -t wechat"
  }
}
```
至此就可以利用RN以及我们提供的组件进行跨端开发啦！

---

你也可以直接下载我们准备的demo，在我们demo基础上进行开发，省略手动搭建的麻烦！
* [demo地址](https://github.com/qunarcorp/qrn-remax-unir-demo/tree/master)

