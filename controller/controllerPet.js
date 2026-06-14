const { Pet } = require('../model/modelos.js');

exports.cadastrar = async function (req, res) {
    const dados = {
        nome: req.body.nome,
        especie: req.body.especie,
    };

    const errors = [];

    if (!dados.nome || dados.nome.trim() === '') {
        errors.push({ msg: 'Nome é obrigatório' });
    }

    if (!dados.especie || dados.especie.trim() === '') {
        errors.push({ msg: 'Espécie é obrigatória' });
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    try {
        const pet = await Pet.create(dados);
        return res.status(201).json(pet);
    } catch (error) {
        console.error('Erro ao cadastrar pet:', error);
        return res.status(500).json({ errors: [{ msg: 'Erro ao cadastrar pet' }] });
    }
};

exports.listar = async function (req, res) {
    const filtro = {};

    if (req.query.especie) {
        if (req.query.especie.trim() === '') {
            return res.status(400).json({ errors: [{ msg: 'Parâmetro espécie inválido' }] });
        }
        filtro.especie = req.query.especie;
    }

    try {
        const pets = await Pet.findAll({ where: filtro });
        res.set('Cache-Control', 'public, max-age=15552000, must-revalidate');
        return res.status(200).json(pets);
    } catch (error) {
        console.error('Erro ao listar pets:', error);
        return res.status(500).json({ errors: [{ msg: 'Erro ao listar pets' }] });
    }
};
