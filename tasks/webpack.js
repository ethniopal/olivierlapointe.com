import {basePath, srcDir, distDir, config as configData} from "./config.js";

import path    from 'path'
import webpack from 'webpack'
import process from 'process'

const isProduction = (process.env.NODE_ENV === 'production')
const {js} = configData;

let config = {
    mode: isProduction ? "production" : "development",

    entry: js.entry, //ajoutez les fichiers à bundler

    output: {
        filename: js.filename,
        path:  path.resolve(__dirname, '.' + js.dist),
        chunkFilename: "vendors.bundle.js"
    },

    context: path.resolve(__dirname, '.' + js.src),

    devtool: false,
    plugins:  [
        //Inclus les sources maps des fichiers bundler
        new webpack.SourceMapDevToolPlugin({
            filename: '[file].map',
            moduleFilenameTemplate: undefined,
            fallbackModuleFilenameTemplate: undefined,
            append: null,
            module: true,
            columns: true,
            lineToLine: false,
            noSources: false,
            namespace: ''
        })
    ],

    optimization:{
      splitChunks: { //Permets d'importer des librairies nodes si utilisé dans le projet afin d'éviter de les avoir dans plus d'un bundle
          cacheGroups: {
              node_vendors: {
                  test: /[\\/]node_modules[\\/]/,
                  chunks: 'all',
                  priority: 1,
              },
              libs: {
                  test: /[\\/]libs[\\/]/,
                  chunks: 'all',
                  priority: 2,
              }
          },
          chunks (chunk) {
              return chunk.name
          }
      }
    },

    module: {
        rules: [
            {
                test: /\.?js$/,
                exclude: /(node_modules|bower_components|libs)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory:true,
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }

}

//Si en production
if(isProduction){
    config.plugins.push(new webpack.optimize.UglifyJsPlugin());
}

function scripts() {

    return new Promise(resolve => webpack(config, (err, stats) => {

        if(err) console.log('Webpack', err)

        console.log(stats.toString({ /* stats options */ }))

        resolve()
    }))
}

module.exports = { config, scripts }
