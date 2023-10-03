import { Router } from "express";

import * as PersonController from "../controllers/person";

const PersonRouter = Router();

PersonRouter.post("/create", PersonController.create);
PersonRouter.post("/getByRut", PersonController.getByRut);
export default PersonRouter;
