// drag.js：拖动绝对定位的HTML元素

// 这个模块定义了一个drag（）函数，它用于mousedown事件处理程序的调用
// 随后mousemove事件将移动指定元素，mouseup事件将终止拖动
// 这些实现能同时标准和IE两种事件模型一起工作
// 它需要用到getScrollOffsets（）方法

// 参数：

// elementToDrag：接收mousedown事件的元素或某些包含元素，它必须是绝对定位的元素
// 它的style.left和style.top将随着用户的拖动而改变

// event：mousedown事件对象

function drag(elementToDrag,event){
	var scroll=getScrollOffsets();
	var startX=event.clientX+scroll.x;
	var startY=event.clientY+scroll.y;

	var origX=elementToDrag.offsetLeft;
	var origY=elementToDrag.offsetTop;

	var deltaX=startX-origX;
	var deltaY=startY-origY;

	if(document.addEventListener){
		document.addEventListener("mousemove",moveHandler,true);
		document.addEventListener("mouseup",upHandler,true);
	}else if(document.attachEvent){
		elementToDrag.setCapture();
		elementToDrag.attachEvent("onmousemove",moveHandler);
		elementToDrag.attachEvent("onmouseup",upHandler);
		elementToDrag.attachEvent("onlosecapture",upHandler);
	}

	if(event.stopPropagation){
		event.stopPropagation();
	}else{
		event.cancelBubble=true;
	}

	if(event.preventDefault){
		event.preventDefault();
	}else{
		event.returnValue=false;
	}

	function moveHandler(e){
		if(!e){
			e=window.event;
		}

		var scroll=getScrollOffsets();
		elementToDrag.style.left=(e.clientX+scroll.x-deltaX)+"px";
		elementToDrag.style.top=(e.clientY+scroll.y-deltaY)+"px";

		if(e.stopPropagation){
			e.stopPropagation();
		}else{
			e.cancelBubble=true;
		}
	}

	function upHandler(e){
		if(!e){
			e=window.event;
		}

		if(document.removeEventListener){
			document.removeEventListener("mouseup",upHandler,true);
			document.removeEventListener("mousemove",moveHandler,true);
		}else if(document.detachEvent){
			elementToDrag.detachEvent("onlosecapture",upHandler);
			elementToDrag.detachEvent("onmouseup",upHandler);
			elementToDrag.detachEvent("onmousemove",moveHandler);
			elementToDrag.releaseCapture();
		}

		if(e.stopPropagation){
			e.stopPropagation();
		}else{
			e.cancelBubble=true;
		}
	}
}

function getScrollOffsets(w){
	w=w||window;

	if(w.pageXOffset!=null){
		return {x:w.pageXOffset,y:w.pageYOffset};
	}

	var d=w.document;
	if(document.compatMode=="CSS1Compat"){
		return {x:d.documentElement.scrollLeft,y:d.documentElement.scrollTop};
	}

	return {x:d.body.scrollLeft,y:d.body.scrollTop};
}