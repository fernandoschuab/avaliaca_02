var express = require('express');
var router = express.Router();
const controllerIndex = require('../controller/controllerIndex.js');

router.get('/', /* #swagger.tags = ['Index']
    #swagger.summary = 'Informações sobre o serviço'
    #swagger.description = 'Retorna informações gerais sobre a API VetCare'
    #swagger.responses[200] = { description: 'Informações do serviço retornadas com sucesso' }
*/ controllerIndex.index);

module.exports = router;
