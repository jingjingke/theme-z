---
title: 如何更方便的管理vue全局组件
date: 2017-03-06 15:28:32
categories:
- 前端笔记
tags:
- VUE
---
刚开始我们会在入口文件main.js中注册VUE全局组件，但是多人合作时频繁修改入口文件的话可能会造成代码冲突，不利于代码维护。所以我们需要单独去建一个JS去保存组件并注册到全局。
## 原来 ##
在入口文件main.js/app.js中，这样注册全局组件：
```js
//获取位置
import topCom from "./components/top";
//注册到全局
Vue.component('topCom', topCom);
```
## 现在 ##
我们可以直接在components文件夹下，新建一个index.js，然后为它添加内容：
```js
//获取位置
import topCom from "./top";
import footCom from "./foot";
//模块化
export default {
    topCom,
    footCom
｝
```
以后components下如果有新增的全局注册可以只修改这个index.js就可以了。同时别忘记最一步，去全局注册一下(main.js/app.js)：

```js
//通过components下的index.js文件导入组件
import components from './components/';
//对导入的组件进行全局组件注册
Object.keys(components).forEach((key)=>{
    Vue.component(key,components[key])
})
```
这样以后就可以方便的去全局组件进行管理了。而在所有页面中，我们可以使用全局组件topCom和footCom，无须再去分别注册了~