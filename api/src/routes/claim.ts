import { Router } from "express";

import * as ClaimController from "../controllers/claim";

const ClaimRouter = Router();

ClaimRouter.get("/getAll", ClaimController.getAll);
ClaimRouter.post("/getById", ClaimController.getById);
ClaimRouter.post("/create", ClaimController.create);
ClaimRouter.post("/delete", ClaimController.deleteClaim);
ClaimRouter.post("/update", ClaimController.update);

export default ClaimRouter;
