const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET_KEY;
const TOKEN_EXPIRATION = process.env.JWT_TOKEN_EXPIRATION;

exports.createJwtToken = (userData) => {
    return jwt.sign(userData, SECRET_KEY, {
        expiresIn: TOKEN_EXPIRATION,
    });
};

