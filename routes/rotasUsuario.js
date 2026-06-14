var express = require('express');
var router = express.Router();
const controllerUsuario = require('../controller/controllerUsuario.js');

router.post('/cadastro', /* #swagger.tags = ['Usuarios']
    #swagger.summary = 'Cadastra um novo usuário'
    #swagger.parameters['body'] = { in: 'body', required: true, schema: { $ref: '#/definitions/NovoUsuario' } }
    #swagger.responses[201] = { description: 'Usuário cadastrado com sucesso', schema: { $ref: '#/definitions/UsuarioCriado' } }
    #swagger.responses[400] = { description: 'Dados inválidos ou usuário já cadastrado' }
*/ controllerUsuario.cadastro);

router.post('/login', /* #swagger.tags = ['Usuarios']
    #swagger.summary = 'Autentica o usuário e retorna um token JWT'
    #swagger.parameters['body'] = { in: 'body', required: true, schema: { $ref: '#/definitions/LoginUsuario' } }
    #swagger.responses[200] = { description: 'Login realizado com sucesso', schema: { $ref: '#/definitions/LoginResposta' } }
    #swagger.responses[400] = { description: 'Usuário e senha são obrigatórios' }
    #swagger.responses[401] = { description: 'Credenciais inválidas' }
*/ controllerUsuario.login);

module.exports = router;
