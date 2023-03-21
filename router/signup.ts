import express, { Express, Request, Response } from "express";
import { z } from "zod";

const SignupRequest = z.object({
  username: z.string().min(6),
  password: z.string().min(6).max(20),
  email: z.string().email(),
});

type SignupRequest = z.infer<typeof SignupRequest>;

const router = express.Router()

router.post("/", (req: Request, res: Response) => {
  const result = SignupRequest.safeParse(req.body);
  if (result.success === false) {
    return res.status(400).json({ error: result.error });
  }
  const signupRequest = result.data;
  console.log(signupRequest.email);
  // const signupRequest = req.body as SignupRequest
  // signupRequest.email.split("")
  res.send("Express + TypeScript Server \n " + JSON.stringify(signupRequest));
})

export default router 