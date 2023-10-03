import pg from "pg";
import config from "./config";
import createLogger from "../utils/logger";

const connectPro = {
  connectionString: config.database_connection,
};
const connectDev = {
  connectionString: config.database_connection,
  ssl: true,
};

const pool = new pg.Pool(
  config.NODE_ENV === "production" ? connectPro : connectDev
);

pool.connect(function (err) {
  if (err) {
    createLogger.error(`ERROR connecting to Database: ${err}`);
  } else {
    createLogger.info(`Connected to Database`);
  }
});

export default pool;
