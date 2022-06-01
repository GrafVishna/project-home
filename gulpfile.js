 // Импорт пакетов
import gulp         from 'gulp';

import concat       from 'gulp-concat';
import uglify       from 'gulp-uglify';

import ts           from 'gulp-typescript';
import coffee       from 'gulp-coffee';
import babel        from 'gulp-babel';

import webp         from 'gulp-webp';
import imagemin     from 'gulp-imagemin';
import less         from 'gulp-less';
import stylus       from 'gulp-stylus';

import dartSass     from 'sass';
import gulpSass     from 'gulp-sass';
    const sass = gulpSass(dartSass);

import sourcemaps   from 'gulp-sourcemaps';
import autoprefixer from 'gulp-autoprefixer';
import gmedia       from 'group-css-media-queries';

import cleanCSS     from 'gulp-clean-css';
import htmlmin      from 'gulp-htmlmin';

import rename       from 'gulp-rename'
import size         from 'gulp-size';
import del          from 'del';

import gulppug      from 'gulp-pug';
import browsersync  from 'browser-sync';

import gcmq         from 'gulp-group-css-media-queries';


// Пути исходных файлов src и пути к результирующим файлам dest ========

const paths = {
  html: {
    src: ['src/html/*.html', 'src/*.pug'],
    dest: 'dist/'
  },
  htmlbuild: {
    src: ['src/html/*.html', 'src/*.pug'],
    dest: 'build/'
  },
  icons: {
    src: ['src/img/icons/*.png', 'src/img/icons/*.svg', 'src/img/icons/*.ico', 'src/img/icons/*.bmp',],
    dest: 'dist/img/icons/'
  },
  iconsbuild: {
    src: ['src/img/icons/*.png', 'src/img/icons/*.svg', 'src/img/icons/*.ico', 'src/img/icons/*.bmp',],
    dest: 'build/img/icons/'
  },
  styles: {
    src: ['src/styles/**/*.sass', 'src/styles/**/*.scss', 'src/styles/**/*.styl', 'src/styles/**/*.less', 'src/styles/**/*.css'],
    dest: 'dist/css/'
  },
  stylesmin: {
    src: ['src/styles/**/*.sass', 'src/styles/**/*.scss', 'src/styles/**/*.styl', 'src/styles/**/*.less', 'src/styles/**/*.css'],
    dest: 'build/css/'
  },
  scripts: {
    src: ['src/scripts/**/*.coffee', 'src/scripts/**/*.ts', 'src/scripts/**/*.js'],
    dest: 'dist/js/'
  },
  images: {
    src: 'src/img/*.*',
    dest: 'dist/img/'
  },
  imgp: {
    src: 'src/img/*.*',
    dest: 'dist/img/'
  }
}

// Очистить каталог dist, удалить все кроме изображений =========

export const clean = () => {
  return del(['dist/*', '!dist/img'])
}

// Обработка html и pug ==========================================

export const html = () => {
  return gulp.src(paths.html.src)
    //.pipe(gulppug())
    .pipe(htmlmin({ collapseWhitespace: false }))
    .pipe(size({
      showFiles: true
    }))
    .pipe(gulp.dest(paths.html.dest))
    .pipe(browsersync.stream())
}
    // Билд
export const htmlbuild = () => {
  return gulp.src(paths.html.src)
    //.pipe(gulppug())
    .pipe(htmlmin({ collapseWhitespace: false }))
    .pipe(size({
      showFiles: true
    }))
    .pipe(gulp.dest(paths.htmlbuild.dest))
    .pipe(browsersync.stream())
}

// Обработка препроцессоров стилей ===============================
      // Без сжатия css 
export const styles = () => {
  return gulp.src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 5 versions'],
      grid: true,
      cascade: true
    }))
    .pipe(concat('style.css'))
    .pipe(gcmq())
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browsersync.stream())
}
// С сжатием css - Билд
export const stylesmin = () => {
  return gulp.src(paths.stylesmin.src)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 5 versions'],
      grid: true,
      cascade: true
    }))
    .pipe(gcmq())
    .pipe(cleanCSS({
      level: 2
    }))
    .pipe(concat('min.style.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.stylesmin.dest))
  }

// Обработка Java Script, Type Script и Coffee Script =========================

export const scripts = () => {
  return gulp.src(paths.scripts.src)
    .pipe(sourcemaps.init())
    .pipe(concat('script.js'))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(browsersync.stream())
}
    // С сжатием Билд
export const scriptsmin = () => {
  return gulp.src(paths.scripts.src)
    .pipe(sourcemaps.init())
    .pipe(concat('script.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('build/scripts'))
}

// Сжатие изображений  ==================================================

    // перемещение иконок
export const icons = () => {
  return gulp.src(paths.icons.src)
    .pipe(gulp.dest(paths.icons.dest))
    .pipe(browsersync.stream())
};
export const iconsbuild = () => {
  return gulp.src(paths.icons.src)
    .pipe(gulp.dest(paths.iconsbuild.dest))
};
    // Конвертация в WebP
export const imgp = () => {
  return gulp.src(paths.images.src)
    .pipe(webp({
        quality: 80,
        method: 6,
        lossless: true,
    }))
    .pipe(gulp.dest('build/img'))
    .pipe(browsersync.stream())
};
    // Простое сжатие
export const img = () => {
  return gulp.src(paths.images.src)
    .pipe(imagemin())
    .pipe(size({
      showFiles: true
    }))
    .pipe(gulp.dest(paths.images.dest))
    .pipe(browsersync.stream())
};

// Отслеживание изменений в файлах и запуск лайв сервера =========================
export const watch = () => {
  browsersync.init({
    server: {
      baseDir: "./dist"
    }
  })
  gulp.watch(paths.html.dest).on('change', browsersync.reload)
  gulp.watch(paths.html.src, html)
  gulp.watch(paths.styles.src, styles)
  gulp.watch(paths.scripts.src, scripts)
  gulp.watch(paths.images.src, img)
  gulp.watch(paths.icons.src, icons)
}

// Таск, который выполняется комплексно===========================================
export default gulp.series(clean, html, gulp.parallel(styles, scripts, icons, img));
export const build = gulp.series(clean, htmlbuild, gulp.parallel(stylesmin, scriptsmin, iconsbuild, imgp));