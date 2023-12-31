import createLogger from "../utils/logger";
import { Response, Request } from "express";

import * as ModelClaimDetail from "../models/claimDetail";
import * as ModelClaimPerson from "../models/claimPerson";
import * as ModelClaimStatus from "../models/claimStatus";
import * as ModelPerson from "../models/person";
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

const create = async (req: Request, res: Response) => {
  try {
    const {
      claim_id,
      claim_body,
      type_id,
      person_id,
      address,
      hour,
      date,
      level,
    } = req.body;

    console.log(req.body);

    const result = await ModelClaimDetail.create(
      claim_id,
      claim_body,
      type_id,
      level,
      address,
      hour,
      date
    );
    
    console.log(result.data);

    if (!result.success) {
      createLogger.error({
        model: "ModelClaim/create",
        error: result.error,
      });
      res.status(500).json({ success: false, data: null, error: result.error });

      return;
    }

    const resultModel = await ModelClaimPerson.create(claim_id, person_id);

    createLogger.info({
      model: "ModelClaim/create",
      data: result.data,
    });

    const resultDataBase = await ModelClaimStatus.create(claim_id, "Recibido");

    const resultPerson = await ModelPerson.getById(person_id);

    const { data } = resultPerson;

    const mailOptionsT = {
      subject: "Reclamo procesado correctamente",
      name: data.name,
      paternalLastName: data.paternalLastName,
      maternalLastName: data.maternalLastName,
      email: data.email,
    };

    const attachments: any[] = [];

    const sendEmail = await ModelEmail.send(mailOptionsT, attachments);

    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ success: false, data: null, error: e });
  }
};

export { create };
