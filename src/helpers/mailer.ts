import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';
// import dotenv from "../../.env";



export async function sendEmail({ email, emailType, userID }: any) {
  try {
    const hashedToken = await bcryptjs.hash(userID.toString(), 10);

    if (emailType === 'VERIFY') {
      await User.findByIdAndUpdate(userID, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === 'RESET') {
      await User.findByIdAndUpdate(userID, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    const transport = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS || '',
      },
    });

    const mailOptions = {
      from: 'sujalsharma151@gmail.com',
      to: email,
      subject: emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password',
      html: `<p>Click <a href="${process.env.DOMAIN}/verifyEmail?token=${hashedToken}">here</a> to ${
        emailType === 'VERIFY' ? 'verify your email' : 'reset your password'
      }
      or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyEmail?token=${hashedToken}
      </p>`,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    console.log("the code reached mail part next is response")
    console.log(mailResponse)
    return mailResponse;

  } catch (error:any) {
    // Handle specific error types
    if (error.name === 'MongoError') {
      console.error('MongoDB error:', error.message);
    } else {
      console.error('Unexpected error:', error.message);
    }

    throw new Error('Failed to send email.');
  }
}
