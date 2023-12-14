

const nodemailer = require('nodemailer');

async function sendEmail(to, subject, user, templateContent) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ojalacme@gmail.com',
            pass: 'dnyr aule lsgz soeh'
        }
    });

    try {
        // Replace placeholders in the template with actual values from the user object
        const emailBody = templateContent.replace(/{{\s*(.*?)\s*}}/g, (match, key) => {
            return user[key] || match;
        });

        // Send email
        const mailOptions = {
            from: 'ojalacme@gmail.com',
            to,
            subject,
            html: emailBody
        };

        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}

module.exports = { sendEmail };

