const {User, RefreshToken} = require('../models'); 
const RefreshTokenError = require('../errors/RefreshTokenError');
const bcrypt = require('bcrypt');
const {createAccessToken, verifyAccessToken, createRefreshToken, verifyRefreshToken} = require('../services/tokenService');

module.exports.registrationUser = async (req, res, next) => {
    try {
        const {body, passwordHash} = req;
        console.log(body);
        const createdUser = await User.create({...body, passwordHash});
        const token = await createAccessToken({userId: foundUser._id, email: foundUser.email});
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
                // console.log(result);
                // if(result) {
                    const accessToken = await createAccessToken({userId: foundUser._id, email: foundUser.email});
                    const refreshToken = await createRefreshToken({userId: foundUser._id, email: foundUser.email});
                        //TODO: add RT to DataBase

                    const addedToken = await RefreshToken.create({
                                            token: refreshToken, 
                                            userId: foundUser._id});
                        //TODO: check if creating successfull
                        // TODO: check, how much tokens is already use
                    res.status(200).send({data: foundUser, tokens: {accessToken, refreshToken}})
                // } else {
                //     res.status(400).send({error: 'Invalid credentials'});
                // }
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

    const {body, body: {refreshToken}} = req;
    let verifyResult;
    try {
        verifyResult = await verifyRefreshToken(refreshToken);
    } catch(err) {
       next(new RefreshTokenError('Invalid refresh token'));        
    }
    try {
    if (verifyResult) {
        const foundUser = await User.findOne({email: verifyResult.email});      
        const rTFromDB = await RefreshToken.findOne({$and: [{token: refreshToken}, {userId: foundUser._id}]});
        if(rTFromDB) {
            const removeResult = await rTFromDB.remove();
             const newAccessToken = await createAccessToken({userId: foundUser._id, email: foundUser.email});
             const newRefreshToken = await createRefreshToken({userId: foundUser._id, email: foundUser.email});
            const addedToken = await RefreshToken.create({
                                            token: refreshToken, 
                                            userId: foundUser._id});  
                                            
         res.status(200).send({tokens: {accessToken: newAccessToken,
                                refreshToken: newRefreshToken}});
        }

        
    }
    } catch(error) {
        next(error)
    }
}