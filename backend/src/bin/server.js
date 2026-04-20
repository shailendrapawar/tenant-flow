import { createServer } from "http";
import { app } from "./app";
import Config from "../shared/configs/appConfig";

app.listen(Config.App.Port, () =>
  console.log("Server is running on port:", Config.App.Port),
);
