var express = require('express');
var router = express.Router();
const controllerPet = require('../controller/controllerPet.js');

router.post('/', /* #swagger.tags = ['Pets']
    #swagger.summary = 'Cadastra um novo pet'
    #swagger.security = [{ BearerAuth: [] }]
    #swagger.parameters['body'] = { in: 'body', required: true, schema: { $ref: '#/definitions/NovoPet' } }
    #swagger.responses[201] = { description: 'Pet cadastrado com sucesso', schema: { $ref: '#/definitions/Pet' } }
    #swagger.responses[400] = { description: 'Dados inválidos' }
    #swagger.responses[401] = { description: 'Não autenticado' }
    #swagger.responses[403] = { description: 'Acesso negado' }
*/ controllerPet.cadastrar);

router.get('/', /* #swagger.tags = ['Pets']
    #swagger.summary = 'Lista todos os pets'
    #swagger.security = [{ BearerAuth: [] }]
    #swagger.parameters['especie'] = { in: 'query', description: 'Filtrar por espécie', type: 'string' }
    #swagger.responses[200] = { description: 'Lista de pets retornada com sucesso', schema: [{ $ref: '#/definitions/Pet' }] }
    #swagger.responses[401] = { description: 'Não autenticado' }
    #swagger.responses[403] = { description: 'Acesso negado' }
*/ controllerPet.listar);

module.exports = router;
