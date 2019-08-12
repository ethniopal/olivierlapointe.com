import gulp    from 'gulp'
import Browser from 'browser-sync'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'

import { config as webpackConfig } from './webpack'

const browser = Browser.create()
const bundler = webpack(webpackConfig)

function server() {

    let config = {
        server: 'src',
        open: false,
        middleware: [
            webpackDevMiddleware(bundler, { /* options */ })
        ],
    }

    browser.init(config)

    gulp.watch('src/js/*.js').on('change', () => browser.reload())
}

export {
    server, browser
}