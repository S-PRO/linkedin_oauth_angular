var gulp = require('gulp'),
    plugins = require("gulp-load-plugins")({lazy: false}),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    ngAnnotate = require('gulp-ng-annotate'),
    minifyCSS = require('gulp-minify-css'),
    expect = require('gulp-expect-file'),
    path = require('path'),
    karma = require('gulp-karma'),
    clean = require('gulp-clean'),
    cover = require('gulp-coverage');

var config = {
    SCRIPTS: [
        './app/config/develop.config.js',

        './app/src/login/LoginCtrl.js',
        './app/src/login/login.routes.js',

        './app/src/oauth2/OAuth2Resource.js',
        './app/src/oauth2/linkedin/Oauth2LiknedinCtrl.js',
        './app/src/oauth2/linkedin/oauth2_linkedin.routes.js',

        './app/app.js'
    ],
    BOWER_SCRIPTS: [
        "./bower_components/angular/angular.min.js",
        "./bower_components/angular-animate/angular-animate.min.js",
        "./bower_components/angular-cookies/angular-cookies.min.js",
        "./bower_components/angular-resource/angular-resource.min.js",
        "./bower_components/angular-ui-router/release/angular-ui-router.min.js",
        "./bower_components/angular-sanitize/angular-sanitize.min.js",
        "./bower_components/angular-touch/angular-touch.min.js",
        "./bower_components/angular-bootstrap/ui-bootstrap.min.js",
        "./bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js",
        "./bower_components/spin.js/spin.min.js",
        "./bower_components/angular-spinner/angular-spinner.min.js",
        "./bower_components/angular-kstorage/dist/kStorage.min.js"
    ],
    BOWER_CSS: [
        "./bower_components/bootstrap/dist/css/bootstrap.min.css"
    ],
    BOWER_FONTS: [
        "./bower_components/bootstrap/dist/fonts/*.*"
    ],
    CONFIG_PRODUCTION: [
        './app/config/production.config.js'
    ],
    CONFIG_PREPRODUCTION: [
        './app/config/preproduction.config.js'
    ],
    CONFIG_DEVELOP: [
        './app/config/develop.config.js'
    ],
    JSON: []
};
config.CONFIG_DEVELOP = config.CONFIG_DEVELOP.concat(config.SCRIPTS);
config.CONFIG_PREPRODUCTION = config.CONFIG_PREPRODUCTION.concat(config.SCRIPTS);
config.CONFIG_PRODUCTION = config.CONFIG_PRODUCTION.concat(config.SCRIPTS);

gulp.task('scripts_min_develop', function () {
    gulp.src(config.CONFIG_DEVELOP)
        .pipe(sourcemaps.init())
        .pipe(concat('app.min.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/assets/js'));
});

gulp.task('scripts_min_preproduction', function () {
    gulp.src(config.CONFIG_PREPRODUCTION)
        .pipe(sourcemaps.init())
        .pipe(concat('app.min.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/assets/js'));
});

gulp.task('scripts_min_production', function () {
    gulp.src(config.CONFIG_PRODUCTION)
        .pipe(sourcemaps.init())
        .pipe(concat('app.min.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/assets/js'));
});
gulp.task('scripts_min', function () {
    gulp.src(config.SCRIPTS)
        .pipe(sourcemaps.init())
        .pipe(concat('app.min.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/assets/js'));
});

gulp.task('scripts_dev', function () {
    gulp.src(config.SCRIPTS)
        .pipe(sourcemaps.init())
        .pipe(concat('app.min.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/assets/js'));
});

gulp.task('templates', function () {
    gulp.src(['!./app/index.html',
        './app/**/*.html'])
        .pipe(plugins.angularTemplatecache('templates.js', {standalone: true}))
        .pipe(gulp.dest('./dist/assets/js'));
});

gulp.task('css_dev', function () {
    gulp.src(['./app/**/*.css'])
        .pipe(plugins.concat('app.min.css'))
        .pipe(gulp.dest('./dist/assets/css'));
});

gulp.task('css_min', function () {
    gulp.src(['./app/**/*.css'])
        .pipe(plugins.concat('app.min.css'))
        .pipe(minifyCSS({keepBreaks: false}))
        .pipe(gulp.dest('./dist/assets/css'));
});

gulp.task('vendorBOWER', function () {
    gulp.src(config.BOWER_SCRIPTS)
        .pipe(plugins.concat('bower-components.min.js'))
        .pipe(gulp.dest('./dist/assets/js'));
    gulp.src(config.BOWER_CSS)
        .pipe(plugins.concat('bower-components.min.css'))
        .pipe(gulp.dest('./dist/assets/css'));
    gulp.src(config.BOWER_FONTS)
        .pipe(gulp.dest('./dist/assets/fonts'));
    gulp.src('./bower_components/angular-sanitize/angular-sanitize.min.js.map')
        .pipe(gulp.dest('./dist/assets/js'));
});

gulp.task('copy_index', function () {
    gulp.src('./app/index.html')
        .pipe(gulp.dest('./dist'));
});

gulp.task('watch_min', function () {
    gulp.watch([
        'dist/**/*.html',
        'dist/**/*.js',
        'dist/**/*.css'
    ], function (event) {
        return gulp.src(event.path)
            .pipe(plugins.connect.reload());
    });
    gulp.watch(['./app/**/*.js'], ['scripts_min']);
    gulp.watch(['./app/**/*.html'], ['templates']);
    gulp.watch('./app/index.html', ['copy_index']);
    gulp.watch('./app/**/*.css', ['css_min']);
});

gulp.task('watch_dev', function () {
    gulp.watch([
        'dist/**/*.html',
        'dist/**/*.js',
        'dist/**/*.css'
    ], function (event) {
        return gulp.src(event.path)
            .pipe(plugins.connect.reload());
    });
    gulp.watch(['./app/**/*.js'], ['scripts_dev', 'templates']);
    gulp.watch(['./app/**/*.html'], ['templates']);
    gulp.watch('./app/index.html', ['copy_index']);
    gulp.watch('./app/**/*.css', ['css_dev']);
});

gulp.task('copy-assets', function () {
    gulp.src('./app/assets/fonts/**')
        .pipe(gulp.dest('./dist/assets/fonts'));
    gulp.src('./app/assets/images/**/*.*')
        .pipe(gulp.dest('./dist/assets/images'));
    gulp.src('./app/assets/icons/**/*.*')
        .pipe(gulp.dest('./dist/assets/icons'));
    gulp.src('./app/assets/splash/**/*.*')
        .pipe(gulp.dest('./dist/assets/splash'));
    gulp.src('./app/assets/img/**/*.*')
        .pipe(gulp.dest('./dist/assets/img'));
});

gulp.task('copy-config-xml', function () {
    gulp.src('./config.xml')
        .pipe(gulp.dest('./dist'));
});

gulp.task('connect', plugins.connect.server({
    root: ['dist'],
    port: 9000,
    livereload: true
}));

gulp.task('clean', function () {
    return gulp.src('./dist', {read: false})
        .pipe(clean({force: true}));
});

gulp.task('copy_json', function () {
    gulp.src(config.JSON)
        .pipe(gulp.dest('./dist'));
});

gulp.task('test_dev', function () {
    return gulp.src([
        'dist/assets/js/bower-components.min.js',
        'bower_components/angular-mocks/angular-mocks.js',
        'dist/assets/js/app.min.js',
        'dist/**/*_test.js',
        //'./../FrontendCore/services/**/*_test.js',
        'app/**/*.html'
    ], {read: false})
        .pipe(karma({
            configFile: path.resolve('karma.config.js'),
            action: 'watch',
            autoWatch: true,
            singleRun: false
        }));
});

gulp.task('default', ['connect', 'scripts_dev', 'templates', 'css_dev', 'copy_index', 'copy-assets', 'vendorBOWER', 'copy_json', 'watch_dev']);
gulp.task('test', ['connect', 'scripts_dev', 'templates', 'css_dev', 'copy_index', 'copy-assets', 'vendorBOWER', 'copy_json', 'watch_dev', 'test_dev']);

gulp.task('develop', ['scripts_min_develop', 'templates', 'css_min', 'copy_index', 'copy-assets', 'vendorBOWER', 'copy-config-xml', 'copy_json']);
gulp.task('preproduction', ['scripts_min_preproduction', 'templates', 'css_min', 'copy_index', 'copy-assets', 'vendorBOWER', 'copy-config-xml', 'copy_json']);
gulp.task('production', ['scripts_min_production', 'templates', 'css_min', 'copy_index', 'copy-assets', 'vendorBOWER', 'copy-config-xml', 'copy_json']);