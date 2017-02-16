$(function(){
	// 倒计时
	(function(){
		var $box=$(".clockbox"),

			$breakminus=$(".break-minus"),
			$breakplus=$(".break-plus"),
			$breaknum=$(".break-num"),

			$sessionminus=$(".session-minus"),
			$sessionplus=$(".session-plus"),
			$sessionnum=$(".session-num"),

			$clock=$(".clock"),
			$clockname=$(".clock-name"),
			$clockminute=$(".clock-minute"),
			$clocksecond=$(".clock-second"),
			$clockdot=$(".clock-dot"),
			$clocklayer1=$(".clock-layer1"),
			$clocklayer2=$(".clock-layer2"),

			timer=null,
			greenbgtimer=null,
			purplebgtimer=null,
			breaktime=true,
			flag=true;
		//事件委托
		$box.on('click', '.click', function(event) {
			var $e=$(event.target);
			if(flag){//flag为true表示倒计时未开始，可以点击加减进行时间更改
				if($e.hasClass('break-minus')){
					if($breaknum.text()-0>1){
						$breaknum.text($breaknum.text()-1);
					}
				}

				if($e.hasClass('break-plus')){
					if($breaknum.text()-0<99){
						$breaknum.text($breaknum.text()-0+1);
					}
				}

				if($e.hasClass('session-minus')){
					if($sessionnum.text()-0>1){
						$sessionnum.text($sessionnum.text()-1);
						$clockminute.text($sessionnum.text());
						$clockdot.hide();
						$clocksecond.text('');
						$clockname.text("Session");
						$clocklayer1.css('height', "0");
						$clocklayer2.css('height', "0");
						$clocklayer2.removeClass('active');
					}
				}

				if($e.hasClass('session-plus')){
					if($sessionnum.text()-0<99){
						$sessionnum.text($sessionnum.text()-0+1);
						$clockminute.text($sessionnum.text());
						$clockdot.hide();
						$clocksecond.text('');
						$clockname.text("Session");
						$clocklayer1.css('height', "0");
						$clocklayer2.css('height', "0");
						$clocklayer2.removeClass('active');
					}
				}
			}

			if($e.hasClass('start')){
				if(flag){
					// 如果倒计时未开始或者已经结束，则重新开始
					if($clocksecond.text()===""||($clockminute.text()==="0"&&$clocksecond.text()==="00")){
						$clockminute.text($sessionnum.text()-1);
						$clockdot.show();
						$clocksecond.text('59');
						$clockname.text("Session");
						$clocklayer1.css('height', "0");
						$clocklayer2.css('height', "0");
						$clocklayer2.removeClass('active');
					}
					timer=setInterval(function(){
						var second=String($clocksecond.text()-1).length===1?"0"+($clocksecond.text()-1):$clocksecond.text()-1;
						$clocksecond.text(second);
						if($clocksecond.text()==-1){
							$clocksecond.text('59');
							$clockminute.text($clockminute.text()-1);
							if($clockminute.text()==-1){
								if(breaktime){//进入break计时
									$clockminute.text($breaknum.text()-1);
									$clockname.text("Break!!");
									breaktime=false;
									$clock.addClass('active2');
									purplebg($breaknum.text());
								}else{//彻底结束
									clearInterval(timer);
									$clocksecond.text('00');
									$clockminute.text('0');
									$clockname.text("Ended");
									breaktime=true;
									flag=true;
									$clock.removeClass('active');
									$clock.removeClass('active2');
									$clocklayer2.addClass('active');
								}
							}
						}
					},1000);
					if($clocklayer1.height()>=286){
						purplebg($breaknum.text());
					}else{
						greenbg($sessionnum.text());
					}
					// flag为false表示倒计时正在进行中，不可点击加减按钮
					flag=false;
					$clock.addClass('active');
					if($clockname.text()==="Break!!"){
						$clock.addClass('active2');
					}
				}else{//暂停，暂停时可以点击加减按钮重新安排时间
					clearInterval(timer);
					clearInterval(greenbgtimer);
					clearInterval(purplebgtimer);
					flag=true;
					$clock.removeClass('active');
					$clock.removeClass('active2');
				}
			}

		});

		function greenbg(time){
			greenbgtimer=setInterval(function(){
				$clocklayer1.css('height', "+=4.85px");
				if($clocklayer1.height()>=286){
					clearInterval(greenbgtimer);
				}
			},1000*time);
		}

		function purplebg(time){
			purplebgtimer=setInterval(function(){
				$clocklayer2.css('height', "+=4.85px");
				if($clocklayer2.height()>=286){
					clearInterval(purplebgtimer);
				}
			},1000*time);
		}
	}());
	// 计算器
	(function(){
		var calprogress="",
			calresult,
			calprogressbox=$(".calprogress"),
			calresultbox=$(".calresult"),
			flag=true,
			fontsize;

		// 求阶乘的函数
		function fact(num){
			if(parseInt(num)==num&&num<170&&num>=0){
				return num<=1?1:num*fact(num-1);
			}else{
				return "无效输入";
			}
		}

		// 求平方根的函数
		function sqrt(num){
			return Math.sqrt(num);
		}

		// 自适应结果框的函数
		function adjustwidth(){
			if(calresultbox.width()>=292){
				fontsize-=2;
				calresultbox.css('fontSize', fontsize+"px");
				adjustwidth();
			}
		}

		// 按键委托
		$(".calkey").on('click', 'td', function(event) {
			fontsize=72;
			var key=$(this).text();
			var key2num=Number(key);
			if(key2num==key2num||key=="+"||key=="-"||key=="×"||key=="÷"||key=="."||key=="("||key==")"||key=="π"||key=="Mod"){
				if(!flag){
					// flag为false表示已经有一个运算结果
					if(key=="+"||key=="-"||key=="×"||key=="÷"||key=="Mod"){
						// 如果在有运算结果的情况下按下运算符号，那么将运算结果加入运算过程
						calprogress=calresult;
					}else{
						// 如果按下的不是运算符号，那么清空已有的运算过程
						calprogress="";
					}
					// 使flag为true，表示两种情况下都会开始一个新的运算过程
					flag=!flag;
				}
				calprogress+=key;
				calprogressbox.text(calprogress);
			}
			// 求值
			if(key=="="){
				if(flag){
					flag=!flag;
					// 变为合法运算符
					var calprogress2=calprogress.replace(/×/g,"*").replace(/÷/g,"/").replace(/π/g,Math.PI).replace(/[\+\-\*\/%]+$/,"").replace(/Mod/,"%");
					try{
						calresult=eval(calprogress2);
						calprogressbox.text(calprogress+"=");
						if(calresult!=calresult){
							// 如果计算结果为NaN，那么输出“无效输入”
							calresultbox.text('无效输入');
						}else{
							calresultbox.text(calresult).css('fontSize', '72px');
							if(calresultbox.width()>=292){
								adjustwidth();
							}
						}
					}catch(e){
						// 如果calprogress中有fact引入的“无效输入”或者有不合理的运算符号，那么会引发错误，捕获错误并输出“无效输入”
						calresult=0;
						calprogress="";
						calresultbox.text('无效输入');
					}
				}
			}
			// 清空
			if(key=="C"){
				calprogress="";
				calresult=0;
				calprogressbox.text("");
				calresultbox.text("0").css('fontSize', '72px');
				flag=true;
			}
			// 运算结果取反
			if(key=="±"){
				if(Number(calresult)==Number(calresult)){
					calresult=-calresult;
					calresultbox.text(calresult);
					if(flag){
						flag=!flag;
					}
				}
			}
			if(key=="n!"){
				var num1=Number(calprogress);
				var num2=Number(calresult);
				if(flag){
					// 如果是一个新的运算过程
					if(num1==num1){
						// 且运算过程里的文本是数字
						calprogress="fact("+num1+")";
						calprogressbox.text(calprogress);
					}else{
						// 如果不是数字，那么对运算过程中最后一个数字应用阶乘
						var lastestnum=calprogress.match(/\d+$/);
						var factlastestnum="fact("+lastestnum+")";
						calprogress=calprogress.replace(/\d+$/,factlastestnum);
						calprogressbox.text(calprogress);
					}
				}else{
					// 如果已有运算结果
					if(num2==num2){
						// 对结果应用阶乘
						calprogress="fact("+num2+")";
						calprogressbox.text(calprogress);
						flag=true;
					}
				}
			}
			// 根号与阶乘同理
			if(key=="√"){
				var num1=Number(calprogress);
				var num2=Number(calresult);
				if(flag){
					if(num1==num1){
						calprogress="sqrt("+num1+")";
						calprogressbox.text(calprogress);
					}else{
						var lastestnum=calprogress.match(/\d+$/);
						var sqrtlastestnum="sqrt("+lastestnum+")";
						calprogress=calprogress.replace(/\d+$/,sqrtlastestnum);
						calprogressbox.text(calprogress);
					}
				}else{
					if(num2==num2){
						calprogress="sqrt("+num2+")";
						calprogressbox.text(calprogress);
						flag=true;
					}
				}
			}
			// 回退一个字符
			if(key=="←"){
				if(flag){
					calprogress=calprogress.slice(0, -1);
					calprogressbox.text(calprogress);
				}
			}
			
		});

		$(".caltitle span").click(function(event) {
			alert("这个按钮并没有什么用_(:з)∠)_");
		});
	}());
	// 弹幕
	(function(){
		// $(window).on("load",function(){
			var danmu=document.getElementById('projectdanmu'),
				fire=danmu.getElementsByTagName('button')[0],
				clear=danmu.querySelector(".clear"),
				contentbox=danmu.querySelector(".contentbox"),
				width=parseFloat(window.getComputedStyle(contentbox).width);
				colorbox=["black","red","yellow","green","blue","gray","olive","silver","teal","lime"],
			//  colorbox----0-------1------2-------3--------4------5------6-------7--------8------9
				positionbox=[],
				random2=-1;
			for(var i=0;i<10;i++){
				positionbox.push(i);
			}
			//  positionbox----0-9

			// 发射
			fire.onclick=function(){
				// 随机颜色
				var random1=Math.floor(Math.random()*10);
				// 生成与上次不重复的随机高度
				function randomposition(){
					var randomtemp=Math.floor(Math.random()*10);
					if(random2===randomtemp){
						randomposition();
					}else{
						random2=randomtemp;
					}
				}
				randomposition();

				var right,
					text=document.getElementById('saysomething').value,
					para=document.createElement("p");
				para.innerText=text;
				contentbox.appendChild(para);
				para.style.left=width+"px";
				para.style.color=colorbox[random1];
				para.style.top=positionbox[random2]*30+"px";
				var movetimer=setInterval(function(){
					var left=parseFloat(para.style.left);
					right=parseFloat(window.getComputedStyle(para).right);
					para.style.left=left-2+"px";
					if(right>=width){
						clearInterval(movetimer);
						contentbox.removeChild(para);
					}
				},33);
				
			};

			// 清屏
			clear.onclick=function(){
				contentbox.innerText="";
			};

			// 更改窗口尺寸时动态更新width
			var resizetimer=null;
			window.onresize=function(){
				clearTimeout(resizetimer);
				resizetimer=setTimeout(function(){
					width=parseFloat(window.getComputedStyle(contentbox).width);
				},200);
			};
		// });
	}());
	// 收银程序
	(function(){
		function checkCashRegister(price, cash, cid) {
	  		var c=[];
	  		var needchange=cash-price;
	  		var m=0;
	  		var flag=1;
	  
	  		for(var i=0;i<8;i++){
	    		var num;
	    		switch(i){
	      			case 0:
	        			num=100;
	        			break;
	      			case 1:
	        			num=50;
	        			break;
	      			case 2:
	        			num=20;
	        			break;
	      			case 3:
	        			num=10;
	        			break;
	      			case 4:
	        			num=5;
	        			break;
	      			case 5:
	        			num=1;
	        			break;
	      			case 6:
	        			num=0.5;
	        			break;
	      			case 7:
	        			num=0.1;
	    		}

	    		var h=Math.floor(needchange/num+0.0001);
	    		var hm=Math.min(h,cid[i][1]);
	    		needchange-=num*hm;
	    		needchange=needchange.toFixed(1);
	    		if(hm>0){
	      			cid[i][1]-=hm;
	      			c[m]=[];
	      			c[m][0]=cid[i][0];
	      			c[m].push(hm);
	      			m++;
	    		}
	    		if(cid[i][1]!==0){
	      			flag=-1;
	    		}
	    	}//for结束

	  		if(needchange!=0){
	    		return "Insufficient Funds";
	  		}else if(needchange==0&&flag===1){
	    		return "Closed";
	  		}else return c;
		}

		$(".change-right input").click(function(event) {
			var cid=[];
			var haschanges=$(".change-repo input");
			haschanges.each(function(index, el) {
				var thisarr=[];
				var name=$(this).attr('name');
				var num=parseFloat($(this).val());
				thisarr.push(name,num);
				cid.push(thisarr);
			});

			var price=$(".change-need input").val();
			var cash=$(".change-actual input").val();

			var result=checkCashRegister(price, cash, cid);
			$(".change-right span").text("-");
			$(".change-total").text((cash-price).toFixed(1));

			if(Array.isArray(result)){
				$(result).each(function(index, el) {
					$("."+el[0]).text(el[1]);
				});
			}else if(result==="Closed"){
				$(".change-closed").fadeIn(400).delay(3000).fadeOut(400);
			}else if(result==="Insufficient Funds"){
				$(".change-insuff").fadeIn(400).delay(3000).fadeOut(400);
			}
		});
	}());
	// 其他算法
	(function(){
		var btn1=$(".algoitem1 button");
		var btn2=$(".algoitem2 button");
		var btn3=$(".algoitem3 button");

		function steamroller(arr) {
		  	//递归
		  	var newarr=[];
		  	roll(arr);
		  
		  	function roll(arr){
		    
		    	for(var i=0;i<arr.length;i++){
		      		if(Array.isArray(arr[i])===false){
		        		newarr.push(arr[i]);
		      		}else roll(arr[i]);
		    	}
		    
		   	}

		  	return newarr;
		}

		function sym(args) {
		  	//作用是保证每个数组里的数都是不重复的,重复的只保留一个
		  	function norepeat(arr){
		  	  	return arr.filter(function(val,index,array){
		  	    	return array.indexOf(val)===index;
		  	  	});
		  	}
		  	//concat后如果有重复的数，把重复的数全部去掉
		  	function add(arr1,arr2){
		  	  	var arr=norepeat(arr1).concat(norepeat(arr2));
		  	  	return arr.filter(function(val,index,array){
		  	    	return array.indexOf(val)===array.lastIndexOf(val);
		  	  	});
		  	}
		  	//累加并排序
		  	return args.reduce(add).sort(function(num1,num2){
		  	  	return num1-num2;
		  	});
		}

		function smallestCommons(arr) {
		  	//分解质因数法，分解为若干个质数相乘
		  	var arrratio=[];
		  	var min=Math.min(arr[0],arr[1]);
		  	var max=Math.max(arr[0],arr[1]);
		  	for(var i=min+1;i<max;i++){
		    	arr.push(i);
		  	}
		  	//找出小于max的所有质数
		  	var arrtemp=[];
		  	for(var j=2;j<=max;j++){
		    	arrtemp.push(j);
		  	}
		  	var prime=arrtemp.filter(function(val){
		    	for(var k=2;k<val;k++){
		      		if(val%k===0){
		        		return false;
		      		}
		    	}
		    	return true;
		  	});
		  	//用这一排数分别除以从小到大的质数，如果某个数能除尽，则把那个数变为除后的数，把这个质数放在arrratio数组里备用。直至arr里每个数都变成1。这个方法是分解质因数法，详情见小学或初中课本。
		  	while(arr.reduce(function(a,b){return a+b;})!==(max-min+1)){
		    	for(var m=0;m<prime.length;m++){
		      		var isratio=0;
		      		for(var n=0;n<arr.length;n++){
		        		if(arr[n]%prime[m]===0){
		          			isratio=1;
		          			arr[n]=arr[n]/prime[m];
		        		}
		      		}
			      	if(isratio){
			        	arrratio[arrratio.length]=prime[m];
			      	}
		    	}
		  	}
		  	//最后把arrratio数组里的数相乘便是这一组数的最小公倍数。
		  	return arrratio.reduce(function(a,b){return a*b;});
		}

		btn1.click(function(event) {
			var arr1;
			try{
				arr1=eval($("input[name='item1arr']").val());
			}catch(e){
				$("input[name='item1result']").val("请输入正确的数组");
				return;
			}
			if(Array.isArray(arr1)){
				var result=steamroller(arr1);
				$("input[name='item1result']").val("["+result+"]");
			}else return;
		});

		btn2.click(function(event) {
			var arr2;
			try{
				arr2=eval("["+$("input[name='item2arr']").val()+"]");
			}catch(e){
				$("input[name='item2result']").val("请输入正确的数组");
				return;
			}
			if(arr2.every(function(val){return Array.isArray(val);})){
				var result=sym(arr2);
				$("input[name='item2result']").val("["+result+"]");
			}else{
				$("input[name='item2result']").val("请输入正确的数组");
			}
		});

		btn3.click(function(event) {
			var arr3;
			try{
				arr3=eval($("input[name='item3arr']").val());
			}catch(e){
				$("input[name='item3result']").val("请输入正确的数组");
				return;
			}
			if(Array.isArray(arr3)&&arr3.every(function(val){return parseInt(val)===val;})&&arr3.length===2&&arr3[0]<arr3[1]){
				var result=smallestCommons(arr3);
				$("input[name='item3result']").val(result);
			}else{
				$("input[name='item3result']").val("请输入正确的整数范围");
			}
		});
	}());
	// simon game
	(function(){
		var switchon=false,
			startbtnclickable=false,
			strictbtnclickable=false,
			strictmode=false,
			randomarr=[],
			yourarr=[],
			count=0,
			$countnum=$(".countnum"),
			$item=$(".simon-item"),
			nextroundtimer=[],
			againtimer=null;

		// 电脑开始下一回合
		function nextRound(){
			randomarr.push(Math.floor(Math.random()*4));
			count=randomarr.length;
			// 顺序显示这一回合
			$(randomarr).each(function(index, el) {
				nextroundtimer.push(setTimeout(function(){
					$item.eq(el).addClass("active");
					setTimeout(function(){
						$item.eq(el).removeClass("active");
						// 电脑回合结束，轮到玩家的回合
						if(index===randomarr.length-1){
							yourRound();
						}
					},300);
				},1300*(index+1)));
			});	
			// 显示回合数
			$countnum.addClass('active').text(count<10?"0"+count:count);
		}

		// 玩家的回合
		function yourRound(){
			yourarr=[];

			$item.bind({
				mousedown: function(){
					$(this).addClass('active');
				},
				mouseup: function(){
					$(this).removeClass('active');
					yourarr.push($(this).index());
					// 检查是否正确
					if(yourarr.length===randomarr.length){
						$item.unbind('mousedown mouseup');
						checkSelect();
					}
				}
			});
		}

		// 检查是否正确
		function checkSelect(){
			if(yourarr.toString()===randomarr.toString()){
				// 如果正确，开始下一回合
				nextRound();
			}else{
				// 否则，重新开始这一回合
				$countnum.text("!!").fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200);
				againtimer=setTimeout(function(){
					if(!strictmode){
						randomarr.pop();
						nextRound();
					}else{
						randomarr=[];
						nextRound();
					}
				},1000);
			}
		}

		// 绑定点击事件
		$(".startbtn").bind({
			mousedown: function(){
				if(startbtnclickable){
					$(this).addClass('active');
				}
			},
			mouseup: function(){
				if(startbtnclickable){
					$(this).removeClass('active');
					nextRound();
					startbtnclickable=false;
					strictbtnclickable=false;
				}
			}
		});

		$(".strictbtn").bind({
			mousedown: function(){
				if(strictbtnclickable){
					$(this).addClass('active');
				}
			},
			mouseup: function(){
				if(strictbtnclickable){
					$(this).removeClass('active');
					$(".stricton").toggleClass('active');
					strictmode = strictmode ? false : true;
				}
			}
		});

		$(".switchbox").click(function(event) {
			$(this).find('.switch').toggleClass('active');
			switchon = switchon ? false : true;
			if(switchon){
				randomarr=[];
				startbtnclickable=true;
				strictbtnclickable=true;
				$countnum.text("00").addClass('active');
			}else{
				startbtnclickable=false;
				strictbtnclickable=false;
				strictmode=false;
				$(".stricton").removeClass('active');
				if(nextroundtimer.length>0){
					for(var i in nextroundtimer){
						clearTimeout(nextroundtimer[i]);
					}
				}
				if(againtimer){
					clearTimeout(againtimer);
				}
				$countnum.text("--").removeClass('active');
			}
		});
	}());
});
$(window).on("load",function(){$(".triangle").addClass('loaded');});