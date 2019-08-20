import {series, parallel, watch} from 'gulp';
import {config as configData, config} from "./config";

import { scripts } from './webpack';
import { server , reload }  from './server';
import { cleanInit, cleanDist, generateSrcDirectory }  from './clean';
import { optimiseImages, optimiseImagesWp , resizeImage }  from './images';
import { styles }  from './css';
import { copy as copyFiles }  from './copy';
import { downloadFiles }  from './download';
import { createDB }  from './bd';
import { uploadFTP, backupBD }  from './deploy';

import { wamp }  from './wamp';


/**
 * Permet d'observer les fichiers
 */
function watchFiles () {
    const {css, js, theme, img} = config;

    watch(css.src + '/**/*.scss', styles);
    watch(theme.src + '/**/*').on('change', series(copyFiles, reload));
    watch(img.src + '/**/*').on('change', series(optimiseImages, reload));
    watch(js.src + '/**/*.js').on('change', series(scripts, reload));
}

// Les différentes tâches du gulp
export const init  = series(cleanInit, cleanDist, generateSrcDirectory, wamp, downloadFiles, createDB );
export const dev   = series(parallel(styles, copyFiles, optimiseImages, optimiseImagesWp, scripts), parallel(watchFiles, server));
export const build = series( cleanDist, parallel(styles, copyFiles, optimiseImages, optimiseImagesWp), scripts, uploadFTP, backupBD );

//Les tâches individuel
export const clean   = series(cleanDist);
export const resize  = series(resizeImage);
export const js = series(scripts);
export const css  = series(styles);
export const copy  = series(copyFiles);
export const vhost  = series(wamp);


export default dev;