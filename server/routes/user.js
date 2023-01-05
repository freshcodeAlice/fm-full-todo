const Router = require('express');
const UserController = require('../controllers/user.controller');

const userRouter = Router();

userRouter.post('/registration', UserController.registrationUser); //register
userRouter.post('/login', UserController.loginUser); //login


module.exports = userRouter;




