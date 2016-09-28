/**
 * System configuration
 */
(function (global) {
    // map tells the System loader where to look for things
    var map = {
        'app': 'app',
        '@angular': 'lib/@angular'
    };
    // packages tells the System loader how to load when no filename and/or no extension
    var packages = {
        'app': { main: 'main.js', defaultExtension: 'js' },
        'rxjs': { defaultExtension: 'js' },
        'lodash': { defaultExtension: 'js' },
        'ng2-translate': { defaultExtension: 'js' }
    };
    var ngPackageNames = [
        'common',
        'compiler',
        'core',
        'forms',
        'http',
        'platform-browser',
        'platform-browser-dynamic',
        'router'
    ];
    // Individual files (~300 requests):
    function packNgIndex(pkgName) {
        packages['@angular/' + pkgName] = { main: 'index.js', defaultExtension: 'js' };
    }
    // Bundled (~40 requests):
    function packNgUmd(pkgName) {
        packages['@angular/' + pkgName] = { main: 'bundles/' + pkgName + '.umd.min.js', defaultExtension: 'js' };
    }
    // Most environments should use UMD; some (Karma) need the individual index files
    var setNgPackageConfig = System.packageWithIndex ? packNgIndex : packNgUmd;
    // Add package entries for angular packages
    ngPackageNames.forEach(setNgPackageConfig);

    var config = {
        baseURL: global.baseUrl,
        paths: {
            "lodash": "/lib/lodash.min.js"
        },
        map: map,
        packages: packages,
        bundles: {
            "/lib/bundles/rxjs.min.js": [
                "rxjs/*",
                "rxjs/operator/*",
                "rxjs/observable/*",
                "rxjs/add/operator/*",
                "rxjs/add/observable/*",
                "rxjs/util/*"
            ],
            "/lib/bundles/ng2-translate.min.js": [
                "ng2-translate/*"
            ]
        }
    };
    System.config(config);
})(this);