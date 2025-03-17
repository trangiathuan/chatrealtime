const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({
            EC: -1,
            Status: 'failed',
            Message: 'Access denied. No token provided.'
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.SecretKey);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).json({
            EC: -1,
            Status: 'failed',
            Message: 'Invalid Token'
        });
    }
};
module.exports = auth;