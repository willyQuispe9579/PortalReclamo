import app from "./app";
import createLogger from "./utils/logger";

app.listen(5400);

createLogger.info(`API listening port ${5400}`);
