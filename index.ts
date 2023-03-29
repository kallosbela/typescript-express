import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import {z} from "zod"

import app from "./app";

const port = process.env.PORT

const mongoUrlSchema = z.string().url()
const mongoUrl = process.env.MONGO_URL;
const mongoUrlResult = mongoUrlSchema.safeParse(mongoUrl);
if (!mongoUrlResult.success) {
  throw new Error("MONGO_URL is not defined");
}
type NewConnectOptions = mongoose.ConnectOptions & { useNewUrlParser: boolean, useUnifiedTopology: true };
const mongoOptions: NewConnectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}; 
mongoose.connect(mongoUrlResult.data, mongoOptions);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
