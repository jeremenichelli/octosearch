var gulp = require('gulp'),
    rename = require('gulp-rename'),
    less = require('gulp-less'),
    minifyCss = require('gulp-minify-css'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint');

var paths = {
    scripts: {
        src: 'src/scripts/*.js',
        dist: 'assets/scripts/main.js',
        output: 'assets/scripts/'
    },
    styles: {
        src: 'src/styles/octosearch.less',
        dist: 'assets/styles/main.css',
        output: 'assets/styles/'
    }
};

gulp.task('styles:less', function () {
    return gulp.src(paths.styles.src)
        .pipe(less())
        .pipe(autoprefixer('> 1%'))
        .pipe(rename({
            basename: 'main'
        }))
        .pipe(gulp.dest(paths.styles.output));
});

// styles tasks
gulp.task('styles', ['styles:less'], function () {
    return gulp.src(paths.styles.dist)
        .pipe(minifyCss())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(paths.styles.output));
});

gulp.task('scripts:lint', function () {
    return gulp.src('src/scripts/octosearch.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('scripts:concat', [ 'scripts:lint' ], function () {
    return gulp.src(paths.scripts.src)
        .pipe(concat('main.js'))
        .pipe(gulp.dest(paths.scripts.output));
});

gulp.task('scripts:minify', [ 'scripts:concat' ], function () {
    return gulp.src(paths.scripts.dist)
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(paths.scripts.output))
});

// alias for scripts tasks
gulp.task('scripts', [ 'scripts:minify' ]);


// default task
gulp.task('default', [ 'styles', 'scripts' ]);

// watch specific files
gulp.task('watch:styles', function () {
    gulp.watch('src/styles/*.less', [ 'styles' ]);
});

gulp.task('watch:scripts', function () {
    gulp.watch('src/scripts/*.js', [ 'scripts' ]);
});


// watch all
gulp.task('watch', function () {
    gulp.watch('src/**/*', [ 'default' ])
});
