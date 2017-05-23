---
title: CSS伪类实现文字颜色对半
date: 2016-11-18 13:52:30
categories:
- 前端笔记
tags:
- CSS
---
CSS不仅是一种技术，也是一种艺术，在这个领域中你有更大的空间和可能性来发挥自己的奇思妙想，今天用CSS给文字上一半的颜色，才发现CSS伪类真是无处不在。![CSS伪类实现文字颜色对半效果图](/theme-z/public/img/1-16111QI32NT.png)CSS实现文字颜色对半，其实说到底还是将伪类显示一半，上色后放到原来的字上面，从正面看到的效果就是这个文字被分了两半，一半是上色后的，一半是原来的颜色。仔细看一下代码，感觉还是很容易理解的！
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>CSS伪类实现文字颜色对半</title>
  <style>
    body { margin: 0; padding: 0; padding-top: 200px; text-align: center;}
    span {
      font-size: 120px;
      display: inline-block; /*需要这种布局*/
      position: relative;
    }
    span:after {
      display: block;
      content:attr(data-content);
      position: absolute;
      top: 0;
      left: 0;
      z-index: 2;
      color:dodgerblue;
      width: 50%;
      overflow: hidden;
    }
  </style>
</head>
<body>
  <span>美</span><span>丽</span><span>人</span><span>生</span>
  <script src="http://www.jingjingke.com/res/js/jquery.min.js"></script>
  <script>
    $('span').each(function(){
      $(this).attr('data-content',$(this).text());
    });
  </script>
</body>
</html>
```
这个是简化后的代码，[点击原文链接](http://www.webhek.com/css-half-character/)

因为原文可能讲得比较多一些，我自己做的时候就能省则省了。兼容没怎么考虑。另外还有上两种颜色的，通过用after和before两个伪类，来做。
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>CSS伪类实现文字三色</title>
  <style>
    body { margin: 0; padding: 0; padding-top: 200px; text-align: center;}
    span {
      font-size: 120px;
      display: inline-block; /*需要这种布局*/
      position: relative;
      color:orangered ;
    }
    span:after,span:before {
      display: block;
      content:attr(data-content);
      position: absolute;
      top: 0;
      left: 0;
      overflow: hidden;
    }
    span:after {
      height: 40%;
      z-index: 3;
      color:dodgerblue;
    }
    span:before {
      height: 70%;
      z-index: 2;
      color: black;
    }
  </style>
</head>
<body>
  <span>美</span><span>丽</span><span>人</span><span>生</span>
  <script src="http://www.jingjingke.com/res/js/jquery.min.js"></script>
  <script>
    $('span').each(function(){
      $(this).attr('data-content',$(this).text());
    });
  </script>
</body>
</html>
```
这是我整理的三种颜色了，跟文字颜色对半对比一下，差不多应该能理解了~

