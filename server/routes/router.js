
const express = require('express');
const route = express.Router();
const services = require('../service/render');
const controller = require('../controller/controller');
const { sendEmail } = require('../utils/email');
const User = require('../model/model');
const path = require('path');
const fs = require('fs').promises;

route.get('/', services.homeRoutes);
route.get('/add-user', services.add_user);
route.get('/update-user', services.update_user);

// API
route.post('/api/users', controller.create);
route.get('/api/users', controller.find);
route.put('/api/users/:ids', controller.update);
route.delete('/api/users/:ids', controller.delete);


route.post('/send-emails', async (req, res) => {
    try {
        const selectedTemplate = req.body.template;
        const selectedDepartment = req.body.department;

        // Read the template content based on the selected template
        const templatePath = path.join(__dirname, '..', 'utils', `${selectedTemplate}.html`);
        const templateContent = await fs.readFile(templatePath, 'utf8');

        // Filter users based on the selected department
        const users = await User.find({ department: selectedDepartment });

        // Loop through filtered users and send emails
        for (const user of users) {
            await sendEmail(user.email, 'Alert!! New Messages!', user, templateContent);
        }

        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error sending emails:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});



module.exports = route;

