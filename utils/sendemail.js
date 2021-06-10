"use strict"
import nodemailer from 'nodemailer'

export default async function main() {
 

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp-relay.sendinblue.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SENDEMAIL_EMAIL, 
      pass: process.env.SENDEMAIL_PASSWORD, 
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Plantário 🌱" <reservatorio@plantario.oandre.com>', // sender address
    to: "andreiarley@gmail.com", // list of receivers
    subject: "Alerta reservatório", // Subject line
    text: "Passando aqui para lembrar que o reservatório está abaixo de sua capacidade. Reabasteça o quanto antes! ", // plain text body
    html: "<b>Passando aqui para lembrar que o reservatório está abaixo de sua capacidade. Reabasteça o quanto antes! </b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

}

//main().catch(console.error);
