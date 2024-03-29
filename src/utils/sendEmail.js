import nodemailer from "nodemailer";

const sendEmail = async (options) => {
  try {
    const transporter = nodemailer.createTransport({
      // host: process.env.SMTP_HOST,
      // port: process.env.SMTP_PORT,
      // service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // use SSL
      // logger: true,
      debug: true,
      secureConnection: false,
      tls: {
        rejectUnAuthorized: true,
      },
      auth: {
        // user: process.env.SMTP_USER,
        // pass: process.env.SMTP_PASSWORD,
        user: process.env.SMTP_GMAIL_USER,
        //App specific password for nodemailer mailtrap smtp
        pass: process.env.SMTP_GMAIL_PASS,
      },
    });

    const message = {
      // from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
      from: process.env.SMTP_GMAIL_USER,
      to: options.email,
      subject: options.subject,
      text: options.message,
    };

    await transporter.sendMail(message);
    console.log("email sent to ", options.email);
  } catch (error) {
    console.log(error);
  }
};

export default sendEmail;
