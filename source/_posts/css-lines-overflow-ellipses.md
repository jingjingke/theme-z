---
title: CSS多行文本溢出显示省略号
date: 2016-05-12 14:22:29
categories:
- 前端笔记
tags:
- CSS
---
大部分童鞋都知道CSS单行文本溢出显示省略号的方法是text-overflow:ellipsis;，那么多行文本溢出显示省略号的方法是什么呢？了解一下吧~![CSS多行文本溢出显示省略号配图](/theme-z/public/img/1-1605121UGT35.jpg)
## 单行文本溢出 ##
利用CSS控制当单行文溢出时显示省略号，前提是元素需要是块元素。代码如下：
```CSS
overflow:hidden; white-space:nowrap; text-overflow:ellipsis;
```
如果元素为内联元素的话则需要转变为块元素：
```CSS
overflow:hidden; white-space:nowrap; text-overflow:ellipsis; display:block;
```
可以说CSS单行文本溢出显示省略号可以满足我们大部的需求，比较广泛的就是在单行标题上的应用。

## 多行文本溢出 ##
利用CSS控制多行文本溢出显示省略号相较于上者，因为使用了WebKit的CSS扩展属性，较上者（单行文本溢出使用的CSS3新属性）兼容性要差点，该方法适用于WebKit浏览器及移动端。具体代码如下：
```CSS
display:-webkit-box; overflow:hidden; text-overflow:ellipsis; -webkit-line-clamp:2; -webkit-box-orient:vertical;
```
这种方法无关乎元素为内联或块，不过为了让高度在各浏览器中显示差异的最小化，最好给元素添加高度和行高（高度是行高的整数倍，这个倍数值与设置的行数要一致），并且如果是内联元素则转变为块元素。
```CSS
display:block; height:3em; line-height:1.5em;
display:-webkit-box; overflow:hidden; text-overflow:ellipsis; -webkit-line-clamp:2; -webkit-box-orient:vertical; 
```
看一下各属性/值的意思：
```pre
display:-webkit-box;     //必须结合的属性，将对象作为弹性伸缩盒子模型显示
-webkit-line-clamp       //用来限制在一个块元素显示的文本的行数（为了实现该效果，它需要组合其他的WebKit属性
-webkit-box-orient       //必须结合的属性，设置或检索伸缩盒对象的子元素的排列方式
```
更多关于用样式设置/JS设置多行溢出显示省略号的方案可以参考下面的链接：[点击这里](http://www.css88.com/archives/5206)