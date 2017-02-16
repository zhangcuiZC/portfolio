$(function(){
	var col={
		// col对象的属性
		$col: $(".col"),
		$close: $(".close"),
		$gotogithub: $(".gotogithub"),
		$detail: $(".detail"),
		$icon: $(".topbar-icon"),
		$main: $(".main"),
		$leftbar: $(".leftbar"),
		$topbar: $(".topbar"),
		$shadelayer: $(".shadelayer"),
		$loading: $(".loading"),
		title: "",
		self: null,
		iframe: null,
		idx: undefined,
		flag: true,
		firecolortimer: null,
		srcarr: [
			"https://zhangcuizc.github.io/",
			"https://zhangcuizc.github.io/jd-new",
			"project-fcc/index.html",
			"https://www.cnblogs.com/zczhangcui/",
			"project-ajax/index.html",
			"project-slideshow/index.html",
			"project-others/index.html"
		],
		hrefarr: [
			"https://github.com/zhangcuiZC/zhangcuiZC.github.io",
			"https://github.com/zhangcuiZC/jd-new",
			"https://github.com/zhangcuiZC/My-FreeCodeCamp",
			"https://www.cnblogs.com/zczhangcui/",
			"https://github.com/zhangcuiZC/My-FreeCodeCamp",
			"https://github.com/zhangcuiZC/slideshowzc",
			"https://github.com/zhangcuiZC/loading-dots"
		],

		// col对象的方法-展开
		colexpand: function(element){
			if(col.flag){
				col.self=$(element);
				col.idx=col.self.index();
				col.self.addClass('active').siblings('.col').addClass('inactive');
				col.$close.fadeIn();
				col.self.find('.col-content').show();
				col.title=col.self.find('.col-title').text();
				col.self.find('.col-title').text("");
				col.$topbar.toggleClass('inactive');
				col.flag=false;

				if(col.idx===1){
					col.self.find('.col2-img').addClass('active');
				}

				if(col.self.index()===3){
					col.self.find('.col4-img1').addClass('active').siblings('.col4-img2').addClass('active');

					var count=col.self.find('.col4-count span');
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

				if(col.self.index()===2){
					col.firecolortimer=setTimeout(function(){
						col.self.find('.col3-fire').addClass('active');
						col.self.find('.col3-rightbottom-item').each(function(index, el) {
							$(el).addClass('item'+(index+1));
						});
					},800);
				}
			}
		},

		// col对象的方法-关闭
		colclose: function(){
			if(!col.flag){
				col.self.removeClass('active').siblings('.col').removeClass('inactive');
				col.$close.fadeOut();
				col.$gotogithub.fadeOut();
				col.$loading.fadeOut();
				col.$topbar.toggleClass('inactive');
				col.self.find('.col-content').removeClass("changesm").hide().siblings('iframe').removeClass('changelg');
				col.self.find('.col-title').text(col.title);
				col.flag=true;

				if(col.idx===1){
					col.self.find('.col2-img').removeClass('active');
				}

				if(col.self.index()===3){
					col.self.find('.col4-img1').removeClass('active').siblings('.col4-img2').removeClass('active');
					col.self.find('.col4-count span').text("");
				}

				if(col.self.index()===2){
					if(col.firecolortimer){
						clearTimeout(col.firecolortimer);
					}
					col.self.find('.col3-fire').removeClass('active');
					col.self.find('.col3-rightbottom-item').each(function(index, el) {
						$(el).removeClass('item'+(index+1));
					});
				}
			}
		},

		// col对象的方法-显示iframe
		showiframe: function(element){
			col.$gotogithub.attr('href', col.hrefarr[col.idx]).fadeIn();
			var thiscontent=$(element).parents(".col-content");

			thiscontent.addClass("changesm");
			if(!thiscontent.siblings('iframe').length){
				col.iframe=$('<iframe frameborder="0"></iframe>');
				thiscontent.parents(".col").append(col.iframe);
				if(!col.flag){
					col.iframe.addClass('changelg');
					$(".loading").fadeIn();
					var iframetimer=setTimeout(function(){
						col.iframe.attr('src', col.srcarr[col.idx]);
						col.iframe.on('load', function(event) {
							col.$loading.fadeOut();
						});
					},500);
				}
			}else{
				if(!col.flag){
					thiscontent.siblings('iframe').addClass('changelg');
				}
			}
		},

		// col对象的方法-初始化（绑定事件）
		init: function(){
			// 加载样式
			col.$col.each(function(index, el) {
				$(this).animate({top:"0"}, 100+index*150);
			});

			$(".col-content").hide().css('top', '0');

			// 柱状图展开事件
			col.$col.click(function() {
				col.colexpand(this);
			});

			// 点击关闭按钮
			col.$close.click(function(event) {
				event.stopPropagation();
				col.colclose();
			});

			// 点击查看详情按钮
			col.$detail.click(function(event) {
				event.stopPropagation();
				col.showiframe(this);
			});

			// 以下：展开/关闭侧边栏
			col.$icon.click(function(event) {
				col.$main.toggleClass('active').siblings('.topbar').toggleClass('short').find('p').toggle();
				col.$leftbar.toggleClass('active');
				col.$shadelayer.toggleClass('active');
			});

			col.$shadelayer.click(function(event) {
				col.$main.removeClass('active').siblings('.topbar').removeClass('short').find('p').show();
				col.$leftbar.removeClass('active');
				col.$shadelayer.removeClass('active');
			});
		}
	};

	// 初始化
	col.init();
});