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
			"project-slideshow/index.html",
			"project-ajax/index.html",
			"project-fcc/index.html"
			],
		hrefarr=[
			"https://github.com/zhangcuiZC/zhangcuiZC.github.io",
			"https://github.com/zhangcuiZC/jd-new",
			"https://www.cnblogs.com/zczhangcui/",
			"https://github.com/zhangcuiZC/slideshowzc",
			"https://github.com/zhangcuiZC/My-FreeCodeCamp",
			"https://github.com/zhangcuiZC/My-FreeCodeCamp",
			];

	$col.each(function(index, el) {
		$(this).animate({top:"0"}, 100+index*100);
	});
	$col.click(function(event) {
		if(flag){
			self=$(this);
			self.addClass('active').siblings('.col').addClass('inactive');
			$close.fadeIn();
			self.find('.col-content').css('top', '0').show();
			title=self.find('h1').text();
			self.find('.col-title').text('连接到"'+title+'"').addClass('dot');
			flag=false;
		}
	});

	$close.click(function(event) {
		event.stopPropagation();
		if(!flag){
			self.removeClass('active').siblings('.col').removeClass('inactive');
			$close.fadeOut();
			$gotogithub.fadeOut();
			self.find('.col-content').fadeOut().siblings('iframe').hide();
			self.find('.col-title').text(title).removeClass('dot');
			flag=true;
		}
	});

	$detail.click(function(event) {
		event.stopPropagation();
		$gotogithub.fadeIn();
		$(this).parent(".col-content").addClass("changesm").delay(300).animate({top:"-100vh"}, 400 ,function(){
			$(this).removeClass('changesm');
			if(!$(this).siblings('iframe').length){
				idx=$(this).parents(".col").attr('class').match(/\d/g)-1;
				$gotogithub.attr('href', hrefarr[idx]);
				iframe=$('<iframe frameborder="0" src="'+srcarr[idx]+'"></iframe>');
				$(this).parents(".col").append(iframe);
				iframe=$(this).siblings('iframe');
				$(iframe.contentDocument).ready(function($) {
					if(!flag){
						iframe.show();
					}
				});				
			}else{
				if(!flag){
					$(this).siblings('iframe').fadeIn();
				}
			}
		});
	});
});