const gulp=require('gulp');
const sass=require('gulp-sass')(require('sass'));
const watch=require('gulp-watch');
const sourcemaps=require('gulp-sourcemaps');
const spritesmith = require('gulp.spritesmith');
// const spritesmith = require('gulp.spritesmith-multi');
// const spritesmithPlugin = require('webpack-spritesmith');

gulp.task('sass', function () {
    return gulp.src('src/scss/*.scss')
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(gulp.dest('src/css'))
});

gulp.task('watch', function () {
    gulp.watch('src/scss/**/*.scss',gulp.parallel(['sass','sourcemaps','sprite']));
});

gulp.task('sourcemaps', function () {
    return gulp.src('src/scss/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('src/css'))
});

// 스프라이트 이미지
gulp.task('sprite', function() {
  const spriteData = gulp.src('src/img/sprite/*').pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.css',
    cssName: 'sprite.scss',
    imgPath : '../img/images/sprite.png',
    padding: 5,
    cssOpts: {
      cssSelector: function(sprite) {
        return '.sprite_' + sprite.name;
      }
    }
  }));

  return spriteData.pipe(gulp.dest('src/img/images'));
});

//스프라이트 이미지 레티나 대응
// gulp.task('sprite', function() {
//   const spriteData = gulp.src('src/img/sprite/*.png').pipe(spritesmith({
//     retinaSrcFilter: 'src/img/sprite/*@2x.png',
//     imgName: 'sprite.png',
//     retinaImgName: 'sprite@2x.png',
//     padding: 5,
//     cssName: 'sprite.scss',
//     cssName: 'sprite.css',
//     cssOpts: {
//       cssSelector: function(sprite) {
//         return '.sprite-' + sprite.name;
//       }
//     }
//   }));
//
//   return spriteData.pipe(gulp.dest('src/img/images'));
// });

gulp.task('default', gulp.parallel(['watch']));
