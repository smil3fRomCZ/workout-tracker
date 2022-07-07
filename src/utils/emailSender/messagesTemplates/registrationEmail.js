const SENDER = 'jan.melicherik.dev@email.cz';

exports.createRegistrationEmail = (recipientAddress, registrationHash) => {
    return {
        to: recipientAddress,
        from: SENDER,
        subject: 'Workout tracker - confirm your registration',
        html: `
        <h3>Welcome to Workout tracker community</h3>
        <p>To complete your registration pls confirm your account by clicking on link below.</p>
        <a href="http://localhost:5000/api/v1/users/confirm-account/${registrationHash}">Confirm your account</a>
        <p>Have a nice day!<p/>
        `,
    };
};
