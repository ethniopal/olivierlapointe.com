import {config as configData, basePath, distDir} from "./config";
import {watch}    from 'gulp';
import Browser from 'browser-sync';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';

import { config as webpackConfig } from './webpack';

const browser = Browser.create();
const bundler = webpack(webpackConfig);

function server(done) {

    //Configuration du serveur
    let configServer = {
        open: true,
        middleware: [
            webpackDevMiddleware(bundler, { /* options */ })
        ],
    };

    //Vérification s'il y a un proxy
    if(configData.proxy.length > 1){
        configServer.proxy = configData.proxy;
    }
    else{
        configServer.server = {
            baseDir: basePath + distDir + '/'
        };
        configServer.files = [
            configData.css.dist + '/**/*',
            configData.js.dist + '/**/*',
            configData.theme.dist + '/**/*.{htm, html, asp, aspx, php, xml}'
        ];
    }

    //initie le serveur
    browser.init(configServer);
    watch(configData.js.src + '/**/*.js').on('change', reload);
    done();
}

function reload(done){
    browser.reload();
    done();
}

export {
    server, reload, browser
}