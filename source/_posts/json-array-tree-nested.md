---
title: json数组转树型嵌套结构
date: 2017-05-03 16:02:51
categories:
- 前端笔记
tags:
- JS
---
看到有小伙伴想将json数组按照level来分类转成树型嵌套的结构，正好有空，所以我也动手做了做，还好没让人失望。![json数组转树型嵌套结构效果图](/theme-z/public/img/1-1F5031625400-L.gif)看效果图其实不难发现，原始数据由普通的结构转到树型嵌套结构，经过了两步。
```pre
1. 按照等级分成一堆一堆。
2. 从下向上（排除顶级），查到它们所在的父节点，而将顶级组合在一起就是一个全新的树了。
```
实现的代码具体如下：
```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>json数组转树型嵌套结构</title>
  </head>
  <body>
    <script>
      //原始数据，根据level分5位数代表1级，10位数代表2级，以此类推
      var dataJson = [
        {"name":"*a","id":"1","level":"00001"},
        {"name":"**a","id":"1","level":"0000100035"},
        {"name":"**a","id":"1","level":"0000100036"},
        {"name":"***a","id":"1","level":"000010003500020"},
        {"name":"***a","id":"1","level":"000010003500021"},
        {"name":"***a","id":"1","level":"000010003500022"},
        {"name":"*c","id":"1","level":"00003"},
        {"name":"**c","id":"1","level":"0000300037"},
        {"name":"****a","id":"1","level":"00001000350002100001"},
        {"name":"*b","id":"1","level":"00002"}
      ];
      
      //先按等级分类(同时整理原始json)
      var myArr = [] , newJson = [];
      for(var i = 0; i < dataJson.length; i++) {
        //将dataJson的索引按照等级分入myArr
        var thisIndex = dataJson[i].level.length / 5 - 1;
        if(myArr[thisIndex] === undefined) {
          myArr[thisIndex] = []
        }
        myArr[thisIndex].push(i)
        //重整对象属性(只保留name和level)
        var newObj={
          name  :dataJson[i].name,
          level  :dataJson[i].level
        }
        newJson.push(newObj)
      }
 
      //组成梯形
      var ladderArr = [];
      for(var i = myArr.length - 1; i >= 0; i--) {
        switch(i) {
          case 0:
            for(var l = 0; l < myArr[i].length; l++) {
              ladderArr.push(newJson[myArr[i][l]])
            }
            break;
          default:
            for(var j = 0; j < myArr[i].length; j++) {
              var str = dataJson[myArr[i][j]].level.substr(0, i * 5);
              for(var k = 0; k < myArr[i - 1].length; k++) {
                if(dataJson[myArr[i - 1][k]].level === str) {
                  if(newJson[myArr[i - 1][k]].list === undefined) newJson[myArr[i - 1][k]].list = [];
                  newJson[myArr[i - 1][k]].list.push(newJson[myArr[i][j]])
                }
              }
            }
        }
      }
      
      //打印结果
      console.log(ladderArr)
      console.log(JSON.stringify(ladderArr))
 
    </script>
  </body>
</html>
```
需要注意：
- 在等级分类时有新建“newJson”，这并不是必须的，而是为了排除掉level字段而新增的。
- 后面打印的结果，可以展开ladderArr对象，或者直接阅读对象字符串，已经能够发现这就是一颗树了

总之写完这个demo，尤其是在第二步中使用从后向前循环法并配合switch，感觉有受益，这也是一个好用的练手代码~