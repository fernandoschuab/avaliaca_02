require('dotenv').config();

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var swagger = require('swagger-ui-express');
var swagger_saida = require('./config/swagger_output.json');
var { passport } = require('./config/passport');
var configuracaoHelmet = require('./config/helmet');

require('./model/modelos.js');

var rotasIndex = require('./routes/rotasIndex');
var rotasUsuario = require('./routes/rotasUsuario');
var rotasPet = require('./routes/rotasPet');
var rotasAtendimento = require('./routes/rotasAtendimento');

var app = express();

app.use(configuracaoHelmet(process.env.ENV === 'prod'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());

app.use('/api-docs', swagger.serve, swagger.setup(swagger_saida));

app.use('/', rotasIndex);
app.use('/api/usuarios', rotasUsuario);
app.use('/api/pets', rotasPet);
app.use('/api/atendimentos', rotasAtendimento);

module.exports = app;
