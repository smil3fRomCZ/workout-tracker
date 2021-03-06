const userRouter = require('express').Router();
const { body } = require('express-validator');
const {
    authentificateUser,
} = require('../../middleware/authentificateMiddleware');

const userController = require('./userController');

userRouter.get('/', userController.getAllUsers);
userRouter.get('/:userId', userController.getUserById);
userRouter.get(
    '/confirm-account/:registrationHash',
    userController.confirmUserAccount
);
userRouter.post(
    '/',
    body('email').isEmail(),
    body('password').isLength({ min: 8 }),
    body('firstName').not().isEmpty(),
    body('lastName').not().isEmpty(),
    body('nickName').not().isEmpty().isLength({ min: 5 }),
    userController.createNewUser
);
userRouter.post(
    '/login',
    body('email').isEmail(),
    body('password').isLength({ min: 8 }),
    userController.loginUser
);
userRouter.post(
    '/reset-password',
    body('email').not().isEmpty(),
    body('email').isEmail(),
    userController.resetUserPassword
);
userRouter.post('/logout', userController.logoutUser);
userRouter.patch('/:userId', authentificateUser, userController.updateUser);
userRouter.delete('/', authentificateUser, userController.deleteUser);

module.exports = userRouter;
