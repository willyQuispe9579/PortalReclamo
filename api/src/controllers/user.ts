import * as UserModels from "../models/user";
import * as PersonModel from "../models/person";
import createLogger from "../utils/logger";

const create = async (req: any, res: any) => {
  try {
    const { person_id, password, photo } = req.body;
    const resultModel = await UserModels.create(person_id, password, photo);
    if (!resultModel.success) {
      createLogger.error({
        model: "create/create",
        error: resultModel.error,
      });
      res
        .status(500)
        .json({ success: false, data: null, error: resultModel.error });
      return;
    }

    res.status(200).json(resultModel);
  } catch (e) {
    res.status(500).json({ success: false, data: null, error: e });
  }
};

const validate = async (req: any, res: any) => {
  try {
    const { email, password } = req.body;

    const resultModelPerson = await PersonModel.getByEmail(email);

    if (!resultModelPerson.success) {
      createLogger.error({
        model: "validate/getByEmail",
        error: resultModelPerson.error,
      });
      res
        .status(500)
        .json({ success: false, data: null, error: resultModelPerson.error });
      return;
    }

    if (!resultModelPerson.data) {
      res.status(200).json({ success: true, data: null, error: null });
      return;
    }

    const { id } = resultModelPerson.data;

    const result = await UserModels.validate(id, password);

    if (!result.success) {
      createLogger.error({
        model: "validate/validate",
        error: result.error,
      });
      res.status(500).json({ success: false, data: null, error: result.error });
      return;
    }

    const { isMatch, photo } = result.data;

    const dataTosend = {
      ...resultModelPerson.data,
      photo,
    };

    console.log(dataTosend);
    if (isMatch) {
      res.status(200).json({ success: true, data: dataTosend, error: null });
      return;
    } else {
      res.status(200).json({ success: true, data: null, error: null });
      return;
    }
  } catch (e) {
    res.status(500).json({ success: false, data: null, error: e });
  }
};

const remove = async (req: any, res: any) => {
  try {
    const { person_id } = req.body;
    const resultModel = await UserModels.remove(person_id);
    if (!resultModel.success) {
      createLogger.error({
        model: "create/remove",
        error: resultModel.error,
      });
      res
        .status(500)
        .json({ success: false, data: null, error: resultModel.error });
      return;
    }

    res.status(200).json(resultModel);
  } catch (e) {
    res.status(500).json({ success: false, data: null, error: e });
  }
};

export { validate, create, remove };
