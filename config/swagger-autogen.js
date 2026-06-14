const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'VetCare API',
        version: '1.0.0',
        description: 'API RESTful para gerenciamento de pets e atendimentos veterinários com autenticação JWT',
    },
    host: 'localhost:3000',
    schemes: ['http'],
    securityDefinitions: {
        BearerAuth: {
            type: 'apiKey',
            in: 'header',
            name: 'Authorization',
            description: 'Informe o token JWT no formato: Bearer <token>',
        },
    },
    definitions: {
        NovoUsuario: {
            nome: 'Admin',
            usuario: 'admin',
            senha: 'senha123',
            perfil: 'admin',
        },
        UsuarioCriado: {
            id: 1,
            nome: 'Admin',
            usuario: 'admin',
            perfil: 'admin',
        },
        LoginUsuario: {
            usuario: 'admin',
            senha: 'senha123',
        },
        LoginResposta: {
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
            usuario: {
                id: 1,
                nome: 'Admin',
                usuario: 'admin',
                perfil: 'admin',
            },
        },
        NovoPet: {
            nome: 'Spike',
            especie: 'cachorro',
        },
        Pet: {
            id: 1,
            nome: 'Spike',
            especie: 'cachorro',
            criada_em: '2026-06-12T01:35:18.586Z',
            atualizada_em: '2026-06-12T01:35:18.586Z',
        },
        NovoAtendimento: {
            pet_id: 1,
            data_hora: '2026-06-11T14:30:00.000Z',
            motivo: 'Consulta de rotina e vacinação',
        },
        Atendimento: {
            id: 1,
            data_hora: '2026-06-11T14:30:00.000Z',
            motivo: 'Consulta de rotina e vacinação',
            status: 'agendado',
            pet_id: 1,
            usuario_id: 1,
            criada_em: '2026-06-12T01:45:19.000Z',
            atualizada_em: '2026-06-12T01:45:19.000Z',
        },
    },
};

const arquivo_saida = './config/swagger_output.json';
const arquivo_rotas = ['./app.js'];

swaggerAutogen(arquivo_saida, arquivo_rotas, doc);
