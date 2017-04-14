/* 
* email：746979855@qq.com
* Version：0.1
* auth：Mr.xu
* Data：2015年2月29日 10:51:33
	使用方法：
	
	var assets = [];
	new PreLoad(assets,{
		onload: function(load) {
			var count = load.count,
				total = load.total,
				percent = Math.ceil(100 * count / total) + '%';
				console.log(percent);
		}
	})

 */

(function(){
	 var PreLoad=function(a,b){var c=b||{};this.source=a,this.count=0,this.total=a.length,this.onload=c.onload,this.prefix=c.prefix||"",this.init()};PreLoad.prototype.init=function(){var a=this;a.source.forEach(function(b){var c=b.replace(/[#\?].*$/,'').substr(b.lastIndexOf(".")+1).toLowerCase(),d=a.prefix+b;switch(c){case"js":a.script.call(a,d);break;case"css":a.stylesheet.call(a,d);break;case"svg":case"jpg":case"gif":case"png":case"jpeg":a.image.call(a,d)}})},PreLoad.prototype.getProgress=function(){return Math.round(this.count/this.total*100)},PreLoad.prototype.image=function(a){var b=document.createElement("img");this.load(b,a),b.src=a},PreLoad.prototype.stylesheet=function(a){var b=document.createElement("link");this.load(b,a),b.rel="stylesheet",b.type="text/css",b.href=a,document.head.appendChild(b)},PreLoad.prototype.script=function(a){var b=document.createElement("script");this.load(b,a),b.type="text/javascript",b.src=a,document.head.appendChild(b)},PreLoad.prototype.load=function(a,b){var c=this;a.onload=a.onerror=a.onabort=function(a){c.onload&&c.onload({count:++c.count,total:c.total,item:b,type:a.type})}};
})();