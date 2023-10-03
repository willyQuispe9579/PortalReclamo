import * as PersonModels from "../models/person";
import createLogger from "../utils/logger";

const create = async (req: any, res: any) => {
  try {
    const { rut, name, paternallastname, maternallastname, email, phone } =
      req.body;

    const result = await PersonModels.create(
      rut,
      name,
      paternallastname,
      maternallastname,
      email,
      phone
    );

    if (!result.success) {
      createLogger.error({
        model: "Person/create",
        error: result.error,
      });
      res.status(500).json({ success: false, data: null, error: result.error });
      return;
    }

    createLogger.info({
      model: "Person/create",
      data: result.data,
    });

    res.status(200).json(result);
  } catch (e) {
    res.status(200).json({ success: false, data: null, error: e });
  }
};

const getByRut = async (req: any, res: any) => {
  try {
    const { rut } = req.body;

    const result = await PersonModels.getByRut(rut);

    if (!result.success) {
      createLogger.error({
        model: "Person/getByRut",
        error: result.error,
      });
      res.status(500).json({ success: false, data: null, error: result.error });
      return;
    }

    createLogger.info({
      model: "Person/getByRut",
      data: result.data,
    });

    res.status(200).json(result);
  } catch (e) {
    res.status(200).json({ success: false, data: null, error: e });
  }
};

export { create, getByRut };
