$(document).ready(function() {
		//[全部页面]
		//头部菜单----start
		var $menuSide = $('.menu-side'),
				$menuBtn = $('.menu-btn');
		//菜单按钮点击事件
		$menuBtn.on('click',function(){
			//判断菜单是否打开
			$menuBtn.hide(200);
			if($menuBtn.hasClass('menu-open')){
				$menuSide.animate({'right':'-300px'},function(){
					$menuBtn.removeClass('menu-open').show(200);
				})
			}else{
				$menuSide.animate({'right':'0'},function(){
					$menuBtn.addClass('menu-open').show(200);
				})
			}
		})
		//头部菜单----end
		
		//[仅首页]
		//下划时隐藏head----start
		if($('.header').length > 0){
			var $body = $('body'),
					$main = $('.main'),
					$head = $('.header');
			var $mainTop = $main[0].offsetTop;
			//监听滚动条
			window.addEventListener('scroll',bodyScroll,false)
			function bodyScroll(){
				if($body[0].scrollTop > $mainTop*0.25){
					$head.addClass('header-hide');
				}else{
					$head.removeClass('header-hide');
				}
			}
		}
		//下划时隐藏head----end
		
		
		//[仅文章归档-时间轴页面]
		//年月日期整理浮动--start
		if($('.list-timeline').length > 0){
			var $list = $('.list-timeline');
			var $arrScroll = [];	//滚动关键点
			var $arrTime = [];	//时间关键点
			var timeReg = /[0-9]{2,4}/g;
			//获取相关信息
			for(var i=0; i< $list.length; i++){
				$arrScroll.push($list.eq(i).offset().top)
				$arrTime.push($list.eq(i).children('.time').html().match(timeReg))
			}
			//整理归纳关键时间点渲染到dom
			var $domFlex = $('<div class="flex-timeline"></div>');
			var $ddArr = [];  //用于记录dd节点-绑定滚动事件
			var $dtTemp = '',
					$ddTemp = [],
					$dlTemp=[],j=0;
			for(var i =0; i<$arrTime.length; i++){
				//分三种情况将dom按照dl-dt-dd传入domFlex
				switch(i){
					case 0:
						$dlTemp[j]=$('<dl></dl>')
						$dtTemp = $('<dt>'+$arrTime[i][0]+'年</dt>');
						$dlTemp[j].append($dtTemp)
						$ddTemp = $('<dd>'+$arrTime[i][1]+'月</dd>');
						$ddArr.push($ddTemp);
						$dlTemp[j].append($ddTemp)
						break;
					case $arrTime.length-1:
						if($arrTime[i][0] !== $arrTime[i-1][0]){
							$domFlex.append($dlTemp[j]);
							j++;
							$dlTemp[j]=$('<dl></dl>');
							$dtTemp = $('<dt>'+$arrTime[i][0]+'年</dt>');
							$dlTemp[j].append($dtTemp)
						}
						$ddTemp = $('<dd>'+$arrTime[i][1]+'月</dd>');
						$ddArr.push($ddTemp);
						$dlTemp[j].append($ddTemp)
						$domFlex.append($dlTemp[j]);
						break;
					default:
						if($arrTime[i][0] === $arrTime[i-1][0]){
							$ddTemp = $('<dd>'+$arrTime[i][1]+'月</dd>');
							$ddArr.push($ddTemp);
							$dlTemp[j].append($ddTemp);
						}else{
							$domFlex.append($dlTemp[j]);
							j++;
							$dlTemp[j]=$('<dl></dl>');
							$dtTemp = $('<dt>'+$arrTime[i][0]+'年</dt>');
							$dlTemp[j].append($dtTemp)
							$ddTemp = $('<dd>'+$arrTime[i][1]+'月</dd>');
							$ddArr.push($ddTemp);
							$dlTemp[j].append($ddTemp)
						}
				}
			}
			$('body').append($domFlex);
			//dom渲染完成
			//滚动事件相关
			var $body = $('body');
			//初始化当前位置索引
			var $index = 0,$tempIdx = 0;
			$ddArr[$index].addClass('ddon').parent('dl').addClass('dlon')
			//监听滚动条
			window.addEventListener('scroll',timelineScroll,false)
			function timelineScroll(){
				if(!$body.is(':animated')){
					//获取滚动条值
					var $scrollTop = $body[0].scrollTop;
					for(var i=0; i<$arrScroll.length; i++){
						if(i===0 && $scrollTop <= $arrScroll[0]){
							$tempIdx = 0;
						}else if(i === $arrScroll.length-1 && $scrollTop > $arrScroll[i]){
							$tempIdx = i;
						}else if($scrollTop >= $arrScroll[i] && $scrollTop< $arrScroll[i+1]){
							$tempIdx = i;
						}
					}
					//判断temp索引与当前索引是否一致再去dom操作
					if($index != $tempIdx){
						//赋值
						$ddArr[$index].removeClass('ddon').parent('dl').removeClass('dlon');
						$index = $tempIdx;
						$ddArr[$tempIdx].addClass('ddon').parent('dl').addClass('dlon')
					}
				}
			}
			//监听完成
			//锚点事件
			$($ddArr).each(function(index){
				$(this).on('click',function(){
					//当滚动条不在动画时再执行scrollTop
//					$body.scrollTop($arrScroll[i])	//无动画
					if(!$body.is(':animated') && index !== $index){
						$body.animate({'scrollTop':$arrScroll[index]},200)
						$ddArr[$index].removeClass('ddon').parent('dl').removeClass('dlon');
						$index = index;
						$tempIdx = index;
						$ddArr[index].addClass('ddon').parent('dl').addClass('dlon')
					}
				})
			})
			//dl展开
			$domFlex.find('dt').on('click',function(){
				var $parent = $(this).parent()
				if(!$parent.hasClass('dlon')){
					$parent.addClass('dlon').siblings('dl').removeClass('dlon');
				}
			})
		}
		//年月日期整理浮动--end
		
		console.log()
		
		//归档时若分辨率小于750则隐藏浮动改动点击标题收缩
		$('.timeline-warp .time').on('click',function(){
			if($('body').width() <= 750){
				$(this).next('ul').slideToggle(200)
			}
		})
});
