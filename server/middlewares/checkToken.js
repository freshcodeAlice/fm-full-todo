const {verifyAccessToken} = require('../services/tokenService');

module.exports.checkToken = async (req, res, next) => {
        try {
            const {headers: {authorization}} = req;
            const [, token] = authorization.split(' ');
            const payload = await verifyAccessToken(token);
            req.tokenPayload = payload;
            next();
        } catch(error) {
            next(error);
        }
}