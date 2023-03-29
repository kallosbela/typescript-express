
import express, { Express } from "express";
import cors from "cors";
import mongoose, { ConnectOptions } from "mongoose";
import {z} from "zod";
import signup from "./router/login";
import appointment from "./router/appointment";

const app: Express = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use("/api/signup", signup);
app.use("/api/appointment", appointment)

const mongoUrlSchema = z.string().url().min(1);
const mongoUrl = process.env.MONGO_URL;
const mongoUrlResult = mongoUrlSchema.safeParse(mongoUrl);
if (!mongoUrlResult.success) {
  throw new Error("MONGO_URL is not defined");
}
type NewConnectOptions = mongoose.ConnectOptions & { useNewUrlParser: boolean, useUnifiedTopology: true };
const mongoOptions: NewConnectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};  // ez vajon kell?
mongoose.connect(mongoUrlResult.data, mongoOptions);


export default app;