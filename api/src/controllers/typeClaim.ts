import * as TypeClaimModels from "../models/typeClaim";
import createLogger from "../utils/logger";

const getAll = async (req: any, res: any) => {
  try {
    const result = await TypeClaimModels.getAll();

    if (!result.success) {
      createLogger.error({
        model: "TypeClaimModels/getAll",
        error: result.error,
      });
      res.status(500).json({ success: false, data: null, error: result.error });
      return;
    }

    createLogger.info({
      model: "TypeClaimModels/getAll",
      data: result.data,
    });

    res.status(200).json(result);
  } catch (e) {
    res.status(200).json({ success: false, data: null, error: e });
  }
};

const create = async (req: any, res: any) => {
  try {
    const { typename } = req.body;
    const result = await TypeClaimModels.create(typename);

    if (!result.success) {
      createLogger.error({
        model: "TypeClaimModels/create",
        error: result.error,
      });
      res.status(500).json({ success: false, data: null, error: result.error });
      return;
    }

    createLogger.info({
      model: "TypeClaimModels/create",
      data: result.data,
    });

    res.status(200).json(result);
  } catch (e) {
    res.status(200).json({ success: false, data: null, error: e });
  }
};

const update = async (req: any, res: any) => {
  try {
    const { id, typename } = req.body;
    const result = await TypeClaimModels.update(id, typename);

    if (!result.success) {
      createLogger.error({
        model: "TypeClaimModels/update",
        error: result.error,
      });
      res.status(500).json({ success: false, data: null, error: result.error });
      return;
    }

    createLogger.info({
      model: "TypeClaimModels/update",
      data: result.data,
    });

    res.status(200).json(result);
  } catch (e) {
    res.status(200).json({ success: false, data: null, error: e });
  }
};

const remove = async (req: any, res: any) => {
  try {
    const { id } = req.body;
    const result = await TypeClaimModels.remove(id);

    if (!result.success) {
      createLogger.error({
        model: "TypeClaimModels/remove",
        error: result.error,
      });
      res.status(500).json({ success: false, data: null, error: result.error });
      return;
    }

    createLogger.info({
      model: "TypeClaimModels/remove",
      data: result.data,
    });

    res.status(200).json(result);
  } catch (e) {
    res.status(200).json({ success: false, data: null, error: e });
  }
};
export { getAll, create, update, remove };
