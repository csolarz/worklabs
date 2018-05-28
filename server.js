// Versión 1.0.0.0
'use strict';
require('dotenv').config({ path: 'env.env' });
const autorization = require('./common/autorization');
const moment = require('moment');
const API_MIN_VERSION = '1.0.0';
const API_CURRENT_VERSION = '1.0.0';

// Restify server setup
const restify = require('restify');
const restify_errors = require('restify-errors');
const server = restify.createServer({
	name : "WorkLabs Api v:" + API_CURRENT_VERSION,
	acceptable: 'application/json',
	versions: [API_MIN_VERSION, API_CURRENT_VERSION],
	version: API_CURRENT_VERSION,
	rejectUnauthorized: true,
	ignoreTrailingSlash: true
});

const home_routes = require('./routers/home_routes');

// Configure server routing
home_routes.applyRoutes(server, '/api/home');

// Server behaviour configuration
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());
server.use(restify.plugins.gzipResponse());
server.use(restify.plugins.throttle({
	burst: 100,
	rate: 50, 
	ip: true
}));


// Authorization middleware
server.use(function authenticate(req, res, next) {
	// TODO: Validate as appropriate...
	return next();

	if (req.header('Authorization')) {
		let keyAutorization = req.header('Authorization');
		let ipAddress = req.connection.remoteAddress;
		let autorizado = autorization.check(ipAddress, keyAutorization);
		
		if (autorizado){
			return next();
		}else{
			console.log('Acceso no autorizado de la direccion IP ' + ipAddress);
			res.send(new restify_errors.UnauthorizedError('Acceso no autorizado'));	
		}
	} else {
		console.log('Acceso no autorizado de la direccion IP ' + ipAddress);
		res.send(new restify_errors.UnauthorizedError('Acceso no autorizado'));	
	}
});

// Server events
server.on('VersionNotAllowed', function (req, res, callback) {
	console.log({name: 'Versión inválida de API solicitada', properties: {requestedVersion: req.headers['accept-version']}});
	var err = new restify_errors.BadRequestError('Versión no soportada (%s)', req.headers['accept-version']);

	res.send(err);
});

server.on('uncaughtException', function(req, res, route, err) {
	var err = new restify_errors.InternalServerError('Error inesperado (\'%s\') en ruta \'%s\'', err, route);
	res.send(err);
});

var port = process.env.PORT || 3000;

server.listen(port,() => {	
	console.log({name: "Server startup", properties: {version: server.version, date: moment.utc().format()}});
})

