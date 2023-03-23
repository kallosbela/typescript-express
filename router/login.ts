import express, { Express, Request, Response } from "express";
import { z } from "zod";
import { getIdToken } from "../api/google";
import jsonwebtoken from "jsonwebtoken";
import jwt from "jsonwebtoken";
import { safeParse } from "../utility/safeParse";

const secretKey = process.env.JWT_SECRET;
if (!secretKey) {
  throw new Error("JWT_SECRET is not defined");
}

const LoginRequest = z.object({
  code: z.string(),
});

type LoginRequest = z.infer<typeof LoginRequest>;

const Payload = z.object({
  sub: z.string(),
  email: z.string(),
});

type PayLoad = z.infer<typeof Payload>;

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const loginRequest = safeParse(LoginRequest,req.body);
  if (!loginRequest) {
    return res.sendStatus(400).json({ error: "Invalid request" });
  }//ebből legyen middleware!

  const idToken = await getIdToken(loginRequest.code);
  console.log(loginRequest.code);
  if (!idToken) {
    return res.sendStatus(401).json({ error: "Invalid code" });
  }
  const payload = jsonwebtoken.decode(idToken);
  const result2 = safeParse(Payload, payload);
  if (!result2) {
    return res.status(500);
  }
  const sessionToken = jwt.sign(result2, secretKey);
  res.json(sessionToken);
});

export default router;
