var express = require('express');
var router = express.Router();
const controllerIndex = require('../controller/controllerIndex.js');

router.get('/', controllerIndex.index);

module.exports = router;
