/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

var es = require('event-stream');

var gulp = require('gulp'),
    tsconfig = require('tsconfig-glob'),
    yargs = require('yargs'),
    del = require("del"),
    runSequence = require('run-sequence'),
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
    styles: "Content/Styles",
    webroot: "./wwwroot/",
    npm: "./node_modules/",
    angular: "./node_modules/@angular",
    rxjs: "./node_modules/rxjs",
    fontAwesome: "./node_modules/font-awesome"
};

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
paths.rxjsDest = paths.vendorsDest + '/rxjs';
paths.rxjsFiles = [
    paths.rxjsDest + '/add/**/*.js',
    paths.rxjsDest + '/observable/**/*.js',
    paths.rxjsDest + '/operator/**/*.js',
    paths.rxjsDest + '/scheduler/**/*.js',
    paths.rxjsDest + '/symbol/**/*.js',
    paths.rxjsDest + '/util/**/*.js',
    paths.rxjsDest + '/*.js'
];
paths.rxjsBundle = paths.rxjsDest + '/bundles/rxjs.min.js';
paths.fontAwesomeDest = paths.vendorsDest + '/font-awesome';
paths.config = [
    'systemjs.config.js'
];
paths.configDest = paths.webroot;
paths.templates = paths.app + "**/*.html";
paths.templatesDest = paths.webroot + "app";

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

gulp.task('copy:font-awesome', function () {
    return gulp.src(paths.fontAwesome + "/**/*.{css,otf,eot,svg,ttf,woff,wof2}")
               .pipe(gulp.dest(paths.fontAwesomeDest));
});

gulp.task('copy:vendors', ['copy:angular', 'copy:rxjs', 'copy:font-awesome'], function () {
    return gulp.src(paths.vendors)
               .pipe(gulp.dest(paths.vendorsDest));
});

gulp.task('copy:config', function () {
    return gulp.src(paths.config)
               .pipe(gulp.dest(paths.configDest));
});

gulp.task('copy', function (done) {
    runSequence("copy:templates", "copy:vendors", "copy:config", done);
});

gulp.task('bundles:rxjs', function (done) {
    var builder = new Builder(paths.vendorsDest, './systemjs.config.js');
    var builderCondig = {
        minify: true,
        sourceMaps: true,
        mangle: false
    };

    builder
        .bundle(paths.rxjsFiles, paths.rxjsBundle, builderCondig)
        .then(function () {
            done();
        })
        .catch(function (err) {
            console.log(err);
            done();
        });
});

gulp.task('bundles', function (done) {
    runSequence("bundles:rxjs", done);
});

// gulp.task('less:lint', function () {
//     return gulp.src(paths.siteLess)
//                .pipe(plugins.recess());
// });

// gulp.task('less:compile', function () {
//     return gulp.src(paths.siteLess)
//                .pipe(plugins.less())
//                .pipe(plugins.cleanCss())
//                .pipe(gulp.dest(paths.lessDest));
// });

// gulp.task('less', function (done) {
//     runSequence("less:lint", "less:compile", done);
// });

gulp.task('typescript:lint', function () {
    var filter = plugins.filter(['**/*.ts', '!**/*d.ts']);

    return gulp.src(['app/**/*.ts', 'typings/**/*.ts'])
               .pipe(filter)
               .pipe(tslint({ }))
              // .pipe(tslint.report("verbose"))
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

gulp.task('build', function (done) {
    runSequence(/*'less',*/ 'typescript', 'copy', 'bundles', done);
});

gulp.task('rebuild', function (done) {
    runSequence('clean', 'build', done);
});

gulp.task("watch", ['build'], function () {
    //gulp.watch(paths.less, ['less']);
    gulp.watch(paths.typescript, ['typescript']);
    gulp.watch(paths.templates, ['copy:templates']);
    gulp.watch(paths.config, ['copy:config']);
});

gulp.task('default', ['build']);