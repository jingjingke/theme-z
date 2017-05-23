---
title: JS转换金额之数字到中文的转化
date: 2016-10-13 15:09:50
categories:
- 前端笔记
tags:
- JS
---
之前项目中有个合同页面需要将数字金额转换成大写汉字，在百度上搜索到了一个关于Js实现将数字钱币与中文汉字转换的代码，感觉现在这东西金融网站上能用的地方还满多的，所以保存下~![JS转换金额之数字到中文的转化配图](/theme-z/public/img/1-16101Q14014F0.png)

应该说是非常容易理解的啦，只要调用digit_uppercase这个函数就可以了，返回值就是大写的钱币数额。

具体代码如下：
```pre
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>JS转换金额之数字到中文的转化</title>
</head>
<body>
<script>
//数字到中文的转化
function digit_uppercase(n){
  var fraction = ['角', '分'];
  var digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']; 
  var unit = [ ['', '万', '亿'], ['', '拾', '佰', '仟']  ];
  var head = n < 0? '欠': ''; 
  n = Math.abs(n);
  var s = ''; 
  for (var i = 0; i < fraction.length; i++){
    s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
  }
  n = Math.floor(n);
  for (var i = 0; i < unit[0].length && n > 0; i++){
    var p = ''; 
    for (var j = 0; j < unit[1].length && n > 0; j++){
      p = digit[n % 10] + unit[1][j] + p;
      n = Math.floor(n / 10);
    }
    s = p.replace(/(零.)*零$/, '').replace(/^$/, '零')  + unit[0][i] + s; 
  }
  return head + s.replace(/(零.)*零元/, '').replace(/(零.)+/g, '零').replace(/^整$/, ''); 
}
//测试
console.log(digit_uppercase(123456));
</script>
</body>
</html>
```

金融网站上面用的应该比较多，像我用的就是合同的地方将调用出的数字改为汉字大写的金额~


