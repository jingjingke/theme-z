---
title: 安卓APP中可以调用JS方法
date: 2016-08-09 15:39:56
categories:
- 前端笔记
tags:
- JS
---
通过JS可以在APP嵌套的页面中调用安卓自定义的方法，同理安卓也可以执行JS自定义的函数（方法）。![安卓APP中可以调用JS方法配图](/public/img/1-16091013393b04.jpg)这两天在调试嵌套在APP中的页面，学（zhe）习（mo）之后，感觉还是有点进步的，其中第一次接触到安卓执行页面中的JS，感觉这个用处满大的。

JS调用安卓自定义的方法：
```js
android.funName()
```
而安卓中也调用网页中的方法：

```js
Callfunction(){
    webview.loadUrl("javascript: funName(这里也可以传参)");
}
```
这次项目主要针对安卓4.4.4版本input调不到图片而无法正常显示图片缩略图的BUG，通过安卓本身将选择的图片上传服务器，当图片上传成功后执行JS自定义的函数并返回url值给我来生成缩略图。

简写了一个比较简单的过程，这样比较好理解

```js
//安卓开发人员写的代码：
Callfunction(){
  webview.loadUrl("javascript: getAndroidImg(上传成功后获取到的地址)");
}
 
//前端写的代码：
function getAndroidImg(imgUrl){
  $('#otherUpload').prepend('<img src="' + imgUrl + '">');
}
```