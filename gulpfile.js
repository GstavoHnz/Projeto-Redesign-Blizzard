const gulp = require('gulp');
const sass =  require('gulp-sass')(require('sass'));
const autoprefixer =  require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

//Compilando o SaSS, adicionando autoprefixed e dando refesh na pagina.
function compileSass(){
  return gulp.src('scss/*.scss')
  .pipe(sass({outputStyle : 'compressed'}))
  .pipe(autoprefixer({
    overrideBrowserslist: ['last 2 versions'],
    cascade: false
  }))
  .pipe(gulp.dest('css/'))
  .pipe(browserSync.stream());
}

function pluginsCss(){
  return gulp.src('css/lib/*.css')
  .pipe(concat('plugins.css'))
  .pipe(gulp.dest('css/'))
  .pipe(browserSync.stream())
}

gulp.task('plugincss', pluginsCss);

//Modo de excecutar a Functio do Sass. 'O parametro DEFAULT serve para executar todos os arquivos sem necessidade de especificar um arquivo.'
gulp.task('sass', compileSass);

//Automatiza o JS para juntar todos os arquivos .js na produção.
function gulpJs(){
  return gulp.src('js/scripts/*.js')
  .pipe(concat('all.js'))
  .pipe(babel({
    presets: ['@babel/env']
  }))
  .pipe(uglify()) //Minifica os arquivos JS para Produção.
  .pipe(gulp.dest('js/'))
  .pipe(browserSync.stream())
}
gulp.task('alljs', gulpJs);

//Função para bibliotecas externas
function pluginsJs(){
  return gulp
  .src(['./js/lib/aos.min.js', './js/lib/swiper.min.js'])
  .pipe(concat('plugins.js'))
  .pipe(gulp.dest('js/'))
  .pipe(browserSync.stream())
}
gulp.task('pluginjs', pluginsJs);

//Function do Browser-Sync
function browser(){
  browserSync.init({
    server: {
      baseDir: './'
    }
  })
}
gulp.task('browser-sync', browser);

//Function para execultar o Gulp, sem precisar estar chamando sempre.
function watch(){
  gulp.watch('scss/*.scss', compileSass);
  gulp.watch('css/lib/*.css', pluginsCss);
  gulp.watch('*.html').on('change', browserSync.reload);
  gulp.watch('js/scripts/*.js', gulpJs);
  gulp.watch('js/lib/*.js', pluginsJs);
}

gulp.task('watch', watch);

//Tarefa que execulta o watch e o BrowserSync
gulp.task('default', gulp.parallel('watch', 'browser-sync', 'sass', 'plugincss', 'alljs', 'pluginjs'));