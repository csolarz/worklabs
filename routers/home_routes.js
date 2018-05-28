'use strict';
const restify = require('restify');
const Router = require('restify-router').Router;  
const router = new Router();
var methods = require('../src/home-methods');

router.get('/user/:id', restify.plugins.conditionalHandler([
    {version: ['1.0.0'], handler: methods.user}]));

router.get('/index', restify.plugins.conditionalHandler([
    {version: ['1.0.0'], handler: methods.index}]));

router.get('/test-login', restify.plugins.conditionalHandler([
    {version: ['1.0.0'], handler: methods.login}]));

module.exports = router;