const nodemailer = require("nodemailer");
import createLogger from "../utils/logger";
import axios from "axios";
import path from "path";
import fs from "fs";
import config from "../utils/config";

type MailOptionsT = {
  subject: string;
  name: string;
  paternalLastName: string;
  maternalLastName: string;
  email: string;
};

type AttachmentsT = {
  fileName: string;
  urlDoc: String;
};

const send: any = async (
  mailOptions: MailOptionsT,
  attachments: AttachmentsT[]
) => {
  try {
    const transporter = nodemailer.createTransport({
      host: config.email.emailHost,
      port: config.email.emailPort,
      secure: config.email.emailSecure,
      auth: {
        user: config.email.emailLogin,
        pass: config.email.emailPassword,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    transporter.verify().then(() => {
      createLogger.info({
        utils: "emailSender",
        data: "successful connection to Nodemailer",
      });
    });

    const htmlFilePath = path.join(__dirname, "../data/email.html");
    const html = fs.readFileSync(htmlFilePath, "utf8");
    const htmlContent = html.replace("%USERNAME%", mailOptions.name);

    const attachmentsData = await Promise.all(
      attachments.map(async (item: any) => {
        const response = await axios.get(item.urlDoc, {
          responseType: "arraybuffer",
        });
        const fileContent = Buffer.from(response.data);
        return {
          filename: item.nameFile,
          content: fileContent,
        };
      })
    );

    const EmailSent = await transporter.sendMail({
      from: config.email.emailFrom,
      to: mailOptions.email,
      subject: mailOptions.subject,
      html: htmlContent,
      attachments: attachmentsData,
    });

    createLogger.info({
      utils: "emailSender",
      data: EmailSent,
    });

    return EmailSent;
  } catch (error) {
    createLogger.error({
      utils: "emailSender",
      data: error,
    });
  }
};

export { send };
