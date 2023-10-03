import express from "express";
import cors from "cors";

import * as routes from "./routes";
import { reqLogger } from "./middlewares/logger";
import { auth } from "./middlewares/auth";
import multer from "multer";
import path from "path";

class App {
  public server: any;
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(
      cors({
        origin: ["http://localhost:8000", "http://localhost:4400"],
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type,Authorization", "Content-Type", "id"],
      })
    );
    this.server.use(express.urlencoded({ extended: false }));

    const storage = multer.diskStorage({
      destination: path.join(__dirname, "public/uploads"),
      filename: (req, file, cb) => {
        cb(null, new Date().getTime() + path.extname(file.originalname));
      },
    });

    this.server.use(multer({ storage }).array("files"));
  }

  routes() {
    this.server.use("/api/claim", auth, reqLogger, routes.ClaimRouter);
    this.server.use(
      "/api/claimDetail",
      auth,
      reqLogger,
      routes.ClaimDetailRouter
    );
    this.server.use("/api/person", auth, reqLogger, routes.PersonRouter);
    this.server.use("/api/typeclaim", auth, reqLogger, routes.TypeClaimRouter);
    this.server.use("/api/file", auth, reqLogger, routes.FileRouter);
    this.server.use("/api/user", auth, reqLogger, routes.UserRouter);
  }
}

export default new App().server;
