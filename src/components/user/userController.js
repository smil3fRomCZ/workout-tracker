const { validationResult } = require('express-validator');
const { createJwtToken } = require('../../utils/jwt/jwtService');
const UserService = require('./userService');

exports.getAllUsers = (req, res, next) => {
    try {
        return res.status(200).json({ message: 'Get all users' });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

exports.getUserById = (req, res, next) => {
    try {
        return res.status(200).json({ message: 'Get user by id' });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

exports.createNewUser = async (req, res, next) => {
    const validationError = validationResult(req);
    let userRegistrationData;
    if (validationError.isEmpty()) {
        userRegistrationData = req.body;
    } else {
        const error = validationError.array({ onlyFirstError: false });
        if (error.length === 1) {
            return res.status(400).json({ error: error[0].msg });
        }
        return res.status(400).json({ error: error });
    }
    try {
        await UserService.createNewUser(userRegistrationData);
        return res.status(200).json({
            message: 'User registration created successfully',
        });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

exports.loginUser = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const userData = await UserService.userLogin(email, password);
        const jwtToken = createJwtToken(userData);
        res.cookie('jwt', jwtToken, {
            httpOnly: true,
            maxAge: process.env.JWT_TOKEN_EXPIRATION,
        });
        return res.status(200).json({ message: 'User logged successfully' });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

exports.updateUser = (req, res, next) => {
    try {
        return res.status(200).json({ message: 'Update user' });
    } catch (error) {
        return res.status(400).json({ error });
    }
};

exports.logoutUser = (req, res, next) => {
    try {
        return res.status(200).json({ message: 'Logout user' });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

exports.deleteUser = (req, res, next) => {
    try {
        return res.status(200).json({ message: 'Delete user' });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

exports.resetUserPassword = (req, res, next) => {
    try {
        return res.status(200).json({ message: 'Reset user password' });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

exports.confirmUserAccount = async (req, res, next) => {
    const { registrationHash } = req.params;
    let isConfirmationComplete;
    try {
        if (registrationHash) {
            isConfirmationComplete = await UserService.confirmUserAccount(
                registrationHash
            );
            if (isConfirmationComplete) {
                return res
                    .status(200)
                    .json({ message: 'Account activated successfully' });
            }
            return res.status(401).json({
                message:
                    'Wrong activation link! Please create new registration',
            });
        }
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};
