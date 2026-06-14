var express = require('express');
var router = express.Router();
const controllerPet = require('../controller/controllerPet.js');

router.post('/', controllerPet.cadastrar);
router.get('/', controllerPet.listar);

module.exports = router;
