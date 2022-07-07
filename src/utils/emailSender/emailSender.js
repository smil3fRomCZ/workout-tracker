const sendgrid = require('@sendgrid/mail');

const {
    createRegistrationEmail,
} = require('./messagesTemplates/registrationEmail');
const sendgridAPI = process.env.SENGRID_API;

sendgrid.setApiKey(sendgridAPI);

const sendRegistrationEmail = async (recipientEmail, registrationHash) => {
    const registrationEmail = createRegistrationEmail(
        recipientEmail,
        registrationHash
    );
    try {
        await sendgrid.send(registrationEmail);
    } catch (error) {
        console.log(error);
        throw error;
    }
};

module.exports = sendRegistrationEmail;
