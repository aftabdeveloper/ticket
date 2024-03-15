const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
});

const mail = async(email,subject,link)=> {
  try
  {
    await transporter.sendMail({
      from: 'alphonso1416@gmail.com', 
      to: email, 
      subject: subject, 
      text: "Hello world?", 
      html: `${link}`
    });
    return true
  }
  catch(err)
  {
    return false
  }
  
}

module.exports = mail