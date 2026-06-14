const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Usuario } = require('../model/modelos.js');
const { JWT_SECRET } = require('../config/passport');

exports.cadastro = async function (req, res) {
    const dados = {
        nome: req.body.nome,
        usuario: req.body.usuario,
        senha: req.body.senha,
        perfil: req.body.perfil,
    };

    const errors = [];

    if (!dados.nome || dados.nome.trim() === '') {
        errors.push({ msg: 'Nome é obrigatório' });
    }

    if (!dados.usuario || dados.usuario.trim() === '') {
        errors.push({ msg: 'Usuário é obrigatório' });
    }

    if (!dados.senha || dados.senha.length < 6) {
        errors.push({ msg: 'Senha deve ter no mínimo 6 caracteres' });
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    try {
        const existe = await Usuario.findOne({ where: { usuario: dados.usuario } });
        if (existe) {
            return res.status(400).json({ errors: [{ msg: 'Já existe um usuário cadastrado com este identificador' }] });
        }

        const senha_hash = await bcrypt.hash(dados.senha, 10);

        const novo_usuario = await Usuario.create({
            nome: dados.nome,
            usuario: dados.usuario,
            senha_hash,
            perfil: dados.perfil || 'recepcao',
        });

        return res.status(201).json({
            id: novo_usuario.id,
            nome: novo_usuario.nome,
            usuario: novo_usuario.usuario,
            perfil: novo_usuario.perfil,
        });
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        return res.status(500).json({ errors: [{ msg: 'Erro ao cadastrar usuário' }] });
    }
};

exports.login = async function (req, res) {
    const usuario_informado = req.body.usuario;
    const senha = req.body.senha;

    if (!usuario_informado || !senha) {
        return res.status(400).json({ errors: [{ msg: 'Usuário e senha são obrigatórios' }] });
    }

    try {
        const usuario = await Usuario.findOne({ where: { usuario: usuario_informado } });
        if (!usuario) {
            return res.status(401).json({ errors: [{ msg: 'Credenciais inválidas' }] });
        }

        const senha_valida = await bcrypt.compare(senha, usuario.senha_hash);
        if (!senha_valida) {
            return res.status(401).json({ errors: [{ msg: 'Credenciais inválidas' }] });
        }

        const token = jwt.sign(
            { id: usuario.id, perfil: usuario.perfil },
            JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRATION || '1h' }
        );

        return res.status(200).json({
            token,
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                usuario: usuario.usuario,
                perfil: usuario.perfil,
            },
        });
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        return res.status(500).json({ errors: [{ msg: 'Erro ao fazer login' }] });
    }
};
