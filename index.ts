import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());

const SignupRequest = z.object({
  username: z.string().min(6),
  password: z.string().min(6).max(20),
  email: z.string().email(),
});

type SignupRequest = z.infer<typeof SignupRequest>;

app.get('/', (req: Request, res: Response) => {
  if (!req.body.username) return res.status(400).json({ error: 'Username is required' });
  if (!req.body.password) return res.status(400).json({ error: 'Password missing' });
  if (!req.body.email) return res.status(400).json({ error: 'Email is required' });
  //if (!req.body.email.length < 6) return res.status(400).json({ error: 'Email must be at least 6 characters' });
  res.send('Express + TypeScript Server');
});

app.post('/api/signup', (req: Request, res: Response) => {
  const signupRequest = SignupRequest.safeParse(req.body);
  if (signupRequest.success === false) {
    return res.status(400).json({ error: signupRequest.error });
  }
  console.log(signupRequest.data.email);

  res.send('Express + TypeScript Server \n ' + JSON.stringify(signupRequest.data));
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

