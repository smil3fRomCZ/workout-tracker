const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET_KEY;

exports.authentificateUser = (req, res, next) => {
    const token = req.cookies.jwt || null;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    jwt.verify(token, SECRET_KEY, (error, decodedToken) => {
        req.user = error ? null : decodedToken;
        next();
    });
};
