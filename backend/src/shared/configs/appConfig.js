import { configDotenv } from "dotenv";
configDotenv();

let Config = {
  App: {
    Port: process.env.APP_PORT || 3000,
    Host: process.env.APP_HOST || "localhost",
    Env: process.env.APP_ENV || "development",
  },
  Mongo: {
    URI: process.env.MONGO_URI || "mongodb://localhost:27017/tenant-flow",
  },
  JWT: {
    Secret: process.env.JWT_SECRET || "secret",
  },
};

export default Config;
