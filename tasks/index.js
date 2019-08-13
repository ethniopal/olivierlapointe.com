import {series, parallel, watch} from 'gulp';
import {config} from "./config";

import { scripts } from './webpack';
import { server , reload }  from './server';
import { cleanInit, cleanDist, generateSrcDirectory }  from './clean';
import { optimiseImages }  from './images';
import { styles }  from './css';
import { copy }  from './copy';


const {css, theme, img} = config;

/**
 * Permet d'observer les fichiers
 */
function watchFiles () {
    watch(css.src + '/**/*.scss', styles);
    watch(theme.src + '/**/*').on('change', series(copy, reload));
    watch(img.src + '/**/*').on('change', series(optimiseImages, reload));

}
// watch('src/js/*.js').on('change', () => browser.reload())



export const init  = series(cleanInit, cleanDist, generateSrcDirectory );
export const dev   = series(parallel(styles, copy, optimiseImages), parallel(watchFiles, server));
export const build = series( cleanDist, parallel(styles, copy, optimiseImages), scripts );

export default dev;