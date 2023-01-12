const {promisify} = require('util');
const jwt = require('jsonwebtoken');

const promisifyJWTSign = promisify(jwt.sign);
const promisifyJWTVerify = promisify(jwt.verify);

const ACCESS_EXPIRES_TIME = 60;
const REFRESH_EXPIRES_TIME = 60*60;

const ACCESS_SECRET = 'qwerty';
const REFRESH_SECRET = 'ytrewq';

module.exports.createAccessToken = async ({userId, email}) => 
        await promisifyJWTSign({userId, email}, ACCESS_SECRET, {
                    expiresIn: ACCESS_EXPIRES_TIME
                        });

module.exports.verifyAccessToken = async (token) => await promisifyJWTVerify(token, ACCESS_SECRET);

module.exports.createRefreshToken = async ({userId, email}) => 
        await promisifyJWTSign({userId, email}, REFRESH_SECRET, {
                     expiresIn: REFRESH_EXPIRES_TIME
                      });

module.exports.verifyRefreshToken = async (token) => await promisifyJWTVerify(token, REFRESH_SECRET);