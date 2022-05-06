import nodemailer from 'nodemailer';

import { MailAdapter, SendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
   host: "smtp.mailtrap.io",
   port: 2525,
   auth: {
     user: "7cee2088bd175b",
     pass: "dfed232d18c442"
   }
 });

class NodemailerMailAdapter implements MailAdapter {
   async sendMail ({subject, body}: SendMailData) {
      await transport.sendMail({
         from: "Equipe Feedget <contato@feedget.com>",
         to: "Muriel Pacheco <damaziomp@gmail.com>",
         subject,
         html: body
      })
   }

}

export {NodemailerMailAdapter}