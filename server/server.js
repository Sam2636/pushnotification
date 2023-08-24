const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

const smtpTransport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'samdhanaseelan12@gmail.com',
    pass: 'ysbbmetdkbciduyo',
  },
});

app.post('/api/send-email', (req, res) => {
  const { to, subject, text } = req.body;

  const mailOptions = {
    to,
    subject,
    text,
    from: 'your-email@gmail.com',
  };

  smtpTransport.sendMail(mailOptions, (error, response) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Error sending email' });
    } else {
      console.log('Email sent');
      res.status(200).json({ message: 'Email sent successfully' });
    }

    smtpTransport.close();
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
