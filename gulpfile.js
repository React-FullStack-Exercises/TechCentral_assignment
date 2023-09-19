const { src, dest, watch, parallel, series } = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const sync = require('browser-sync').create()

function buildStyles(cb) {
  src('./styles/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('./styles/css'))
    .pipe(sync.stream());
  cb();
}

function watchFiles(cb) {
  watch('styles/sass/**/*.scss', buildStyles)
}

function browserSync(cb) {
  sync.init({
    server: {
      baseDir: '.',
    },
  })

  watch('scripts/**.js')
  watch('styles/sass/**/*.scss', buildStyles).on('change', sync.reload)
  watch('*.html').on('change', sync.reload)
}

exports.css = buildStyles
exports.watch = watchFiles
exports.sync = browserSync

exports.default = series(buildStyles, browserSync)
