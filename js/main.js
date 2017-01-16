$(function(){
	var $col=$(".col"),
		$close=$(".close"),
		$detail=$(".detail"),
		title="",
		self=null,
		iframe=null,
		imgs=null,
		src="",
		flag=true,
		srcarr=[
			"https://zhangcuizc.github.io/",
			"https://zhangcuizc.github.io/jd-new"
			];

	$col.click(function(event) {
		if(flag){
			self=$(this);
			self.addClass('active').siblings('.col').addClass('inactive');
			$close.fadeIn();
			self.find('.col-content').css('top', '0').fadeIn(400, function() {
				imgs=self.find('img');
				imgs.each(function(index, el) {
					$(el).attr('src', $(el).attr('data-src'));
				});
			});
			title=self.find('h1').text();
			self.find('.col-title').text(title+"加载中");
			flag=false;
		}
	});

	$close.click(function(event) {
		if(!flag){
			event.stopPropagation();
			self.removeClass('active').siblings('.col').removeClass('inactive');
			$close.fadeOut();
			self.find('.col-content').fadeOut().siblings('iframe').hide();
			self.find('.col-title').text(title);
			flag=true;
		}
	});

	$detail.click(function(event) {
		event.stopPropagation();
		if(!$(this).parent(".col-content").siblings('iframe').length){
			src=srcarr[$(this).parents(".col").attr('class').match(/\d/g)-1];
			iframe=$('<iframe frameborder="0" src="'+src+'"></iframe>');
			$(this).parents(".col").append(iframe);
		}
		$(this).parent(".col-content").animate({top:"-100vh"}, 400).siblings('iframe').animate({top:"0"}, 400).fadeIn();
	});
});