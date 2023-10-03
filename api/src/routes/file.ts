import { Router } from "express";

import * as FileController from "../controllers/file";

const FileRouter = Router();

FileRouter.post("/add", FileController.add);
FileRouter.post("/remove", FileController.remove);

export default FileRouter;
