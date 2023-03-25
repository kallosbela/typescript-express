import dotenv from "dotenv";
dotenv.config();
import express, { Express } from "express";
import signup from "./router/login";
import cors from "cors";
import mongoose from "mongoose";

const app: Express = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use("/api/signup", signup);

const mongoUrl = process.env.MONGO_URL as string;
//zoddal validalni szorgalmi feladat

mongoose.connect(mongoUrl)

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
