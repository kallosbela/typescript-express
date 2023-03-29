import express, { Express, Request, Response } from "express";
import { z } from "zod";
import { getIdToken } from "../api/google";
import jsonwebtoken from "jsonwebtoken";
import jwt from "jsonwebtoken";
import { safeParse } from "../utility/safeParse";
import { verify } from "../middleware/verify";
import { User, UserType } from "../model/User";

const secretKey = process.env.JWT_SECRET;
if (!secretKey) {
  throw new Error("JWT_SECRET is not defined");
}

const LoginRequestSchema = z.object({
  code: z.string(),
});

type LoginRequest = z.infer<typeof LoginRequestSchema>;

const Payload = z.object({
  sub: z.string(),
  email: z.string(),
});

type PayLoad = z.infer<typeof Payload>;

const router = express.Router();

router.post(
  "/",
  verify(LoginRequestSchema),
  async (req: Request, res: Response) => {
    const loginRequest = req.body as LoginRequest;

    const idToken = await getIdToken(loginRequest.code);
    if (!idToken) {
      return res.sendStatus(401);
    }

    const payload: unknown = jsonwebtoken.decode(idToken);
    const result = safeParse(Payload, payload);
    if (!result) {
      return res.status(500);
    }
    const data: UserType = result;

    const user = new User(data);
    await user.save();

    const sessionToken = jwt.sign(result, secretKey);
    res.json(sessionToken);
  }
);

export default router;
