import {connDB, basePath, distDir} from "./config.js";
import {src, dest}  from 'gulp';

import fs     from "fs";
import mysql  from 'mysql';
import notify from 'gulp-notify'

/**
 * Création de la base de donnée initial
 * @param done
 */
function createDB (done){
    const fileContent = fs.readFileSync("./dumbfile.sql", "utf8");

    const con = mysql.createConnection({
        host: connDB.host,
        user: connDB.user,
        password: connDB.pass
    });

    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        con.query(fileContent, function (err, result) {
            if (err) throw err;
            console.log("Database created");
        });
    });

    done();
}

export{ createDB }