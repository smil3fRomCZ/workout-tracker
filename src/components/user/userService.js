const bcrypt = require('bcrypt');
const crypto = require('crypto');
const sendRegistrationEmail = require('../../utils/emailSender/emailSender');
const User = require('./userModel');

class UserService {
    // Internal helper methods
    static #hashPassword = (password) => {
        return bcrypt.hash(password, 12);
    };

    static #compareUserPasswords = async (userTypedPassword, userEmail) => {
        const user = await User.findOne({ where: { email: userEmail } });
        if (user) {
            return bcrypt.compare(userTypedPassword, user.password);
        }
        return false;
    };

    static #createRegistrationLinkHash = () =>
        crypto.randomBytes(12).toString('hex');

    // Main methods for user controller
    static createNewUser = async (userRegistrationData) => {
        const { password } = userRegistrationData;
        const hashedPassword = await this.#hashPassword(password);
        const updatedRegistrationData = { ...userRegistrationData };
        updatedRegistrationData.password = hashedPassword;
        updatedRegistrationData.registrationHash =
            this.#createRegistrationLinkHash();
        try {
            const createdUser = await User.create(updatedRegistrationData);
            await sendRegistrationEmail(
                createdUser.email,
                createdUser.registrationHash
            );
        } catch (error) {
            throw new Error(error.message);
        }
    };

    static confirmUserAccount = async (registrationHash) => {
        const userRegistration = await User.findOne({
            where: { registrationHash },
        });
        try {
            if (userRegistration) {
                userRegistration.registrationHash = '';
                userRegistration.isActivated = true;
                await userRegistration.save();
                return true;
            }
            return false;
        } catch (error) {
            throw new Error(error.message);
        }
    };

    static userLogin = async (inputEmail, inputPassword) => {
        try {
            const isPasswordValid = await this.#compareUserPasswords(
                inputPassword,
                inputEmail
            );
            if (!isPasswordValid) {
                throw new Error('Wrong user credentials');
            }
            const userData = await User.findOne({
                where: { email: inputEmail },
            });
            const { userId, nickName, email } = userData;
            return { userId, nickName, email };
        } catch (error) {
            throw new Error(error.message);
        }
    };

    static getAllUsers = async () => {
        try {
            return await User.findAll({
                where: {
                    isActivated: true,
                    isActive: true,
                },
                attributes: ['nickName', 'firstName', 'lastName', 'createdAt'],
            });
        } catch (error) {
            throw new Error(error.message);
        }
    };

    static getUserById = async (userId) => {
        try {
            const user = await User.findByPk(userId, {
                attributes: ['nickName', 'firstName', 'lastName', 'createdAt'],
            });
            if (!user) {
                throw new Error('No user found!');
            }
            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    };

    static updateUser = async (userId, userData) => {
        try {
            const user = await User.findByPk(userId);
            if (!user) {
                throw new Error('No user found!');
            }
            user.update(Object.assign(user, userData));
            await user.save();
        } catch (error) {
            throw new Error(error.message);
        }
    };

    static deleteUser = async (userId) => {
        const userToDelete = await User.findByPk(userId);
        if (!userToDelete) {
            return new Error('No user found!');
        }
        userToDelete.isActive = false;
        await userToDelete.save();
        return userToDelete.isActive;
    };
}

module.exports = UserService;
