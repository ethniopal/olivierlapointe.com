import {series, parallel} from 'gulp';

import { scripts } from './webpack';
import { server }  from './server';
import { cleanSrc, cleanDist, generateSrcDirectory }  from './clean';
import { optimiseImages }  from './images';
import { styles }  from './css';
import { copy }  from './copy';


export const dev   = series(generateSrcDirectory, server, optimiseImages, styles, copy );
export const build = series( scripts );

export default dev;