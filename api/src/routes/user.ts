import { Router } from "express";

import * as UserController from "../controllers/user";

const UserRouter = Router();

UserRouter.post("/validate", UserController.validate);
UserRouter.post("/create", UserController.create);
UserRouter.post("/remove", UserController.remove);

export default UserRouter;
