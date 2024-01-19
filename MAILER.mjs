import nodemailer from "nodemailer";

async function sendMail() {
  const transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "386343ebec4519",
      pass: "af8d732ffcd960",
    },
  });

  const mailOptions = {
    from: 'sujalsharma151@gmail.com',
    to: 'randomEmail@gmail.com',
    subject: 'subject',
    html: '<h1>hello from mailer</h1>',
  };

  try {
    const mailResponse = await transporter.sendMail(mailOptions);
    console.log('Email sent:', mailResponse);
  } catch (error) {
    console.error('Error sending email:', error.message);
  }
}

// Call the function to send the email
sendMail();
