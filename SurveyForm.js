const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

app.post('/submit-form', (req, res) => {
    const formData = req.body;

    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: 'Gmail', // Use your email service provider
        auth: {
            user: 'your.email@gmail.com',
            pass: 'your-email-password'
        }
    });

    // Configure the email message
    const mailOptions = {
        from: 'your.email@gmail.com',
        to: 'recipient@example.com', // Recipient's email address
        subject: 'Form Submission',
        html: JSON.stringify(formData, null, 2) // Convert form data to a readable JSON format
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent:', info.response);
            res.status(200).send('Email sent successfully');
        }
    });
});


app.use(bodyParser.urlencoded({ extended: true }));

// Serve your static files (HTML, CSS, JS, etc.)
app.use(express.static(__dirname));

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
