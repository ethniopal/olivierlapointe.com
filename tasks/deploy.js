import {ftp, basePath, srcDir, distDir} from "./config.js";
import {src}    from 'gulp';

import vinylFTP from 'vinyl-ftp';
import notify   from 'gulp-notify'


/**
 * Mise en place sur le ftp
 * @returns {*}
 */
function uploadFTP() {

    const conn = vinylFTP.create({
        host: ftp.host,
        user: ftp.user,
        password: ftp.pass,
        parallel: 4,
        secure: true,
        secureOptions: {rejectUnauthorized: false}
    });

    const globs = [
        distDir + '/**/*',
        '!node_modules',
        '!node_modules/**'
    ];

    return src(globs, {base: basePath, buffer: false})
        .pipe(conn.dest(ftp.dir))
        .pipe(notify({message: 'TASK: FTP completed! 💯'}))


}

export {
    uploadFTP
}