/* 
* email：746979855@qq.com
* Version：0.1
* auth：Mr.xu
* Data：2017年3月22日 10:51:33
 */
'use strict';
/* 主文件 */
const gulp = require('gulp');
/* 处理less */
const less = require('gulp-less');
/* 搭建本地服务器 */
const connect = require('gulp-connect');
/*
 使用gulp-autoprefixer根据设置浏览器版本自动处理浏览器前缀。
 使用她我们可以很潇洒地写代码，不必考虑各浏览器兼容前缀。
 特别是开发移动端页面时，就能充分体现它的优势。例如兼容性不太好的flex布局。
 
 */
const autoprefixer = require('gulp-autoprefixer');
/* 使用gulp-concat合并javascript文件，减少网络请求。  */
const concat = require('gulp-concat');
/* 压缩 js 文件 */
const uglify = require('gulp-uglify');
/* 压缩 css 文件 */
const cssmin = require('gulp-clean-css');
/* 压缩 img 文件 */
const imagemin = require('gulp-imagemin');
/* 压缩 html 文件 */
const htmlmin = require('gulp-htmlmin');

/* 多张图片自动合成雪碧图 */
const spritesmith = require('gulp.spritesmith');



/* 迁移文件 Or  目录 */
gulp.task('hello', function () {
	gulp.src('./src/**/*.*').pipe(gulp.dest("dist/"))
});
/* 解析 less */
gulp.task('less', function () {
    gulp.src('./src/**/*.less').pipe(less()).pipe(gulp.dest("dist/"));
});
/*  自动检测是否修改 ， 然后自动解析 */
gulp.task('watch', function () {
    gulp.watch('./src/**/*.less', ['css']);
});


/* 搭建服务器 ， 实现本地自动刷新 */
gulp.task('server', function () {
    connect.server({
        root: 'src',
        livereload: true
    });
    gulp.watch('src/**/*.*', ['reload','testAutoFx','jsmin','testImagemin','htmlmin']);
});

gulp.task('reload', function () {
    gulp.src('src/**/*.*').pipe(connect.reload());
})


/* 处理浏览器兼容性 */

gulp.task('testAutoFx', function () {
    gulp.src('src/css/*.*').pipe(less()).pipe(autoprefixer({
        browsers: ['last 2 versions', 'Android >= 4.0'],
        cascade: true, //是否美化属性值 默认：true 像这样：
//-webkit-transform: rotate(45deg);
//        transform: rotate(45deg);
        remove: true //是否去掉不必要的前缀 默认：true 
    }))
	.pipe(cssmin({
		// mangle: true,//类型：Boolean 默认：true 是否修改变量名
		// compress: true,//类型：Boolean 默认：true 是否完全压缩
		// preserveComments: 'all' //保留所有注释
	}))
	.pipe(concat('all.css'))
	.pipe(gulp.dest('dist/css'));
});

/* 减少网络请求  -  合并文件 */

gulp.task('testConcat', function () {
    gulp.src('src/js/*.js')
            .pipe(concat('all.js'))//合并后的文件名
            .pipe(gulp.dest('dist/js'));
});

/* 压缩 js 文件 */
gulp.task('jsmin', function () {
    gulp.src('src/js/*.*')
            .pipe(uglify({
                // mangle: true,//类型：Boolean 默认：true 是否修改变量名
                // compress: true,//类型：Boolean 默认：true 是否完全压缩
                // preserveComments: 'all' //保留所有注释
            }))
            .pipe(concat('all.js'))
            .pipe(gulp.dest('dist/js'));
});

/* 压缩css文件 */

gulp.task('cssmin', function () {
    gulp.src('src/css/*.css')
            .pipe(cssmin({
                // mangle: true,//类型：Boolean 默认：true 是否修改变量名
                // compress: true,//类型：Boolean 默认：true 是否完全压缩
                // preserveComments: 'all' //保留所有注释
            }))
            .pipe(concat('all.css'))
            .pipe(gulp.dest('dist/css'));
});



/*************************************************************************/

/* 检测代码， 并且压缩 */
gulp.task('allmin', function () {
    gulp.watch(['./src/css/*.css', './src/js/*.js'], ['jsmin', 'cssmin']);
});

/*************************************************************************/


/* 压缩图片 */
gulp.task('testImagemin', function () {
    gulp.src('src/img/*.{png,jpg,gif,ico}')
            .pipe(imagemin())
            .pipe(gulp.dest('dist/img'));
});

/* 压缩 html 代码 */

gulp.task('htmlmin', function () {
    var options = {
        removeComments: true, //清除HTML注释
        collapseWhitespace: true, //压缩HTML
        collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
        minifyJS: true, //压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    gulp.src('src/*.html')
            .pipe(htmlmin(options))
            .pipe(gulp.dest('dist/'));
});



/* 雪碧图合成 */

gulp.task('sprite', function () {
    gulp.src('imgs/*.png')//需要合并的图片地址
        .pipe(spritesmith({
            imgName: 'sprite.png',//保存合并后图片的地址
            cssName: 'imgs_css/sprite.css',//保存合并后对于css样式的地址
            padding:0//合并时两个图片的间距
            // algorithm: 'binary-tree',//注释1
            // cssTemplate: function (data) {
                // var arr=[];
                // data.sprites.forEach(function (sprite) {
                    // arr.push(".icon-"+sprite.name+
                    // "{" +
                    // "background-image: url('"+sprite.escaped_image+"');"+
                    // "background-position: "+sprite.px.offset_x+"px "+sprite.px.offset_y+"px;"+
                    // "width:"+sprite.px.width+";"+
                    // "height:"+sprite.px.height+";"+
                    // "}\n");
                // });
                // return arr.join("");
            // }

        }))
        .pipe(gulp.dest('test/'));
});