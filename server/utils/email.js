

const nodemailer = require('nodemailer');

async function sendEmail(to, subject, user, templateContent) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-username',
            pass: 'your-password'
        }
    });

    try {
        // Replace placeholders in the template with actual values from the user object
        const emailBody = templateContent.replace(/{{\s*(.*?)\s*}}/g, (match, key) => {
            return user[key] || match;
        });

        // Send email
        const mailOptions = {
            from: 'your-username',
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

