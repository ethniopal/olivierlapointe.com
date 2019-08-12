import {src, dest} from 'gulp'
import del from 'del'



/**
 * Permet d'effacer le fichier dist, si c'est l'initialisation du proejt supprime aussi le contenu du répertoire src
 * @returns {*}
 */
function cleanDist() {
    return del('./www/*');
}


/**
 * Supprime les fichiers src qu'il y avait
 *
 * @returns {Promise<string[]> | never}
 */
function cleanInit() {
    return del(
        './src/*'
    );
}


/**
 * Génère les répertoires à l'intérieurs de src
 * @returns {*}
 */
function generateSrcDirectory() {
    return src('*.*', {read: false})
        .pipe(dest('./src/css'))
        .pipe(dest( './src/img'))
        .pipe(dest( './src/js'))
        .pipe(dest( './src/js/modules'))
        .pipe(dest( './src/fonts'))
        .pipe(dest( './www/'))
        .pipe(dest( './docs/'))
        .pipe(dest( './templates/'))
}



export {
    generateSrcDirectory,
    cleanDist,
    cleanInit
}