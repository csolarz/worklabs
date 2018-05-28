'use strict';
const sql = require('mssql');

 let config = {
     user: '',
     password: '',
     server: '.database.windows.net',
     database: 'worklabs',
     options: {
         encrypt: true
       }
 };

async function getUser(id){
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
                                .input('id', sql.Int, id)
                                .query('select * from dbo.USUARIO where id = @id');

        sql.close();

        return JSON.stringify(result.recordset);

    } catch (err) {
        console.log("error: " + err);
        sql.close();
    }
}
async function login(user, password){
    try {
        let isValid = 0;
        let error = 0;
        let errorDesc = '';

        let pool = await sql.connect(config);

        let result = await pool.request()
                                .input('USERNAME', sql.VarChar(50), user)
                                .input('PASSWORD', sql.VarChar(50), password)
                                .output('IS_VALID', sql.Int)
                                .output('ERROR', sql.Int)
                                .output('DESCRIPCION_ERROR', sql.VarChar(255))
                                .execute('SP_LOGIN');

        sql.close();

        return result.output.IS_VALID;

    } catch (err) {
        console.log("error: " + err);
        sql.close();
    }
}

 sql.on('error', err => {
    //TODO sql error handler
    console.log('sql error handler');
    console.dir(err);
 });

 exports.getUser = getUser;
 exports.login = login;