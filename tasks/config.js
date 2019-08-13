const basePath = './'; //là ou se situe le fichier gulp
const srcDir = 'src';
const distDir = 'www';

const config = {

    name: 'theme2019', //sans espace ni de caractère accentué
    proxy: 'http://dev.start/', //Url local, laisser vide si désire l'utiliser sans sous-domaine ex.: http://dev.test/
    type: 'wp',  //Valeur possible : wp, laravel, html, react

    css: {
        src: basePath + srcDir + '/scss',
        dist: basePath + distDir + '/css',
    },
    img: {
        src: basePath + srcDir + '/img',
        dist: basePath + distDir + '/img',
        quality: 60,
    },
    js: {
        src: basePath + srcDir + '/js',
        dist: basePath + distDir + '/js',
        mainFile: 'app',
    },
    theme: {
        src: basePath + srcDir + '/',
        dist: basePath + distDir,
    },

};


const themeWP = basePath + distDir + '/wp-content/themes/' + config.name; //à modifier si le chemin wordpress change
const uploadWP = basePath + distDir + '/wp-content/uploads/'; //à modifier si le chemin wordpress change

switch (config.type) {
    case 'wp':
        config.css.dist = themeWP;
        config.js.dist = themeWP + '/js';
        config.img.dist = themeWP + '/img';
        config.theme.dist = themeWP;
        break;
    case 'laravel':
        //src
        config.css.src = basePath + 'resources/assets/scss';
        config.js.src = basePath + 'resources/assets/js';
        config.img.src = basePath + 'resources/assets/img';

        //dist
        config.css.dist = basePath + 'public/css';
        config.js.dist = basePath + 'public/js';
        config.img.dist = basePath + 'public/img';
        config.theme.dist = basePath + 'public';
        break;
    case 'react':
        break;
    case 'html':
        break;

    default:
        break;
}

export {
    basePath, srcDir, distDir, config, themeWP,  uploadWP
}