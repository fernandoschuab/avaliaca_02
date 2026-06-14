var express = require('express');
var router = express.Router();
const controllerAtendimento = require('../controller/controllerAtendimento.js');

router.post('/', /* #swagger.tags = ['Atendimentos']
    #swagger.summary = 'Cadastra um novo atendimento'
    #swagger.security = [{ BearerAuth: [] }]
    #swagger.parameters['body'] = { in: 'body', required: true, schema: { $ref: '#/definitions/NovoAtendimento' } }
    #swagger.responses[201] = { description: 'Atendimento cadastrado com sucesso', schema: { $ref: '#/definitions/Atendimento' } }
    #swagger.responses[400] = { description: 'Dados inválidos' }
    #swagger.responses[401] = { description: 'Não autenticado' }
    #swagger.responses[403] = { description: 'Acesso negado' }
*/ controllerAtendimento.cadastrar);

router.get('/:id', /* #swagger.tags = ['Atendimentos']
    #swagger.summary = 'Consulta atendimento por ID'
    #swagger.security = [{ BearerAuth: [] }]
    #swagger.parameters['id'] = { in: 'path', required: true, type: 'integer', description: 'ID do atendimento' }
    #swagger.responses[200] = { description: 'Atendimento retornado com sucesso', schema: { $ref: '#/definitions/Atendimento' } }
    #swagger.responses[400] = { description: 'ID inválido' }
    #swagger.responses[401] = { description: 'Não autenticado' }
    #swagger.responses[403] = { description: 'Acesso negado' }
    #swagger.responses[404] = { description: 'Atendimento não encontrado' }
*/ controllerAtendimento.consultarPorId);

router.patch('/:id/iniciar', /* #swagger.tags = ['Atendimentos']
    #swagger.summary = 'Inicia um atendimento'
    #swagger.security = [{ BearerAuth: [] }]
    #swagger.parameters['id'] = { in: 'path', required: true, type: 'integer', description: 'ID do atendimento' }
    #swagger.responses[200] = { description: 'Atendimento iniciado com sucesso', schema: { $ref: '#/definitions/Atendimento' } }
    #swagger.responses[400] = { description: 'ID inválido ou atendimento já iniciado' }
    #swagger.responses[401] = { description: 'Não autenticado' }
    #swagger.responses[403] = { description: 'Acesso negado' }
    #swagger.responses[404] = { description: 'Atendimento não encontrado' }
*/ controllerAtendimento.iniciar);

router.patch('/:id/finalizar', /* #swagger.tags = ['Atendimentos']
    #swagger.summary = 'Finaliza um atendimento'
    #swagger.security = [{ BearerAuth: [] }]
    #swagger.parameters['id'] = { in: 'path', required: true, type: 'integer', description: 'ID do atendimento' }
    #swagger.responses[200] = { description: 'Atendimento finalizado com sucesso', schema: { $ref: '#/definitions/Atendimento' } }
    #swagger.responses[400] = { description: 'ID inválido ou atendimento já finalizado' }
    #swagger.responses[401] = { description: 'Não autenticado' }
    #swagger.responses[403] = { description: 'Acesso negado' }
    #swagger.responses[404] = { description: 'Atendimento não encontrado' }
*/ controllerAtendimento.finalizar);

module.exports = router;
