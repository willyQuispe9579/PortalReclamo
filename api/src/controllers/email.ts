import createLogger from "../utils/logger";
import * as ModelEmail from "../models/email";

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

const send = async (req: any, res: any) => {
  try {
    const { mailOptions, attachments } = req.body;

    const emailSent = await ModelEmail.send(mailOptions, attachments);

    createLogger.info({
      controller: "send/emailSender",
      data: emailSent,
    });

    res
      .status(200)
      .json({ success: true, data: emailSent.response, error: null });
  } catch (e) {
    createLogger.error({
      controller: "send",
      error: (e as Error).message,
    });
    res.status(500).json({ error: (e as Error).message });
  }
};

export { send };
