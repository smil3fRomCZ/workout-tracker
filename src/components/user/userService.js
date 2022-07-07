const bcrypt = require('bcrypt');
const crypto = require('crypto');
const sendRegistrationEmail = require('../../utils/emailSender/emailSender');
const User = require('./userModel');

class UserService {
    // Internal helper methods
    static #hashPassword = (password) => {
        return bcrypt.hash(password, 12);
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
        if (userRegistration) {
            userRegistration.registrationHash = '';
            userRegistration.isActivated = true;
            await userRegistration.save();
            return true;
        }
        return false;
    };
}

module.exports = UserService;
