const SENDER = 'jan.melicherik.dev@email.cz';

exports.createResetPasswordEmail = (recipientAddress, nickName) => {
    return {
        to: recipientAddress,
        from: SENDER,
        subject: 'Workout tracker - reset password',
        html: `
        <h3>Hi, ${nickName}</h3>
        <p>To reset your password, pls continue with link below</p>
        <a href="">Reset your password</a>
        <p>Have a nice day!<p/>
        `,
    };
};
