import { Router } from "express";

import * as ClaimDetailController from "../controllers/claimDetail";

const ClaimDetailRouter = Router();

ClaimDetailRouter.post("/create", ClaimDetailController.create);

export default ClaimDetailRouter;
