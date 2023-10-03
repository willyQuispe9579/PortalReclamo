import * as ModelClaim from "../models/claim";
import createLogger from "../utils/logger";

const create = async (req: any, res: any) => {
  try {
    const result = await ModelClaim.create();
    if (!result.success) {
      createLogger.error({
        model: "ModelClaim/create",
        error: result.error,
      });
      res.status(500).json({ success: false, data: null, error: result.error });

      return;
    }

    createLogger.info({
      model: "ModelClaim/create",
      data: result.data,
    });
    res.status(200).json(result);
  } catch (e) {
    res.status(200).json({ success: false, data: null, error: e });
  }
};

const getById = async (req: any, res: any) => {
  try {
    const { claim_id } = req.body;

    const result = await ModelClaim.getById(claim_id);

    res
      .status(200)
      .json({ success: true, data: result.data.data, error: null });
  } catch (e) {
    res.status(200).json({ success: false, data: null, error: e });
  }
};

const update = async (req: any, res: any) => {
  try {
    const { id } = req.body;

    const result = await ModelClaim.update(id);

    res.status(200).json({ success: true, data: result, error: null });
  } catch (e) {
    res.status(200).json({ success: false, data: null, error: e });
  }
};

const getAll = async (req: any, res: any) => {
  try {
    const result = await ModelClaim.getAll();

    res.status(200).json({ success: true, data: result.data, error: null });
  } catch (e) {
    res.status(200).json({ success: false, data: null, error: e });
  }
};

const deleteClaim = async (req: any, res: any) => {
  try {
    const { id } = req.body;

    const result = await ModelClaim.deleteClaim(id);

    res.status(200).json({ success: true, data: result, error: null });
  } catch (e) {
    res.status(200).json({ success: false, data: null, error: e });
  }
};

export { create, update, getAll, getById, deleteClaim };
