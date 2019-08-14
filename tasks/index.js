import {series, parallel, watch} from 'gulp';
import {config as configData, config} from "./config";

import { scripts } from './webpack';
import { server , reload }  from './server';
import { cleanInit, cleanDist, generateSrcDirectory }  from './clean';
import { optimiseImages, optimiseImagesWp }  from './images';
import { styles }  from './css';
import { copy }  from './copy';
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
    watch(theme.src + '/**/*').on('change', series(copy, reload));
    watch(img.src + '/**/*').on('change', series(optimiseImages, reload));
    watch(js.src + '/**/*.js').on('change', series(scripts, reload));
}

// Les différentes tâches du gulp
// export const init  = series(cleanInit, cleanDist, generateSrcDirectory, downloadFiles, createDB );
export const init  = series(wamp);
export const dev   = series(parallel(styles, copy, optimiseImages, optimiseImagesWp, scripts), parallel(watchFiles, server));
export const build = series( cleanDist, parallel(styles, copy, optimiseImages, optimiseImagesWp), scripts, uploadFTP, backupBD );

export default dev;