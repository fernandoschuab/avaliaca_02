var express = require('express');
var router = express.Router();
const controllerAtendimento = require('../controller/controllerAtendimento.js');

router.post('/', controllerAtendimento.cadastrar);
router.get('/:id', controllerAtendimento.consultarPorId);
router.patch('/:id/iniciar', controllerAtendimento.iniciar);
router.patch('/:id/finalizar', controllerAtendimento.finalizar);

module.exports = router;
