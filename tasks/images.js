import {src, dest} from 'gulp'

import imagemin         from 'gulp-imagemin'; // Minify PNG, JPEG, GIF and SVG images with imagemin.
import imageminPngquant from 'imagemin-pngquant';
import imageminZopfli   from 'imagemin-zopfli';
import imageminMozjpeg  from 'imagemin-mozjpeg'; //need to run 'brew install libpng'
import imageminGiflossy from 'imagemin-giflossy';



function optimiseImages (){
    const extImg = 'png,jpg,jpeg,gif,svg,svgz,webp';
    const srcImg = './src/img/**/*.{' + extImg + ',' + extImg.toUpperCase() + '}';
    const distImg = './www/img';

    return src(srcImg, {since: lastRun(optimiseImages)})
        .pipe(cache(imagemin([
            //png
            imageminPngquant({
                speed: 1,
                quality: [0.95, 1] //lossy settings
            }),
            imagemin.optipng({optimizationLevel: 5}),

            imageminZopfli({
                more: true
                // iterations: 50 // very slow but more effective
            }),
            //gif very light lossy, use only one of gifsicle or Giflossy
            imageminGiflossy({
                optimizationLevel: 3,
                optimize: 3, //keep-empty: Preserve empty transparent frames
                lossy: 2
            }),
            //svg
            imagemin.svgo({
                plugins: [{removeViewBox: false},
                    {collapseGroups: true}]
            }),
            //jpg lossless
            imagemin.jpegtran({
                progressive: true
            }),
            //jpg very light lossy, use vs jpegtran
            imageminMozjpeg({
                quality: 70
            })
        ])))
        .pipe(dest(distImg))
        .pipe(notify({message: 'TASK: "images optimized" Completed! 💯', onLast: true}));
}

export {
    optimiseImages
}