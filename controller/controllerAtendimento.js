const { Atendimento, Pet } = require('../model/modelos.js');

exports.cadastrar = async function (req, res) {
    const dados = {
        pet_id: req.body.pet_id,
        usuario_id: req.body.usuario_id,
        data_hora: req.body.data_hora,
        motivo: req.body.motivo,
    };

    const errors = [];

    if (!dados.pet_id) {
        errors.push({ msg: 'Pet é obrigatório' });
    }

    if (!dados.usuario_id) {
        errors.push({ msg: 'Usuário é obrigatório' });
    }

    if (!dados.data_hora || dados.data_hora.trim() === '') {
        errors.push({ msg: 'Data e hora são obrigatórias' });
    }

    if (!dados.motivo || dados.motivo.trim() === '') {
        errors.push({ msg: 'Motivo é obrigatório' });
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    try {
        const atendimento = await Atendimento.create(dados);
        return res.status(201).json(atendimento);
    } catch (error) {
        console.error('Erro ao cadastrar atendimento:', error);
        return res.status(500).json({ errors: [{ msg: 'Erro ao cadastrar atendimento' }] });
    }
};

exports.consultarPorId = async function (req, res) {
    const id = Number(req.params.id);

    if (!id || Number.isNaN(id) || !Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ errors: [{ msg: 'ID inválido' }] });
    }

    try {
        const atendimento = await Atendimento.findByPk(id, {
            include: [{ model: Pet, as: 'Pet' }],
        });

        if (!atendimento) {
            return res.status(404).json({ errors: [{ msg: 'Atendimento não encontrado' }] });
        }

        res.set('Cache-Control', 'private, max-age=86400, must-revalidate');
        return res.status(200).json(atendimento);
    } catch (error) {
        console.error('Erro ao consultar atendimento:', error);
        return res.status(500).json({ errors: [{ msg: 'Erro ao consultar atendimento' }] });
    }
};

exports.iniciar = async function (req, res) {
    const id = Number(req.params.id);

    if (!id || Number.isNaN(id) || !Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ errors: [{ msg: 'ID inválido' }] });
    }

    try {
        const atendimento = await Atendimento.findByPk(id);

        if (!atendimento) {
            return res.status(404).json({ errors: [{ msg: 'Atendimento não encontrado' }] });
        }

        if (atendimento.status === 'em_atendimento') {
            return res.status(400).json({ error: 'Atendimento já está com este status' });
        }

        await atendimento.update({ status: 'em_atendimento' });
        return res.status(200).json(atendimento);
    } catch (error) {
        console.error('Erro ao iniciar atendimento:', error);
        return res.status(500).json({ errors: [{ msg: 'Erro ao iniciar atendimento' }] });
    }
};

exports.finalizar = async function (req, res) {
    const id = Number(req.params.id);

    if (!id || Number.isNaN(id) || !Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ errors: [{ msg: 'ID inválido' }] });
    }

    try {
        const atendimento = await Atendimento.findByPk(id);

        if (!atendimento) {
            return res.status(404).json({ errors: [{ msg: 'Atendimento não encontrado' }] });
        }

        if (atendimento.status === 'finalizado') {
            return res.status(400).json({ error: 'Atendimento já está com este status' });
        }

        await atendimento.update({ status: 'finalizado' });
        return res.status(200).json(atendimento);
    } catch (error) {
        console.error('Erro ao finalizar atendimento:', error);
        return res.status(500).json({ errors: [{ msg: 'Erro ao finalizar atendimento' }] });
    }
};
