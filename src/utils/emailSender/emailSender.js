const sendgrid = require('@sendgrid/mail');

const {
    createRegistrationEmail,
} = require('./messagesTemplates/registrationEmail');
const {
    createResetPasswordEmail,
} = require('./messagesTemplates/resetPasswordEmail');
const sendgridAPI = process.env.SENGRID_API;

sendgrid.setApiKey(sendgridAPI);

exports.sendRegistrationEmail = async (recipientEmail, registrationHash) => {
    const registrationEmail = createRegistrationEmail(
        recipientEmail,
        registrationHash
    );
    try {
        await sendgrid.send(registrationEmail);
    } catch (error) {
        throw error;
    }
};

exports.sendResetPasswordEmail = async (recipientEmail, nickName) => {
    const resetPasswordEmail = createResetPasswordEmail(
        recipientEmail,
        nickName
    );

    try {
        await sendgrid.send(resetPasswordEmail);
    } catch (error) {
        throw error;
    }
};
