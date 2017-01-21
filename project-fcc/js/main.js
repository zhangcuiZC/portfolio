$(function(){
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

	(function(){
		window.onload=function(){
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
					para.style.left=left-10+"px";
					if(right>=width){
						clearInterval(movetimer);
						contentbox.removeChild(para);
					}
				},100);
				
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
		};
	}());
});