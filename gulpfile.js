/*
=====================================
使用するプラグイン
=====================================
*/
var gulp         = require( 'gulp' ),
    fs           = require( 'fs' ),
		plumber      = require( 'gulp-plumber' ), // エラーが原因でタスクが強制停止することを防止する
		ejs          = require( 'gulp-ejs' ),
		rename       = require( 'gulp-rename' ),
		sass         = require( 'gulp-sass' ),
		autoprefixer = require( 'gulp-autoprefixer' ),
		cssComb      = require( 'gulp-csscomb' ), // CSSのプロパティ順序を整理する
		browserSync  = require( 'browser-sync' ),
		combineMq    = require( 'gulp-combine-mq' ), // mqをまとめる
		notify       = require( 'gulp-notify' ), // エラーの通知を出す
		imagemin     = require( 'gulp-imagemin' ),
		jpegtran     = require( 'imagemin-jpegtran' );

/*
=====================================
各ファイルのフォルダの指定
=====================================
*/
// Folder to develop -> 開発フォルダ
var develop = "develop-html/";

// config（gulpfile.jsからの相対パスで記述）
var config = {
	 "path" : {
			"sassCompile"      : develop + "sass/**/*.scss", // sassCompileはscssファイルがある場所
			"sassModule"       : develop + "sass/**/_*.scss",
			"afterCompileSass" : develop + "css/", // コンパイルしたcssファイルを吐き出す場所
			"imageDir"         : develop + "images/**/*.+(jpg|jpeg|png|gif)", // 画像がある場所
			//"imageDir"         : develop + "images/**/*.{jpg,jpeg,png,gif}",
			"ejsDir"           : develop + "ejs/**/*.ejs", // コンパイルしたいejsファイルがある場所
			"templateDir"      : develop + "ejs/templates/_*.ejs", // templateDirはテンプレートejsファイルがある場所
			"afterCompileEjs"  : develop // コンパイルしたhtmlファイルを吐き出す場所
	 }
}

/*
=====================================
gulpの実行
=====================================
*/
gulp.task( 'default', function(){
	// 監視
	gulp.watch( [config.path.ejsDir, config.path.templateDir], ['ejs'] );
	gulp.watch( [config.path.sassCompile], ['sass'] );
	//gulp.watch( [config.path.imageDir], ['imagemin'] );
	gulp.watch( [develop + '**/*.html', develop + 'js/*.js'], ['reload'] );

	// サーバー起動
	browserSync({
		server: {
			baseDir: './' + develop // ルートとなるディレクトリ
			// proxy: 'localhost:8888/wordpress'
		}
	});

	// ejsファイルのコンパイル
	gulp.task( 'ejs', function(){
		gulp.src( [ config.path.ejsDir, '!' + config.path.templateDir ] )
		    .pipe( plumber({
			    errorHandler: notify.onError( 'Error: <%= error.message %>' ) // エラーがあればデスクトップに通知
		    }) )
				.pipe( ejs( {}, {}, { ext: '.html' } ) )
				//.pipe( rename({ extname: '.html' }) )
		    .pipe( gulp.dest( config.path.afterCompileEjs ) );
	});

	// sassファイルのコンパイルとプレフィックスの付与
	gulp.task( 'sass', function(){
		gulp.src( [config.path.sassCompile, '!' + config.path.sassModule] )
		    .pipe( plumber({
			    errorHandler: notify.onError( 'Error: <%= error.message %>' ) // エラーがあればデスクトップに通知
		    }) )
		    .pipe( sass() )
		    .pipe( autoprefixer( {
					browsers: ['last 3 versions', 'ie >=10', 'android >=4.2']
				} ) ) // プレフィックスを付与
				.pipe( cssComb() )
		    .pipe( gulp.dest( config.path.afterCompileSass ) ) // 一度コンパイルしてから
		    .pipe( combineMq() ) // cssを整形
		    .pipe( gulp.dest( config.path.afterCompileSass ) ) // 整形したcssを再度吐きだし
		    .pipe( browserSync.stream() ); // 変更したファイル部分だけをブラウザ更新
	});

	// 画像圧縮
  /*
	gulp.task( 'imagemin', function(){
		gulp.src( config.path.imageDir )
		    .pipe( plumber({
			    errorHandler: notify.onError( 'Error: <%= error.message %>' ) // エラーがあればデスクトップに通知
		    }) )
		    .pipe( imagemin([
					imagemin.gifsicle({ interlaced: true }),
					imagemin.jpegtran({ progressive: true }),
					imagemin.optipng({ optimizationLevel: 5 }),
					imagemin.svgo({
            plugins: [
              { removeViewBox: true },
              { cleanupIDs: false }
            ]
          })
				]) )
				.pipe( gulp.dest( config.path.imageDir ) );
	});
  */

	// ブラウザの自動リロード
	gulp.task( 'reload', function(){
		browserSync.reload();
	})
});
