import express, { Application } from "express";
import { mainApp } from "./mainApp";
import dotenv from "dotenv"
dotenv.config()

const app: Application = express();

const port = parseInt(process.env.PORT!);

mainApp(app);

const server = app.listen(process.env.PORT || port, () => {
  console.log("");
  console.log("server listening on port", port);
});

process.on("unhandledRejection", (reason: any) => {
  console.log("server unhandledRejection");
  console.log(reason);
});

process.on("uncaughtException", (error: any) => {
  console.log("server uncaughtException");
  console.log(error);

  server.close(() => {
    process.exit(1);
  });
});
