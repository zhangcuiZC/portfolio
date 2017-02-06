$(function(){
	var $col=$(".col"),
		$close=$(".close"),
		$gotogithub=$(".gotogithub"),
		$detail=$(".detail"),
		title="",
		self=null,
		iframe=null,
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

	$col.each(function(index, el) {
		$(this).animate({top:"0"}, 100+index*150);
	});
	$col.click(function(event) {
		if(flag){
			self=$(this);
			idx=self.index();
			self.addClass('active changebg').siblings('.col').addClass('inactive');
			$close.fadeIn();
			self.find('.col-content').css('top', '0').show().find('.col-img').addClass('active');
			title=self.find('.col-h1 h1').text();
			self.find('.col-title').text("");
			flag=false;

			if(self.index()===2){
				self.find('.col3-img1').delay(300).animate({left: "10vw", top: "10vh"}, 300, function(){
					$(this).addClass('active');
					$(this).siblings('.col3-img2').delay(300).animate({left: "5vw", top: "40vh"}, 300, function(){
						$(this).addClass('active');
						var count=self.find('.col3-count span');
						count.each(function(index, el) {
							var countnum=parseInt($(this).attr('data-num'));
							var num=1;
							var counttimer=setInterval(function(){
								$(el).text(num);
								if(num<countnum-20){
									num+=3;
								}else{
									num++;
								}
								if(num===countnum+1){
									clearInterval(counttimer);
								}
							},60);
						});
					})
				})
			}

			if(self.index()===5){
				firecolortimer=setTimeout(function(){
					self.find('.col6-fire').addClass('active');
					self.find('.col6-rightbottom-item').each(function(index, el) {
						$(el).addClass('item'+(index+1));
					});
				},1000);
			}
		}
	});

	$close.click(function(event) {
		event.stopPropagation();
		if(!flag){
			self.removeClass('active changebg').siblings('.col').removeClass('inactive');
			$close.fadeOut();
			$gotogithub.fadeOut();
			self.find('.col-content').removeClass("changesm").fadeOut().siblings('iframe').removeClass('changelg');
			self.find('.col-img').removeClass('active');
			self.find('.col-title').text(title);
			flag=true;

			if(self.index()===2){
				self.find('.col3-img1').stop(true).css({left: "80vw", top: "80vh"}).removeClass('active').siblings('.col3-img2').stop(true).removeClass('active').css({left: "0", top: "100vh"});
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
				},1000);
				iframe.on('load', function(event) {
					event.preventDefault();
					$(".loading").fadeOut();
				});
			}
		}else{
			if(!flag){
				thiscontent.siblings('iframe').addClass('changelg');
			}
		}
	});
});