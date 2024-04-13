import nodemailer from 'nodemailer'

const sendEmail= async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: Number(process.env.EMAIL_PORT),
      secure: Boolean(process.env.SECURE),
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      }

    })

    console.log(process.env.HOST);
    await transporter.sendMail({
      from: process.env,
      to: email,
      subject: subject,
      text: text
    })

    console.log("email sent successfuully");
  } catch (error) {
    console.log("email not sent!");
    console.log(error);
    return error;
  }
}

export default sendEmail