'use strict';

const homeService = require('../database/db-methods');
const nameProcess = 'home-methods';

let _index = async function (req, res, next) {
    res.setHeader('Content-type', 'application/json');
    let error = '';

    /*if (!(req.params.sistema) || !(req.body) || !(req.body.mensaje) || !(req.body.tipo) || !(req.body.emisor)) {
        error = 'Error: el parametro ' + (!(req.params.sistema) ? 'sistema' : (!(req.body.mensaje) ? 'mensaje' : (!(req.body.tipo) ? 'tipo' : 'emisor'))) + ' no es valido';    
        res.writeHead(400);
        res.end(JSON.stringify(error));
        return;
    }*/

    try {         
        res.writeHead(200);
        res.end("hello world");

    } catch (error) {
        res.writeHead(500);
        res.end(JSON.stringify(error.message));
    }
};

let _user = async function (req, res, next) {
    res.setHeader('Content-type', 'application/json');
    let error = '';

    try {

        let id = req.params.id;

        let dbResult = await homeService.getUser(id);

        res.writeHead(200);
        res.end(dbResult);
    } catch (error) {
        res.writeHead(500);
        res.end(JSON.stringify(error.message));
    }
};

let _login = async function (req, res, next) {
    res.setHeader('Content-type', 'application/json');
    let error = '';

    try {
         let okResult = await homeService.login("admin", "admin");
         let nokResult = await homeService.login("asdads", "asdads");

         let result = { ok: { user: "admin", password: "admin", valid: okResult}
                        ,bad: { user: "asdads", password: "asdads", valid: nokResult} };

        res.writeHead(200);
        res.end(JSON.stringify(result));
    } catch (error) {
        res.writeHead(500);
        res.end(JSON.stringify(error.message));
    }
};
module.exports = {
    index: _index,
    user: _user,
    login: _login
}