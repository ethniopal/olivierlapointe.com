import {config, basePath, distDir} from "./config.js";
import {src, dest}  from 'gulp';

import fs   from "fs-extra";
import findInFiles from 'find-in-files';
import path from 'path';

const proxy = config.proxy.replace(/(http|s):\/\//, '');


/**
 * Création de la base de donnée initial
 * @param done
 */
function wamp (done){
    if(config.server === 'wamp'){
        createVirtualHost();
        createHost();
    }
    done();
}

/**
 * Crée le virtual host
 */
function createVirtualHost(){

    if(proxy.length > 1 ) {
        const dir = "D:/Wamp3/bin/apache/apache2.4.35/conf/extra/";
        const file = "httpd-vhosts.conf";
        const text =  `<VirtualHost *:80>
    ServerName ${proxy}
    ServerAlias ${proxy}
    DocumentRoot "${path.resolve(__dirname, '../' + distDir)}"
    <Directory "${path.resolve(__dirname, '../' + distDir)}">
        Options +Indexes +Includes +FollowSymLinks +MultiViews
        AllowOverride All
        Require local
    </Directory>
</VirtualHost>\n\n`;
        const notification = "Saved Virtual Host!";

        appendFile(dir, file, text, notification);
    }


}

/**
 * Crée dans le fichier host
 */
function createHost(){

    if(proxy.length > 1 ) {
        const dir = "C:/Windows/System32/drivers/etc/";
        const file = "hosts";
        const text = "127.0.0.1 " + proxy + "\n";
        const notification = "Saved Host!";

        appendFile(dir, file, text, notification);
    }

}

/**
 * Vérifie si l'information que l'On veut ajouter existe dans le fichier
 * @param dir
 * @param file
 * @param text
 * @param notification
 */
function appendFile(dir, file, text, notification){

    findInFiles.find(proxy, dir, file)
        .then((results) => {
            let count = 0;
            for(let result in results){
                count = results[result].count;
            }

            if(count == 0 ){

                fs.appendFile(`${dir}/${file}`, text, function (err) {
                    if (err) throw err;
                    console.log(notification);
                });
            }
        })
}


export{ wamp }