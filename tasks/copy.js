import {config} from "./config.js";
import {src, dest, lastRun} from 'gulp';
import notify    from 'gulp-notify' //afficher notification



function copy() {
    return src([
        config.theme.src +'/**/*',
        '!'  + config.plugins.src + '/**/*',
        '!'  + config.muplugins.src + '/**/*',
        '!' + config.theme.src + '/{js,js/**,css,css/**,scss,scss/**,img,img/**}'], //Fichier et répertoire à ne pas copier
        {allowEmpty: true, since: lastRun(copy) })

        .pipe(dest(config.theme.dist))
        .pipe(notify({message: 'TASK: Copy completed! 💯', onLast: true}));

}

function copyPlugins() {
    return src(
        config.plugins.src +'/**/*',   {allowEmpty: true, since: lastRun(copyPlugins) })
        .pipe(dest(config.plugins.dist))

        .pipe(src(
            config.muplugins.src +'/**/*', {allowEmpty: true, since: lastRun(copyPlugins) })
        ))
        .pipe(dest(config.muplugins.dist))
        .pipe(notify({message: 'TASK: Copy completed! 💯', onLast: true}));
}



export {
    copy, copyPlugins
}