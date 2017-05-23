# theme-z #
仿TKL做的一个hexo主题模板，比较简单，意在学习

## 安装 ##
在安装hexo之后，去到themes文件夹下，执行
``` bash
git clone https://github.com/jingjingke/theme-z.git
```
之后将根目录下面的`_config.yml`中主题修改为`theme-z`，就完成了。

而同时你应该也发现了，`theme-z`文件夹下也有一个`_config.yml`的文件。这个就是涉及到该主题的相关配置信息。在此我只记录了右侧滚动条显示TAG与归档的开关配置，以及网站TDK（TDK引用的是模板的配置，没并且用根配置）。

## 结构 ##
主题中的文件包含两大块，`source`和`layout`,前者主要负责网站ui部分，后者才是模板的关键，这里主要说明的是`layout`，ui里面有scss和静态页面demo,看例子就能明白，所以不会太做说明。
```pre
//layout下的6个ejs文件，就是hexo对应的主要6个模板类型

layout.ejs       //根模板(感觉可以看成一个路由模板)
index.ejs        //首页模板
archive.ejs      //归档模板
category.ejs     //指定分类列表模板
tag.ejs          //指定tag列表模板
post.ejs         //指定文章模板

//本来应该还有一个page.ejs,感觉其实跟post差不多，需要的话可以练习写一个

```
打开layout文件夹，可以看到一个_partial文件夹，这里面的可以看作模块(页面的组成部分)。文件说明如下：
```pre
footer.ejs        //通用底部
header.ejs        //暂时只首页使用header
list.ejs          //列表样式1（首页，分类，TAG通用）
list2.ejs         //列表样式2(暂时不用)
menu.ejs          //右侧菜单
paginator.ejs     //分页
tdk.ejs           //tdk网站标题说明关键字
```
一个网站模板大致就是这些了。另外UI的部分需要注意的是网站图标，是在`source > img > favicon.ico`。


## 配置 ##

在theme-z主题的配置文件`_config.yml`中，可以使用`theme.XXX`来访问到这里定义的一些值。目前有菜单显示的两个按钮，以及归档按钮打开的话，显示归档类型，文档数开关，日期格式等。另外还有首页与归档页面的TDK以及归档页面使用的头像。

里面的注释还是比较清晰的，使用前建议稍微看看。
```pre
#MENU菜单是否显示TAGS [布尔值...]
menu_tag: true
#MENU菜单是否显示归档 [布尔值...]
menu_arc: false

#MENU菜单显示归档后用到的参数
#归档类型=====[按年归档：yearly 按月归档：monthly]
archive_type: 'monthly'
#显示文章数====[true显示，false不显示]
show_count: true
#日期格式=====[年：YYYY或YY 月：MM]
format: 'YYYY年MM月'

#TDK网站标题说明关键字
#应用首页
title: 'hexo-blog'
subtitle: 'Every moment, are you thinking?'
keywords: '学习,博客,首页,生活,前端笔记,空间'
description: '这是一个分享我生活与前端学习的空间，欢迎访问我的博客。'

……
```