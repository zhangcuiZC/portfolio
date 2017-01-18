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
		srcarr=[
			"https://zhangcuizc.github.io/",
			"https://zhangcuizc.github.io/jd-new",
			"https://www.cnblogs.com/zczhangcui/",
			"project-slideshow/index.html"
			],
		hrefarr=[
			"https://github.com/zhangcuiZC/zhangcuiZC.github.io",
			"https://github.com/zhangcuiZC/jd-new",
			"https://www.cnblogs.com/zczhangcui/"
			];

	$col.each(function(index, el) {
		$(this).animate({top:"0"}, 100+index*100);
	});
	$col.click(function(event) {
		if(flag){
			self=$(this);
			self.addClass('active').siblings('.col').addClass('inactive');
			$close.fadeIn();
			self.find('.col-content').css('top', '0').fadeIn(400, function() {
				// imgs=self.find('img');
				// imgs.each(function(index, el) {
				// 	$(el).attr('src', $(el).attr('data-src'));
				// });
			});
			title=self.find('h1').text();
			self.find('.col-title').text(title+"连接中...");
			flag=false;
		}
	});

	$close.click(function(event) {
		if(!flag){
			event.stopPropagation();
			self.removeClass('active').siblings('.col').removeClass('inactive');
			$close.fadeOut();
			$gotogithub.fadeOut();
			self.find('.col-content').fadeOut().siblings('iframe').hide();
			self.find('.col-title').text(title);
			flag=true;
		}
	});

	$detail.click(function(event) {
		event.stopPropagation();
		$gotogithub.fadeIn();
		$(this).parent(".col-content").animate({top:"-100vh"}, 400 ,function(){
			if(!$(this).siblings('iframe').length){
				idx=$(this).parents(".col").attr('class').match(/\d/g)-1;
				$gotogithub.attr('href', hrefarr[idx]);
				iframe=$('<iframe frameborder="0" src="'+srcarr[idx]+'"></iframe>');
				$(this).parents(".col").append(iframe);
			}
			$(this).siblings('iframe').animate({top:"0"}, 400).fadeIn();
		});
	});
});