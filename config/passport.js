const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const { Usuario } = require('../model/modelos');

const JWT_SECRET = process.env.JWT_SECRET;

const opcoes = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET,
};

passport.use(
    new JwtStrategy(opcoes, async (jwt_payload, done) => {
        try {
            const usuario = await Usuario.findByPk(jwt_payload.id);
            if (!usuario) {
                return done(null, false);
            }
            return done(null, usuario);
        } catch (error) {
            return done(error);
        }
    })
);

module.exports = { passport, JWT_SECRET };
