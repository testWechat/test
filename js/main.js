/* 
* email：746979855@qq.com
* Version：0.1
* auth：Mr.xu
* Data：2014年2月29日 10:51:33
 */
var mobile   = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
var touchstart = mobile ? "touchstart" : "mousedown";
var touchend = mobile ? "touchend" : "mouseup";
var touchmove = mobile ? "touchmove" : "mousemove";

var Valglobal = {
	href : '项目图片地址',
	imgs:['项目图片资源'],
	random : function (Max,Min){
		var Range = Max - Min;
		var Rand = Math.random();
		return(Min + Math.round(Rand * Range));
	}
}

var agents = navigator.userAgent.toLowerCase(); //检测是否是ios
var iLastTouch = null; //缓存上一次tap的时间
if(agents.indexOf('iphone') >= 0 || agents.indexOf('ipad') >= 0) {
	document.body.addEventListener('touchend', function(event) {
		var iNow = new Date()
			.getTime();
		iLastTouch = iLastTouch || iNow + 1 /** 第一次时将iLastTouch设为当前时间+1 */ ;
		var delta = iNow - iLastTouch;
		if(delta < 500 && delta > 0) {
			event.preventDefault();
			return false;
		}
		iLastTouch = iNow;
	}, false);
}


function loading() {
	var loctionhref =  Valglobal.href;
	function Load() {}
	Load.prototype.loadImgs = function(urls, callback) {
		this.urls = urls;
		this.imgNumbers = urls.length;
		this.loadImgNumbers = 0;
		var that = this;
		for(var i = 0; i < urls.length; i++) {
			var obj = new Image();
			obj.src = loctionhref+urls[i];
			obj.onload = function() {
				that.loadImgNumbers++;
				callback(parseInt((that.loadImgNumbers / that.imgNumbers) * 100));
			}
		}
	};

	var loader = new Load();
	loader.loadImgs(Valglobal.imgs, function(percent) {
		// console.log(percent)
		document.getElementById("percent").innerHTML = percent+'%';
		if(percent == 100) {
			var start = new Date().getTime();
			$("img").each(function(){
				var _this = $(this);
				if(_this.attr("data-src")){
					_this.attr("src",loctionhref+_this.attr("data-src")+'?t=2');
				}
			});
			var end = new Date().getTime();
			console.log(end - start+'s');
			$(".loading").fadeOut();
		}
	});
}

// 执行 loading 方法
loading();
/* 数组去重 */
Array.prototype.only = function() {
	var res = [];
	var json = {};
	for(var i = 0; i < this.length; i++) {
		if(!json[this[i]]) {
			res.push(this[i]);
			json[this[i]] = 1;
		}
	}
	return res;
}

$(function() {
	orientNotice();
	var ua = navigator.userAgent.toLowerCase();//获取判断用的对象
    if (ua.match(/HUAWEI/i) == "huawei") {
		/* width:360px  height:519px*/
       	// alert('破~~~~手机改换了。');
    }

	
	
	
})

var stageWidth,stageHeight;
function orientNotice() {
	if(stageWidth!=document.documentElement.clientWidth||stageHeight!= document.documentElement.clientHeight)
    {
		window.viewportW = 640;
		stageWidth = document.documentElement.clientWidth;
		stageHeight = document.documentElement.clientHeight;
		/* 设置新宽高 */
		console.log(stageWidth,stageHeight);

		var phoneWidth = parseInt(window.screen.width);
		var phoneScale = phoneWidth / window.viewportW;
		var ua = navigator.userAgent;
		if(/Android (\d+\.\d+)/.test(ua)) {
			var version = parseFloat(RegExp.$1);
			if(version > 2.3) {
				document.getElementById('viewport').innerHTML = ('<meta class="viewport" name="viewport" content="width=' + window.viewportW + ', minimum-scale = ' + phoneScale + ', maximum-scale = ' + phoneScale + ', target-densitydpi=device-dpi">');
			} else {
				document.getElementById('viewport').innerHTML = ('<meta class="viewport"  name="viewport" content="width=' + window.viewportW + ', target-densitydpi=device-dpi">');
			}
		} else {
			document.getElementById('viewport').innerHTML = ('<meta class="viewport"  name="viewport" content="width=' + window.viewportW +', user-scalable=no, target-densitydpi=device-dpi">');
		}
	}
}

