import {src, dest} from 'gulp';
import notify    from 'gulp-notify' //afficher notification



function copy() {

    return src([
        './src/**/*',
        '!./src/js/**/*',
        '!./src/css/**/*',
        '!./src/img/**/*'], {allowEmpty: true, since: lastRun(copy) })

        .pipe(dest('./www/'))
        .pipe(notify({message: 'TASK: Copy completed! 💯', onLast: true}));


}

export {
    copy
}