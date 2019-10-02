import {series, parallel, watch} from 'gulp';
import {config as configData, config} from "./config";

import { scripts } from './webpack';
import { server , reload }  from './server';
import { cleanInit, cleanDist, generateSrcDirectory }  from './clean';
import { optimiseImages, optimiseImagesWp , resizeImage }  from './images';
import { styles }  from './css';
import { copy as copyFiles, copyPlugins }  from './copy';
import { downloadFiles }  from './download';
import { uploadFTP, backupBD }  from './deploy';
import { wamp }  from './wamp';

import createDatabase from './bd';



/**
 * Permet d'observer les fichiers
 */
function watchFiles () {
    const {css, js, theme, img, plugins, muplugins, type} = config;

    watch(css.src + '/**/*.scss', styles);
    watch(theme.src + '/**/*').on('change', series(copyFiles, reload));
    watch(img.src + '/**/*').on('change', series(optimiseImages, reload));
    watch(js.src + '/**/*.js').on('change', series(scripts, reload));

    //pour wordpress
    if(type=='wp'){
        watch([
            plugins.src + '/**/*',
            muplugins.src + '/**/*']).on('change', series(copyPlugins));
    }
}

// Les différentes tâches du gulp
export const init  = series(cleanDist, generateSrcDirectory, wamp, createDatabase/*, downloadFiles  */);
export const dev   = series(parallel(styles, copyFiles, copyPlugins, optimiseImages, optimiseImagesWp, scripts), parallel(watchFiles, server));
export const build = series( cleanDist, parallel(styles, copyFiles, copyPlugins, optimiseImages, optimiseImagesWp), scripts, uploadFTP, backupBD );

//Les tâches individuel
export const clean   = series(cleanDist);
export const cleanSrc   = series(cleanInit);
export const resize  = series(resizeImage);
export const js = series(scripts);
export const css  = series(styles);
export const copy  = series(copyFiles, copyPlugins);
export const sql  = series(createDatabase);
export const vhost  = series(wamp);


export default dev;