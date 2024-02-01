import express, { Application, Request, Response } from "express";
import "reflect-metadata";
import { createConnection } from "typeorm";
require("dotenv").config();
import cors from "cors";
import cookieParser from "cookie-parser";
import duaEndPointRoute from "./src/route/dua";

const app: Application = express();

const corsOption = {
  origin: process.env.CORS_ORIGIN,
  credentials: true,
};

//make public folder
app.use(express.static("public"));

//parsing file
app.use(express.json({ limit: "250mb" }));
app.use(express.urlencoded({ limit: "250mb", extended: true }));
app.use(cookieParser());
app.use(cors(corsOption));

//dot env file
const port: string | number = (process.env.PORT || 8080)!; //create a default server port

//create the sever
app.listen(port, () => console.log(`server is connected to ${port}`));

//connect to database
createConnection()
  .then(() => console.log(`server is connected to the database`))
  .catch((err) => console.log(err));

//default route
app.get("/", (req: Request, res: Response): void => {
  res.json({
    message: "Hello I am from root",
    status: 202,
  });
});

//all others api will be located here
app.use("/dua", duaEndPointRoute);

//not found route
app.get("*", (req: Request, res: Response): void => {
  res.json({
    message: "Api route is invalid",
    status: 404,
  });
});
