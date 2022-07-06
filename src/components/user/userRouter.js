const userRouter = require('express').Router();
const userController = require('./userController');

userRouter.get('/', userController.getAllUsers);
userRouter.get('/:userId', userController.getUserById);
userRouter.post('/', userController.createNewUser);
userRouter.post('/login', userController.loginUser);
userRouter.post('/logout', userController.logoutUser);
userRouter.patch('/:userId', userController.updateUser);
userRouter.delete('/:userId', userController.deleteUser);

module.exports = userRouter;
