---
title: 没有退出接口的页面实现退出功能流程图
date: 2017-03-21 15:34:11
categories:
- 前端笔记
tags:
- 逻辑
---
登录退出功能一般是成对出现，但是项目中并不一定有退出的接口。这时就需要去模拟一个退出的操作，可以配合本地缓存/storage都可。下面是之前在ProcessOn上练习画的一个流程图，可能还不够完美，但是讲解一下思路，应该还是够了的。![没有退出接口的页面实现退出功能流程图效果](/public/img/1-1F3211101030-L.png)因为我的数据请求过程中需要用到appId和appSecret，所以在登录成功之后，将这一对数据存入缓存中，在接下来的过程中都是从缓存中拿appId和appSecret来使用。

点击退出时，则将缓存中这一对数据清空，并去登录页面重新获取一对appId和appSecret。

退出后若在其它功能页面访问其它数据接口，发送ajax后台在验证appId时，会发现这是一个无效的appId，同样会提示过期，然后重新登录。

理一下思路：
```pre
1. 打开app,去登录页面
2. 登录页面刷新一对appId和appSecret
3. 填写登录表单提交时，将appId作为参数，并使用公钥进行加密
4. 登录接口登录成功后将appId和Secret进行本地缓存
5. 其它页面若请求数据则同理将appId作为参数，注意这时需使用appSecret加密
6. 若请求成功，则使用appSecret进行解密成功
7. 若请求不成功(appId过期失效等情况)，则提示过期并重新去登录页面
8. 点击退出时，清空本地缓存的appId和appSecret，去登录页面
```
大致的流程就是这样~这个只是我个人的想法，您觉得不好的地方，欢迎轻拍。
