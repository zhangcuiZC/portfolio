$(function(){
	(function(){
		var currentQuote = '', currentAuthor = '';

		function getQuote() {
			$.ajax({
				headers: {
				    "X-Mashape-Key": "OivH71yd3tmshl9YKzFH7BTzBVRQp1RaKLajsnafgL2aPsfP9V",
				    Accept: "application/json",
				    "Content-Type": "application/x-www-form-urlencoded"
				},

				url: 'https://andruxnet-random-famous-quotes.p.mashape.com/cat=',

				success: function(response) {
				    var r = JSON.parse(response);
				    currentQuote = r.quote;
				    currentAuthor = r.author;

				    $(".randomquote .quotecontent").animate({opacity: 0}, 500,function() {
				        $(this).animate({opacity: 1}, 500);
				        $('#content').text(r.quote);//以动画渐进的形式改变文字内容
				    });

				    $(".randomquote .quoteauthor").animate({opacity: 0}, 500,function() {
						$(this).animate({opacity: 1}, 500);
				        $('#author').text("--"+r.author);
				    });
				}
			});
		}

		getQuote();
		$('#newquote').on('click', getQuote);
	}());

	(function(){
		// 以下获得今天的日期与星期
		function updatedate(){
			var now=new Date();
			var day=now.getDay();
			var year=now.getFullYear();
			var month=now.getMonth();
			var date=now.getDate();
			var time=now.toLocaleTimeString();

			var day2week="";
			switch(day) {
				case 0:
					day2week="日";
					break;
				case 1:
					day2week="一";
					break;
				case 2:
					day2week="二";
					break;
				case 3:
					day2week="三";
					break;
				case 4:
					day2week="四";
					break;
				case 5:
					day2week="五";
					break;
				case 6:
					day2week="六";
					break;
			}

			$(".today .day").text(day2week);
			$(".today .year").text(year);
			$(".today .month").text(month+1);
			$(".today .date").text(date);
		}
		updatedate();

		// 更新所有天气信息
		function update(){
			var city=$(".city").val()||"北京";
			// var url="http://wthrcdn.etouch.cn/weather_mini?city="+city;
			var url="https://free-api.heweather.com/v5/weather?key=4a520f7c897c4049b42e1c9c526e6468&city="+city;
			$.ajax({
				url: url,
				success:function(info){
					if(info.HeWeather5[0].status=="ok"){
						var today=info.HeWeather5[0].daily_forecast[0].tmp;
						var now=info.HeWeather5[0].now;

						$(".today .thiscity").text(city);
						$(".todayotherinfo .time").text("数据更新时间："+info.HeWeather5[0].basic.update.loc);

						$(".todayotherinfo .nowtemp").text(now.tmp);
						$(".todayotherinfo .coldinfo").text(info.HeWeather5[0].suggestion.flu.brf+" : "+info.HeWeather5[0].suggestion.flu.txt);
						$(".todayotherinfo .airinfo").text(info.HeWeather5[0].suggestion.air.brf+" : "+info.HeWeather5[0].suggestion.air.txt);
						$(".todayotherinfo .comfinfo").text(info.HeWeather5[0].suggestion.comf.brf+" : "+info.HeWeather5[0].suggestion.comf.txt);



						var temprange=today.min+"~"+today.max;
						$(".todayinfo .temprange").text(temprange);
						$(".todayinfo .type").text(now.cond.txt);
						$(".todayinfo .wind").text(now.wind.dir+now.wind.sc+"级");
						if(info.HeWeather5[0].aqi){
							$(".todayinfo .aqi").text(info.HeWeather5[0].aqi.city.aqi+" "+info.HeWeather5[0].aqi.city.qlty);
						}else{
							$(".todayinfo .aqi").text("暂无数据");
						}

						// 未来四天预报
						$(".future li").each(function(index) {
							var idx=index+1;
							var future=info.HeWeather5[0].daily_forecast[idx];

							var date=future.date;
							var temprange=future.tmp.min+"~"+future.tmp.max;
							var type=future.cond.txt_n;
							var wind=future.wind.dir+future.wind.sc+"级";

							$(this).find('.date').text(date);
							$(this).find('.temprange').text(temprange);
							$(this).find('.type').text(type);
							$(this).find('.wind').text(wind);
						});
					}else{
						// 无法取得城市的天气信息
						$(".today .thiscity").text("无效的城市");
					}
				}
			});
		}
		update();

		// 点击更新
		$(".today .update").click(function(event) {
			update();
		});

		// 每小时自动更新
		var updatetimer=setInterval(function(){
			update();
		},3600000);
	})();

	(function(){
		var url='https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&origin=*&gsrsearch=';
				
		// search函数，通过AJAX/wikiAPI得到响应信息
		function search(url){
			$.ajax({
				url: url,
				success:function(response){
					// 获取响应信息中的pageid
					var x=Object.keys(response.query.pages);

					// 得到每个pageid的信息，包括搜索标题，摘要，链接，图片等
					$(x).each(function(index, el) {
						var page=response.query.pages[x[index]];

						var title=page.title;
						var extract=page.extract;
						var imgsrc="";
						try{
							imgsrc=page.thumbnail.source;
						}catch(e){}
						var listcontent="";
						if(imgsrc){
							listcontent="<img src='"+imgsrc+"'>";
						}
						listcontent+=extract;
						var href="http://en.wikipedia.org/wiki/"+encodeURIComponent(title);
						var list=$(".searchresult ol li").eq(index);
						list.find('a').text(title).attr('href', href);
						list.find('p').html(listcontent);
					});
				}
			});
		}

		// 点击搜索按钮后触发
		$(".searchbtn").click(function() {
			var searchwhat=$(".inputbox").val();
			if(searchwhat&&searchwhat!=="please input something"){
				var searchurl=url+searchwhat;
				search(searchurl);
				// 动画效果
				$(".logo img").fadeOut();
				$(".searchbox").animate({marginTop:"5px"}, 400,function(){
					$(".searchresult").animate({height:"show"}, 600);
				});
			}else{
				$(".inputbox").val("please input something").trigger('focus');
			}
		});

		// 文本框获得焦点后触发
		$(".inputbox").focus(function() {
			$(this).select();
			$(".searchbox").animate({marginTop:"300px"}, 400 ,function(){
				$(".logo img").fadeIn();
			});
			$(".searchresult").stop(true,true).animate({height:"hide"}, 600);
		}).keyup(function(event) {
			// 按回车触发搜索
			if (event.keyCode==13) {
				$(".searchbtn").trigger('click');
			}
		});
	}());

	(function(){
		function search(){
			$.ajax({
				url: 'https://api.twitch.tv/kraken/streams?game=dota%202&limit=16',
				headers:{
					Accept: 'application/vnd.twitchtv.v3+json',
					'Client-Id':'1gpgz9i8q62g3jqrpr3csg8e4sj7u9'
				},
				success:function(response){
					$(".twitchdota2 .content .item").each(function(index) {
						var info=response.streams[index];
						$(this).attr('href', info.channel.url);	
						$(this).find('img').attr('src', info.preview.medium);
						$(this).find('.status').text(info.channel.status);
						$(this).find('.name').text(info.channel.display_name);
						$(this).find('.num span').text(info.viewers);
					});

				}
			});

			$(".twitchdota2 .topbar").animate({marginTop:"10px"}, 400, function(){
				$(".twitchdota2 .content").animate({height:"show"}, 400);
			});
		}

		$(".twitchdota2 .btn").click(function(event) {
			search();
		});

		$(".twitchdota2 .item").hover(function() {
			$(this).find('.layer').stop().fadeIn(400).find('span').addClass('hovered');
		}, function() {
			$(this).find('.layer').stop().fadeOut(400).find('span').removeClass('hovered');
		});
	})();
});
$(window).on("load",function(){$(".triangle").addClass('loaded');});