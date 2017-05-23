---
title: 纯CSS让footer固定在页面底部
date: 2017-05-02 16:06:52
categories:
- 前端笔记
tags:
- CSS
---
纯CSS实现让footer固定在底部，当内容不够一屏时固定在屏幕底部，当内容超出一屏时则跟随在内容底部。![纯CSS让footer固定在页面底部效果图](/public/img/1-1F5021I6400-L.gif)前段时间做react-demo的时候，遇到过这个CSS-Sticky-Footer的问题，当时因为底部并不是在body下面的，所以没有做起来，只用了响应式的让它浮在底部，而在小屏幕时让它跟随在内容下边。这次正好群里面有小伙伴也在弄这个，所以我就把demo做了一下，纯CSS实现（兼容IE比较差，用了伪类和min-height）。具体代码如下：
```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>让footer固定在页面底部</title>
    <style>
      html,body,div,p {
        padding: 0;
        margin: 0;
      }
      html {
        height: 100%;
      }
      body {
        position: relative;
        min-height: 100%;
      }
      body:after {
        content: '';
        display: block;
        height: 150px;
      }
      .foot {
        position: absolute;
        bottom: 0;
        width: 100%;
        line-height: 150px;
        text-align: center;
        color: #fff;
        font-size: 48px;
        background: #222;
      }
      
      h3 {
        font-size: 75px;
        margin: 0;
      }
      p {
        font-size: 24px;
        line-height: 40px;
        padding-top: 32px;
      }
    </style>
  </head>
  <body>
    <div class="box">
      <h3>CSS-Sticky-Footer</h3>
      <h3>让footer固定在页面底部</h3>
      <p>纯CSS实现让footer固定在底部，当内容不够一屏时固定在屏幕底部，当内容超出一屏时则跟随在内容底部。</p>
      <p>实现CSS-Sticky-Footer的效果</p>
      <p>1</p>
      <p>2</p>
      <p>3</p>
      <p>4</p>
      <p>5</p>
      <p>6</p>
      <p>7</p>
      <p>8</p>
      <p>9</p>
      <p>10</p>
      <p>11</p>
      <p>12</p>
      <p>13</p>
      <p>14</p>
      <p>15</p>
      <p>16</p>
      <p>17</p>
      <p>18</p>
      <p>最后一行</p>
    </div>
    <div class="foot">这是底部</div>
  </body>
</html>
```
需要注意的两点就是：
1. foot需要直接在body中，它们是父与子的关系
2. body的after伪类高度需要与foot一致

因为foot是使用的absolute相较与body的定位，所以在给body设置“min-height:100%;”而foot设置“bottom:0”后，当body内容不够一屏时，body有min-height,能够保持foot的底部位置，当超过一屏时，就会跟随在box内容后面了。同时body的after伪类很好的将它们在底部分做了一个区分，而不会重叠。
