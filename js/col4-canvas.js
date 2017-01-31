$(function(){
	var col4cvs=$("#col4-canvas")[0];
	var timer=null;
	window.onresize=function(){
		clearTimeout(timer);
		timer=setTimeout(function(){
			$(col4cvs).width(parseInt($(window).height())/7*8);
		},200);
	}
	$(window).trigger('resize');
	
	if(col4cvs.getContext){
		var context=col4cvs.getContext("2d");
		context.fillStyle="#000000";
		context.lineWidth="20";
		context.strokeStyle="#000";

		context.beginPath();
		context.arc(850,150,200,0,2*Math.PI,false);
		context.moveTo(400,150);
		context.arc(300,150,100,0,2*Math.PI,false);
		context.moveTo(300,450);
		context.arc(150,450,150,0,2*Math.PI,false);
		context.moveTo(600,750);
		context.arc(450,750,150,0,2*Math.PI,false);
		context.fill();
		context.closePath();

		context.beginPath();
		context.moveTo(300,150);
		context.lineTo(850,150);
		context.lineTo(150,450);
		context.moveTo(850,150);
		context.lineTo(450,750);
		context.stroke();

		// context.fillStyle="#ffffff";
		// context.font="16px 'microsoft yahei'";
		// context.textAlign="center";
		// context.textBaseline="middle";
		// context.fillText("jquery.slideshow.js",300,130);
		// context.fillText("方式一：无差别滑动轮播",300,170);
		// context.fillText("jquery.slideshowfadein.js",150,430);
		// context.fillText("方式二：淡入淡出轮播",150,470);
		// context.fillText("……",450,650);
	}
});