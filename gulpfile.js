/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

var es = require('event-stream');

var gulp = require('gulp'),
    tsconfig = require('tsconfig-glob'),
    yargs = require('yargs'),
    del = require("del"),
    runSequence = require('run-sequence').use(gulp),
    tslint = require("gulp-tslint");

var tscConfig = require('./tsconfig.json');
var modules = require('./package.json');

var plugins = require("gulp-load-plugins")({
    pattern: ['gulp-*'],
    replaceString: /\bgulp[\-.]/
});

var Builder = require('systemjs-builder');

var paths = {
    app: "./app/",
    scripts: "Scripts/",
    webroot: "./wwwroot/",
    npm: "./node_modules/",
    angular: "./node_modules/@angular",
    rxjs: "./node_modules/rxjs",
    fontAwesome: "./node_modules/font-awesome",
    bootstrap: "./node_modules/bootstrap/dist",
    content: "./content/",
    contentWatch: "./content/**/*",
    lightbox: "./node_modules/lightbox2/dist",
    ng2translate: "./node_modules/ng2-translate",
    jquery: "./node_modules/jquery/dist/jquery.min.js"
}

paths.index = "./index.html";
paths.typescript = paths.app + "**/*.ts";
paths.compiledTs = paths.webroot + "app";
paths.less = paths.styles + "**/*.less";
paths.siteLess = paths.styles + "/Site.less";
paths.lessDest = paths.webroot + "css";
paths.allDest = paths.webroot + '**/*';
paths.vendors = [
    paths.npm + 'core-js/client/shim.min.js',
    paths.npm + 'core-js/client/shim.min.js.map',
    paths.npm + 'zone.js/dist/zone.js',
    paths.npm + 'reflect-metadata/Reflect.js',
    paths.npm + 'reflect-metadata/Reflect.js.map',
    paths.npm + 'systemjs/dist/system.src.js',
    paths.npm + 'lodash/lodash.min.js'
];
paths.vendorsDest = paths.webroot + 'lib';
paths.angularDest = paths.vendorsDest + '/@angular';
paths.rxjsDest = paths.vendorsDest  + '/rxjs';
paths.rxjsFiles = [
    paths.rxjsDest + '/add/**/*.js',
    paths.rxjsDest + '/observable/**/*.js',
    paths.rxjsDest + '/operator/**/*.js',
    paths.rxjsDest + '/scheduler/**/*.js',
    paths.rxjsDest + '/symbol/**/*.js',
    paths.rxjsDest + '/util/**/*.js',
    paths.rxjsDest + '/*.js'
];
paths.lightboxFiles = [
    paths.npm + 'lightbox2/dist/css/lightbox.min.css',
    paths.npm + 'lightbox2/dist/images/*',
    paths.npm + 'lightbox2/dist/js/lightbox-plus-jquery.min.js',
    paths.npm + 'lightbox2/dist/js/lightbox-plus-jquery.min.map'
];
paths.ng2translateDest = paths.vendorsDest + '/ng2-translate';
paths.ng2translateFiles = [
    paths.ng2translateDest + '/src/**/*.js',
    paths.ng2translateDest + '/ng2-translate.js'
];
paths.ng2translateBundle = paths.vendorsDest + '/bundles/ng2-translate.min.js';
paths.rxjsBundle = paths.vendorsDest + '/bundles/rxjs.min.js';
paths.fontAwesomeDest = paths.vendorsDest + '/font-awesome';
paths.bootstrapDest = paths.vendorsDest + '/bootstrap';
paths.lightboxDest = paths.vendorsDest + '/lightbox2';
paths.contentDest = paths.webroot + '/content';
paths.jqueryDest = paths.vendorsDest + "/jquery";
paths.config = [
    'systemjs.config.js'
];
paths.configDest = paths.webroot;
paths.templates = paths.app + "**/*.html";
paths.templatesDest = paths.webroot + "app";
paths.i18n = paths.app + "/i18n/*.json";
paths.i18nDest = paths.webroot + "app/i18n";


// same array than systemjs.config.js
var angularPackages = [
    'common',
    'compiler',
    'core',
    'forms',
    'http',
    'platform-browser',
    'platform-browser-dynamic',
    'router'
];

gulp.task('copy:templates', function () {
    return gulp.src(paths.templates)
               .pipe(gulp.dest(paths.templatesDest))
});

gulp.task('copy:angular', function () {
    var tasks = angularPackages.map(function (pkg) {
        return gulp.src(paths.angular + "/" + pkg + "/**/*.umd.min.js")
                   .pipe(gulp.dest(paths.angularDest + "/" + pkg));
    });

    return es.concat.apply(null, tasks);
});

gulp.task('copy:rxjs', function () {
    return gulp.src([paths.rxjs + "/**/*.js", paths.rxjs + "/**/*.js.map"])
               .pipe(gulp.dest(paths.rxjsDest));
});

gulp.task('copy:i18n', function () {
    return gulp.src(paths.i18n)
               .pipe(gulp.dest(paths.i18nDest))
});

gulp.task('copy:jquery', function () {
    return gulp.src(paths.jquery)
               .pipe(gulp.dest(paths.jqueryDest))
});

gulp.task('copy:ng2-translate', function () {
    return gulp.src(paths.ng2translate + "/**/*.{js,js.map}")
               .pipe(gulp.dest(paths.ng2translateDest));
});

gulp.task('copy:font-awesome', function () {
    return gulp.src(paths.fontAwesome + "/**/*.{css,otf,eot,svg,ttf,woff,wof2}")
               .pipe(gulp.dest(paths.fontAwesomeDest));
});

gulp.task('copy:bootstrap', function () {
    return gulp.src(paths.bootstrap + "/**/*.{css,js}")
               .pipe(gulp.dest(paths.bootstrapDest));
});

gulp.task('copy:lightbox', function () {
    return gulp.src(paths.lightbox + "/**/*.{css,js,png,gif,map}")
               .pipe(gulp.dest(paths.lightboxDest));
});

gulp.task('copy:content', function () {
    return gulp.src(paths.content + "/**/*.{css,js,json,gif,png,jpg,ttf,otf,ogv}")
               .pipe(gulp.dest(paths.contentDest));
});

gulp.task('copy:vendors', function () {
    return gulp.src(paths.vendors)
               .pipe(gulp.dest(paths.vendorsDest));
});

gulp.task('copy:config', function () {
    return gulp.src(paths.config)
               .pipe(gulp.dest(paths.configDest));
});

gulp.task('copy:index', function () {
    return gulp.src(paths.index)
               .pipe(gulp.dest(paths.webroot));
});

gulp.task('copy', function (done) {
    runSequence(
        "copy:templates",
        "copy:index",
        "copy:content",
        "copy:angular",
        "copy:rxjs",
        "copy:jquery",
        "copy:ng2-translate",
        "copy:bootstrap", 
        "copy:lightbox",
        "copy:font-awesome",
        "copy:i18n",
        "copy:vendors",
        "copy:config",
        done);
});


gulp.task('bundles:rxjs', function (done) {
    var builder = new Builder(paths.vendorsDest, './systemjs.config.js');
    var builderConfig = {
        minify: true,
        sourceMaps: true,
        mangle: false
    };

    builder
        .bundle(paths.rxjsFiles, paths.rxjsBundle, builderConfig)
        .then(function () {
            done();
        })
        .catch(function (err) {
            console.log(err);
            done();
        });
});

gulp.task('bundles:ng2-translate', function (done) {
    var builder = new Builder(paths.vendorsDest, './systemjs.config.js');
    var builderConfig = {
        minify: true,
        sourceMaps: true,
        mangle: false
    };

    builder
        .bundle(paths.ng2translateFiles, paths.ng2translateBundle, builderConfig)
        .then(function () {
            done();
        })
        .catch(function (err) {
            console.log(err);
            done();
        });
});

gulp.task('typescript:lint', function () {
    var filter = plugins.filter(['**/*.ts', '!**/*d.ts']);

    return gulp.src(['app/**/*.ts', 'typings/**/*.ts'])
               .pipe(filter)
               .pipe(tslint({ }));
});

gulp.task('typescript:compile', function () {
    var tsProject = plugins.typescript.createProject('./tsconfig.json');

    return tsProject.src()
                .pipe(plugins.sourcemaps.init())
                .pipe(plugins.typescript(tsProject))
                .pipe(plugins.sourcemaps.write())
                .pipe(gulp.dest(paths.compiledTs));
});

gulp.task('typescript:config', function () {
    return tsconfig({
        configPath: '.',
        indent: 2
    });
});

gulp.task('typescript', function (done) {
    runSequence("typescript:config", "typescript:lint", "typescript:compile", done);
});

gulp.task("clean", function () {
    del(paths.allDest);
});

gulp.task("bundle", function (done) {
    runSequence('bundles:rxjs', 'bundles:ng2-translate', done);
});

gulp.task('build', function (done) {
    runSequence('typescript', 'copy', 'bundle', done);
});

gulp.task('rebuild', function (done) {
    runSequence('clean', 'build', done);
});

gulp.task("watch", ['build'], function () {
    gulp.watch(paths.index, ['copy:index']);
    gulp.watch(paths.contentWatch, ['copy:content']);
    gulp.watch(paths.typescript, ['typescript']);
    gulp.watch(paths.templates, ['copy:templates']);
    gulp.watch(paths.config, ['copy:config']);
});

gulp.task('default', ['build']);