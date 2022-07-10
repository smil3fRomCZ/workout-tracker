const { validationResult } = require('express-validator');
const { createJwtToken } = require('../../utils/jwt/jwtService');
const UserService = require('./userService');

exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await UserService.getAllUsers();
        return res.status(200).json({ users: users.length, data: users });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

exports.getUserById = async (req, res, next) => {
    const { userId } = req.params;
    try {
        const user = await UserService.getUserById(userId);
        return res.status(200).json({ data: user });
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

exports.updateUser = async (req, res, next) => {
    const userData = req.body;
    const { userId } = req.params;
    try {
        if (userId) {
            for (const userDataKey in userData) {
                if (userData[userDataKey] === '') {
                    return res.status(400).json({
                        error: 'Please provide correct inforamtions to update!',
                    });
                }
            }
            await UserService.updateUser(userId, userData);
            return res
                .status(200)
                .json({ message: 'User updated successfully' });
        }
        return res
            .status(400)
            .json({ message: 'Missing user data or user identification' });
    } catch (error) {
        return res.status(400).json({ error: error.message });
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
