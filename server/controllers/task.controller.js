const {Task} = require('../models');

module.exports.getAllUserTasks = async (req, res, next) => {
    try {
        const {params: {userId}}= req;
        const userTask = await Task.find({
            authorId: userId
        })
    } catch (error) {
        next(error);
    }
}


module.exports.createUserTask = async (req, res, next) => {
    try {
        const {body}= req;
       const task = await Task.create(body);
       res.status(201).send(task);
    } catch (error) {
        next(error);
    }
}