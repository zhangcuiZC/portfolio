$(function(){
	var $col=$(".col"),
		$close=$(".close"),
		self=null;

	$col.click(function(event) {
		self=$(this);
		self.addClass('active').siblings('.col').addClass('inactive');
		$close.fadeIn();
	});

	$close.click(function(event) {
		self.removeClass('active').siblings('.col').removeClass('inactive');
		$close.fadeOut();
	});
});