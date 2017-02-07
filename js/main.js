$(function(){
	var $col=$(".col"),
		$close=$(".close"),
		$gotogithub=$(".gotogithub"),
		$detail=$(".detail"),
		$icon=$(".topbar-icon"),
		$main=$(".main"),
		$leftbar=$(".leftbar"),
		$topbar=$(".topbar"),
		$shadelayer=$(".shadelayer"),
		title="",
		self=null,
		iframe=null,
		iframearr=[],
		imgs=null,
		idx,
		flag=true,
		firecolortimer=null,
		srcarr=[
			"https://zhangcuizc.github.io/",
			"https://zhangcuizc.github.io/jd-new",
			"https://www.cnblogs.com/zczhangcui/",
			"project-slideshow/index.html",
			"project-ajax/index.html",
			"project-fcc/index.html",
			"project-others/index.html"
			],
		hrefarr=[
			"https://github.com/zhangcuiZC/zhangcuiZC.github.io",
			"https://github.com/zhangcuiZC/jd-new",
			"https://www.cnblogs.com/zczhangcui/",
			"https://github.com/zhangcuiZC/slideshowzc",
			"https://github.com/zhangcuiZC/My-FreeCodeCamp",
			"https://github.com/zhangcuiZC/My-FreeCodeCamp",
			"https://github.com/zhangcuiZC/loading-dots"
			];

	// 加载样式
	$col.each(function(index, el) {
		$(this).animate({top:"0"}, 100+index*150);
	});

	// 柱状图展开事件
	$col.click(function(event) {
		if(flag){
			self=$(this);
			idx=self.index();
			self.addClass('active').siblings('.col').addClass('inactive');
			$close.fadeIn();
			self.find('.col-content').css('top', '0').show().find('.col-img').addClass('active');
			title=self.find('.col-h1 h1').text();
			self.find('.col-title').text("");
			$topbar.toggleClass('inactive');
			flag=false;

			if(self.index()===2){
				self.find('.col3-img1').addClass('active').siblings('.col3-img2').addClass('active');

				var count=self.find('.col3-count span');
				count.each(function(index, el) {
					var countnum=parseInt($(this).attr('data-num'));
					var num=1;
					var counttimer=setInterval(function(){
						$(el).text(num);
						if(num<countnum-20){
							num+=5;
						}else{
							num++;
						}
						if(num===countnum+1){
							clearInterval(counttimer);
						}
					},50);
				});
			}

			if(self.index()===5){
				firecolortimer=setTimeout(function(){
					self.find('.col6-fire').addClass('active');
					self.find('.col6-rightbottom-item').each(function(index, el) {
						$(el).addClass('item'+(index+1));
					});
				},800);
			}
		}
	});

	// 点击关闭按钮
	$close.click(function(event) {
		event.stopPropagation();
		if(!flag){
			self.removeClass('active').siblings('.col').removeClass('inactive');
			$close.fadeOut();
			$gotogithub.fadeOut();
			$(".loading").fadeOut();
			$topbar.toggleClass('inactive');
			self.find('.col-content').removeClass("changesm").hide().siblings('iframe').removeClass('changelg');
			self.find('.col-img').removeClass('active');
			self.find('.col-title').text(title);
			flag=true;

			if(self.index()===2){
				self.find('.col3-img1').removeClass('active').siblings('.col3-img2').removeClass('active');
				self.find('.col3-count span').text("");
			}

			if(self.index()===5){
				if(firecolortimer){
					clearTimeout(firecolortimer);
				}
				self.find('.col6-fire').removeClass('active');
				self.find('.col6-rightbottom-item').each(function(index, el) {
					$(el).removeClass('item'+(index+1));
				});
			}
		}
	});

	// 点击查看详情按钮
	$detail.click(function(event) {
		event.stopPropagation();
		$gotogithub.attr('href', hrefarr[idx]).fadeIn();
		var thiscontent=$(this).parents(".col-content");

		thiscontent.addClass("changesm");
		if(!thiscontent.siblings('iframe').length){
			iframe=$('<iframe frameborder="0"></iframe>');
			thiscontent.parents(".col").append(iframe);
			if(!flag){
				iframe.addClass('changelg');
				$(".loading").fadeIn();
				var iframetimer=setTimeout(function(){
					iframe.attr('src', srcarr[idx]);
					iframe.on('load', function(event) {
						$(".loading").fadeOut();
					});
				},500);
			}
		}else{
			if(!flag){
				thiscontent.siblings('iframe').addClass('changelg');
			}
		}
	});

	// 以下：展开/关闭侧边栏
	$icon.click(function(event) {
		$main.toggleClass('active');
		$leftbar.toggleClass('active');
		$shadelayer.toggleClass('active');
	});

	$shadelayer.click(function(event) {
		$main.removeClass('active');
		$leftbar.removeClass('active');
		$shadelayer.removeClass('active');
	});
});