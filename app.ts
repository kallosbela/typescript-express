import express, { Express } from "express";
import cors from "cors";
import login from "./router/login";
import appointment from "./router/appointment";

const app: Express = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use("/api/login", login);
app.use("/api/appointment", appointment);

export default app;
