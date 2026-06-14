exports.index = async function (req, res) {
    const resposta = {
        nome: 'API VetCare',
        descricao: 'API RESTful para gerenciamento de atendimentos veterinários',
        versao: '1.0',
        tecnologias: ['Node.js', 'Express', 'Sequelize', 'JWT', 'Swagger'],
        status: 'online',
        timestamp: new Date().toLocaleString(),
    };

    res.set('Cache-Control', 'no-store');
    return res.json(resposta);
};
