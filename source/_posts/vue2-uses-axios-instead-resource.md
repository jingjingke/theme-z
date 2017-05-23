---
title: vue2使用axios代替vue-resource
date: 2017-03-09 15:18:12
categories:
- 前端笔记
tags:
- VUE
---
终于将vue-resource替换成axios了，其中像application/x-www-form-urlencoded发送的头信息以及返回的response结果这两点都需要注意一下。![vue2使用axios代替vue-resource说明图](/theme-z/public/img/1-1F310102229205.png)
其实[axios官方](https://github.com/mzabriskie/axios)也有说明。因为我在vue-resource中使用了
```js
Vue.http.options.emulateJSON = true;
```
这种请求在发送头信息时会将Content-Type改为application/x-www-form-urlencoded，而若使用axios的话，为了达到这种效果作者提供了两种方法。

第一种使用new URLSearchParams()，但是这种方法兼容有点不好。所以我使用的是第二种方法，使用node_modules文件夹中的qs模块。因为我之前已经将ajax请求稍微封装了一下（下面说的代码基本都是在ajax.js中添加的），所以改动其实真不多。

安装axios模块就不说了，先将axios和qs引用进来。
```js
import axios from 'axios';
import qs from 'qs';
```
然后将发送的请求参数外面使用qs.stringify进行包裹。
```js
qs.stringify( data )
```
最后将接受的结果，提取正确的字段。（在vue-resource中正文件是response.body，而在axios中正文则是response.data。这个需要注意一下）	
```js
console.log(response.data)     //这个打印出来的就是返回的结果
```
其中response中则有一些请求状态等等相关的参数，我这边很少用到，所以就不列出来了。只需上面三步，就完成了vue-resource到axios的转换。同时解决了axios发送x-www-form-urlencoded的需求，特别方便吧~

另外贴上我整个ajax.js文件，中间用到了加密解密，可以无视一下。
```js
import Vue from 'vue';
import axios from 'axios';
import qs from 'qs';
 
//导入数据加密方法
import secretJS from './secret';
 
//当前运行环境
var domain = 'XXX';
 
//封装ajax
var ajax = {
  //通用的ajax-post
  common:function(url,data,sucFn,secret,errFn){
    //param说明
    //@url    ajax访问的url
    //@data    post发送的数据
    //@sucFn  ajax成功时运行函数
    //@errFn  ajax失败时运行函数(大部分为缺省，但例如登录出错时则需要)
 
    //发送ajax
    axios.post(domain + url , qs.stringify(secretJS.reData(data,secret)) ).then(
      (response) => {
        //先判断appId是否已经过期
        if(response.data != 'appId not exist'){
          //解密数据
          var rs = JSON.parse(secretJS.backSecret(response.data,secret));
          //如果
          if(rs.success == true)  sucFn(rs);
          else{
            if(errFn === undefined){
              //(退出登录或私钥+ID丢失)后访问页面-提示过期
              this.$router.push('/expired');
            }else{
              errFn(rs);
            }
          }
        }else{
          //否则跳转到温馨提示登录过期页面
          this.$router.push('/login');
        }
      }
    )
    //ajax完成
  }
}
 
export default ajax;
```
可以完善的地方还有很多，欢迎拍砖~