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
                 res.status(200).send({data: foundUser, tokens: {token}})
            } 
             } catch(error) {
                next(error);
            }

}

module.exports.checkAuth = async(req, res, next) => {
    try {
        const {tokenPayload: {email}}= req;
        const foundUser = await User.findOne({
            email: email
        });
        res.status(200).send({data: foundUser});
    } catch(error) {
        next(error);
    }
}


module.exports.refreshSession = async (req, res, next) => {
    /*
     AccessToken - живе мало, багаторазовий, саме з ним ми робимо всі запити
    RefreshToken - живе довго, але він одноразовий


    1. Приходить запит з аксесс-токеном
        - АТ валідний, працюємо 
        - АТ невалідний (прострочився)
            1. Відповідаємо певним кодом помилки
            2. У відповідь на цю помилку, фронт надсилає РТ.
                - якщо цей Р-токен - валідний, то ми "рефрешимо" всю сессію - видаємо нову пару токенів (АТ, РТ)
                - якщо РТ невалідний, то перенаправляємо користувача на авторизацію

    */
}