const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.SMPT_HOST,
    port: process.env.SMPT_PORT,
    secure: false,
    auth: {
        user: process.env.SMPT_USER,
        pass: process.env.SMPT_PASSWORD
    }
})

async function sendActivationEmail(to, link) {
    await transporter.sendMail({
        from: process.env.SMPT_USER,
        to,
        subject: 'Activation Email on ' + process.env.API_URL,
        text: '',
        html:
            `
                <div>
                    <h1>Go to the link for activate account</h1>
                    <a href="${link}">${link}</a>
                </div>
            `
    })

}

module.exports = {
    sendActivationEmail
}