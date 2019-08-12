import {series} from 'gulp'

import { scripts } from './webpack'
import { server }  from './server'
import { cleanSrc, cleanDist, generateSrcDirectory }  from './clean'

export const dev   = series(generateSrcDirectory, server )
export const build = series( scripts )

export default dev
