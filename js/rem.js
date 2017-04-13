/* 
* email：746979855@qq.com
* Version：0.1
* auth：Mr.xu
* Data：2014年2月29日 10:51:33
 */
(function (doc, win) {
	var docEl = doc.documentElement,
		resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
		recalc = function () {
			var clientWidth = docEl.clientWidth;
			if (!clientWidth) return;
			if(clientWidth>=640){
				docEl.style.fontSize = '100px';
			}else{
				docEl.style.fontSize = 100 * (clientWidth / 640) + 'px';
			}
		};
	if (!doc.addEventListener) return;
	win.addEventListener(resizeEvt, recalc, false);
	doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);