const {User} = require('../models'); 
const bcrypt = require('bcrypt');
const {createToken, verifyToken} = require('../services/tokenService');

module.exports.registrationUser = async (req, res, next) => {
    try {
        const {body, passwordHash} = req;
        console.log(body);
        const createdUser = await User.create({...body, passwordHash});
        res.status(200).send({data: createdUser, tokens: {token}})
    } catch(error) {
        next(error);
    }
}


module.exports.loginUser = async (req, res, next) => {
        try {
            const {body, passwordHash} = req;
            const foundUser = await User.findOne({
                email: body.email
            });
            if (foundUser) {
                const result = await bcrypt.compare(passwordHash, foundUser.passwordHash);
                const token = await createToken({userId: foundUser._id, email: foundUser.email});
                console.log(token);

                 res.status(200).send({data: foundUser, tokens: {token}})
            } 
             } catch(error) {
                next(error);
            }

}

module.exports.checkToken = async(req, res, next) => {
    try {
        const {tokenPayload: {email}}= req;
        const foundUser = await User.findOne({
            email: payload.email
        });
        res.status(200).send({data: foundUser});
    } catch(error) {
        next(error);
    }
}