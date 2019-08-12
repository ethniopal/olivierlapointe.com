import {series} from 'gulp'

import { scripts } from './webpack'
import { server }  from './server'
import { cleanSrc, cleanDist, generateSrcDirectory }  from './clean'
import { optimiseImages }  from './images'

export const dev   = series(generateSrcDirectory, server, optimiseImages )
export const build = series( scripts )

export default dev
