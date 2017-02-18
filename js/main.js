$(function(){
	// 柱状图模块
	// 该模块不接受参数，只暴露接口init，用于初始化
	var colModule = (function() {
		var $col = $(".col"),
			$close = $(".close"),
			$gotogithub = $(".gotogithub"),
			$detail = $(".detail"),
			$icon = $(".topbar-icon"),
			$main = $(".main"),
			$leftbar = $(".leftbar"),
			$topbar = $(".topbar"),
			$shadelayer = $(".shadelayer"),
			$loading = $(".loading"),
			title = "",
			self = null,
			iframe = null,
			idx,
			flag = true,
			firecolortimer = null,
			srcarr = [
				"https://zhangcuizc.github.io/",
				"https://zhangcuizc.github.io/jd-new",
				"project-fcc/index.html",
				"https://www.cnblogs.com/zczhangcui/",
				"project-ajax/index.html",
				"project-slideshow/index.html",
				"project-others/index.html"
			],
			hrefarr = [
				"https://github.com/zhangcuiZC/zhangcuiZC.github.io",
				"https://github.com/zhangcuiZC/jd-new",
				"https://github.com/zhangcuiZC/My-FreeCodeCamp",
				"https://www.cnblogs.com/zczhangcui/",
				"https://github.com/zhangcuiZC/My-FreeCodeCamp",
				"https://github.com/zhangcuiZC/slideshowzc",
				"https://github.com/zhangcuiZC/loading-dots"
			],

			// 私有方法-展开
			colexpand = function(element) {
				if(flag) {
					self = $(element);
					idx = self.index();
					self.addClass('active').siblings('.col').addClass('inactive');
					$close.fadeIn();
					self.find('.col-content').show();
					title = self.find('.col-title').text();
					self.find('.col-title').text("");
					$topbar.toggleClass('inactive');
					flag = false;

					if(idx === 1){
						self.find('.col2-img').addClass('active');
					}

					if(self.index() === 3) {
						self.find('.col4-img1').addClass('active').siblings('.col4-img2').addClass('active');

						var count = self.find('.col4-count span');
						count.each(function(index, el) {
							var countnum = parseInt($(this).attr('data-num'));
							var num = 1;
							var counttimer = setInterval(function() {
								$(el).text(num);
								if(num < countnum - 20){
									num += 5;
								}else{
									num++;
								}
								if(num === countnum + 1) {
									clearInterval(counttimer);
								}
							}, 50);
						});
					}

					if(self.index() === 2) {
						firecolortimer = setTimeout(function() {
							self.find('.col3-fire').addClass('active');
							self.find('.col3-rightbottom-item').each(function(index, el) {
								$(el).addClass('item' + (index + 1));
							});
						}, 800);
					}
				}
			},

			// 私有方法-关闭
			colclose = function() {
				if(!flag) {
					self.removeClass('active').siblings('.col').removeClass('inactive');
					$close.fadeOut();
					$gotogithub.fadeOut();
					$loading.fadeOut();
					$topbar.toggleClass('inactive');
					self.find('.col-content').removeClass("changesm").hide().siblings('iframe').removeClass('changelg');
					self.find('.col-title').text(title);
					flag = true;

					if(idx === 1) {
						self.find('.col2-img').removeClass('active');
					}

					if(self.index() === 3) {
						self.find('.col4-img1').removeClass('active').siblings('.col4-img2').removeClass('active');
						self.find('.col4-count span').text("");
					}

					if(self.index() === 2) {
						if(firecolortimer) {
							clearTimeout(firecolortimer);
						}
						self.find('.col3-fire').removeClass('active');
						self.find('.col3-rightbottom-item').each(function(index, el) {
							$(el).removeClass('item' + (index + 1));
						});
					}
				}
			},

			// 私有方法-显示iframe
			showiframe = function(element) {
				$gotogithub.attr('href', hrefarr[idx]).fadeIn();
				var thiscontent = $(element).parents(".col-content");

				thiscontent.addClass("changesm");
				if(!thiscontent.siblings('iframe').length) {
					iframe = $('<iframe frameborder="0"></iframe>');
					thiscontent.parents(".col").append(iframe);
					if(!flag) {
						iframe.addClass('changelg');
						$(".loading").fadeIn();
						var iframetimer = setTimeout(function() {
							iframe.attr('src', srcarr[idx]);
							iframe.on('load', function(event) {
								$loading.fadeOut();
							});
						}, 500);
					}
				}else{
					if(!flag) {
						thiscontent.siblings('iframe').addClass('changelg');
					}
				}
			},

			// 公有方法-初始化（绑定事件）
			init = function() {
				// 加载样式
				$col.each(function(index, el) {
					$(this).animate({top:"0"}, 100+index*150);
				});

				$(".col-content").hide().css('top', '0');

				// 柱状图展开事件
				$col.click(function() {
					colexpand(this);
				});

				// 点击关闭按钮
				$close.click(function(event) {
					event.stopPropagation();
					colclose();
				});

				// 点击查看详情按钮
				$detail.click(function(event) {
					event.stopPropagation();
					showiframe(this);
				});

				// 以下：展开/关闭侧边栏
				$icon.click(function(event) {
					$main.toggleClass('active').siblings('.topbar').toggleClass('short').find('p').toggle();
					$leftbar.toggleClass('active');
					$shadelayer.toggleClass('active');
				});

				$shadelayer.click(function(event) {
					$main.removeClass('active').siblings('.topbar').removeClass('short').find('p').show();
					$leftbar.removeClass('active');
					$shadelayer.removeClass('active');
				});
			};

		return {
			init: init
		};
	}());

	// 初始化
	colModule.init();
});