const {User} = require('../models'); 
const bcrypt = require('bcrypt');
const {createToken, verifyToken} = require('../services/tokenService');

module.exports.registrationUser = async (req, res, next) => {
    try {
        const {body, passwordHash} = req;
        console.log(body);
        const createdUser = await User.create({...body, passwordHash});
        delete createdUser.passwordHash;
        res.status(201).send({data: createdUser});
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

                // res.status(200).send({data: foundUser})
            } 
             } catch(error) {
                next(error);
            }

}

module.exports.checkToken = async(req, res, next) => {
    try {
        const {params: {token}} = req;
        const result = await verifyToken(token);
        console.log(result);
    } catch(error) {
        next(error);
    }
}