import {series, parallel, watch} from 'gulp';
import {config} from "./config";

import { scripts } from './webpack';
import { server , browser }  from './server';
import { cleanInit, cleanDist, generateSrcDirectory }  from './clean';
import { optimiseImages }  from './images';
import { styles }  from './css';
import { copy }  from './copy';


/**
 * Permet d'observer les fichiers
 */
function watchFiles() {
    const {css, theme, img} = config;

    watch(css.src + '/**/*.scss', styles);
    watch(theme.src + '/**/*', series(copy, browser.reload()));
    watch(img.src + '/**/*', series(optimiseImages, browser.reload()));
    //pour le JS, voir le webpack

}


export const init  = series(cleanInit, cleanDist, generateSrcDirectory );
export const dev   = series(parallel(styles, copy, optimiseImages), server, watchFiles );
export const build = series( scripts );

export default dev;