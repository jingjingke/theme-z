---
title: 页面重构应注意的重绘和渲染
date: 2016-05-20 14:41:24
categories:
- 前端笔记
tags:
- 性能
---
前端开发人员在页面重构中应该慎重考虑DOM操作，合理优化DOM的重绘（repaint）与重渲染（reflow）可以减轻客户浏览器的压力以及提高页面的性能，值得去学习交流。![页面重构应注意的重绘和渲染配图](/public/img/1-160612110S3250.jpg)网上看了一遍文章，感觉不错，所以拿过来分享一下，中间有些东西说得并不细，所以也加了一些东西。
## 什么是repaint和reflow？ ##
首先我们要知道一个页面由两部分组成：
```pre
DOM       描述该页面的结构
render    描述DOM节点(nodes)在页面上如何呈现
```
当DOM元素的属性发生变化(如color)时，浏览器会通知render重新描绘相应的元素，此过程称为repaint。

如果该次变化涉及元素布局(如width)，浏览器则抛弃原有属性，重新计算并把结果传递给render以重新描绘页面元素，此过程称为reflow。

这两个过程是很耗费浏览器性能的，从IE系列和Chrome渲染页面速度上的差距即可看出渲染引擎计算对应值和呈现并不一定高效，而每次对元素的操作都会发生repaints或reflow，因此编写DOM交互时如果不注意就会导致页面性能低下。

页面渲染的过程如下：
```pre
1. 解析HTML代码并生成一个DOM树。

2. 解析CSS文件，顺序为：浏览器默认样式->自定义样式->页面内的样式。

3. 生成一个渲染树（render tree）。这个渲染树和DOM树的不同之处在于，它是受样式影响的。它不包括那些不可见的节点。

4. 当渲染树生成之后，浏览器就会在屏幕上"画"出所有渲染树中的节点。
 ```
PS:repaint和reflow，从名字就可以知道它们都有重新（再一次）的动作在里面，为什么会重新执行一次（N次）呢？如何减少、避免触发或只局部进行操作这个应该是我们学习的方向。

## 什么情况下会触发浏览器的repaint/reflow? ##
除了页面在首次加载时必然要经历该过程之外，还有以下行为会触发这个行为：
```pre
1. DOM元素的添加、修改（内容）、删除( Reflow + Repaint)
2. 仅修改DOM元素的字体颜色（只有Repaint，因为不需要调整布局）
3. 应用新的样式或者修改任何影响元素外观的属性
4. Resize浏览器窗口、滚动页面
5. 读取元素的某些属性（offsetLeft、offsetTop、offsetHeight、offsetWidth、 scrollTop/Left/Width/Height、clientTop/Left/Width/Height、 getComputedStyle()、currentStyle(in IE))
```
## 怎么优化？ ##
（1）**避免在document上直接进行频繁的DOM操作**，如果确实需要可以采用off-document的方式进行，具体的方法包括但不完全包括以下几种：
```pre
1. 先将元素从document中删除，完成修改后再把元素放回原来的位置
2. 将元素的display设置为"none"，完成修改后再把display修改为原来的值
3. 如果需要创建多个DOM节点，可以使用DocumentFragment创建完后一次性的加入document
```
例如：
```pre
var fragment = document.createDocumentFragment();
fragment.appendChild(document.createTextNode('keenboy test 111'));
fragment.appendChild(document.createElement('br'));
fragment.appendChild(document.createTextNode('keenboy test 222'));
document.body.appendChild(fragment);
```
（2）**集中修改样式**

```pre
1. 尽可能少的修改元素style上的属性
2. 尽量通过修改className来修改样式
3. 通过cssText属性来设置样式值
```
例如：
```pre
element.style.width="80px";               //reflow
element.style.height="90px";              //reflow
element.style.border="solid 1px red";     //reflow
//以上就产生多次reflow，调用的越多产生就越多
element.style.cssText="width:80px;height:80px;border:solid 1px red;";     //reflow
```
（3）**缓存Layout属性值**


对于Layout属性中非引用类型的值（数字型），如果需要多次访问则可以在一次访问时先存储到局部变量中，之后都使用局部变量，这样可以避免每次读取属性时造成浏览器的渲染。

```pre
var left=elem.offsetLeft;      //多次使用left也就产生一次reflow
```
（4）**设置元素的position为absolute或fixed**

在元素的position为static和relative时，元素处于DOM树结构当中，当对元素的某个操作需要重新渲染时，浏览器会渲染整个页 面。

将元素的position设置为absolute和fixed可以使元素从DOM树结构中脱离出来独立的存在，而浏览器在需要渲染时只需要渲染该元素 以及位于该元素下方的元素，从而在某种程度上缩短浏览器渲染时间，这在当今越来越多的Javascript动画方面尤其值得考虑。

（5）**权衡速度的平滑**

比如实现一个动画，以1个像素为单位移动这样最平滑，但reflow就会过于频繁，CPU很快就会被完全占用。如果以3个像素为单位移动就会好很多。

（6）**不要用tables布局**

不要用tables布局的另一个原因就是tables中某个元素一旦触发reflow就会导致table里所有的其它元素 reflow。在适合用table的场合，可以设置table-layout为auto或fixed，这样可以让table一行一行的渲染，这种做法也是为了限制reflow的影响范围

（7）**不要在css里面写表达式**


很多情况下都会触发reflow，如果css里有expression，每次都会重新计算一遍

原文参考来源[点击查看](http://www.blueidea.com/tech/web/2011/8365.asp)