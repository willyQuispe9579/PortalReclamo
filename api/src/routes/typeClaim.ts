import { Router } from "express";

import * as TypeClaimController from "../controllers/typeClaim";

const TypeClaimRouter = Router();

TypeClaimRouter.post("/getAll", TypeClaimController.getAll);
TypeClaimRouter.post("/create", TypeClaimController.create);
TypeClaimRouter.post("/update", TypeClaimController.update);
TypeClaimRouter.post("/remove", TypeClaimController.remove);

export default TypeClaimRouter;
