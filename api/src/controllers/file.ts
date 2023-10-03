import createLogger from "../utils/logger";
import { v2 as cloudinary } from "cloudinary";
import config from "../utils/config";
import * as ModelClaimFile from "../models/claimFile";

cloudinary.config({
  cloud_name: config.cloudinary_name || "dzfg8xnxn",
  api_key: config.cloudinary_api_key || "734242724172826",
  api_secret: config.cloudinary_secret || "1_K4cx2TRHcbd3URjmuHJ_oJU-Y",
});

const add = async (req: any, res: any) => {
  try {
    const { claim_id } = req.body;
    const files = req.files;

    const results: Array<any> = [];
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const result = await cloudinary.uploader.upload(file.path);
        const resultModel = await ModelClaimFile.create(
          claim_id,
          result.url,
          result.public_id
        );
        results.push(resultModel.data);
      }
    }

    createLogger.info({
      model: "file/add",
      data: req.body,
    });

    res.status(200).json({ success: true, data: results, error: null });
  } catch (e: any) {
    console.log(e);
    res.status(500).json({ success: false, data: null, error: e as Error });
  }
};

const remove = async (req: any, res: any) => {
  try {
    const { public_id, claim_id } = req.body;
    const result = await cloudinary.uploader.destroy(public_id);
    const resultModel = await ModelClaimFile.remove(public_id);
    const resultModelData = await ModelClaimFile.getById(claim_id);

    createLogger.info({
      model: "file/remove",
      data: req.body,
    });
    res.status(200).json({ success: true, data:resultModelData.data, error: null });
  } catch (e: any) {
    console.log(e);
    res.status(500).json({ success: false, data: null, error: e as Error });
  }
};

export { add, remove };
