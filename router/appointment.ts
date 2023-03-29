import express, { Express, Request, Response } from "express";
import { z } from "zod";
import { Appointment, AppointmentType } from "../model/Appointment";
import { verify } from "../middleware/verify";

const router = express.Router();

const postRequestSchema = z.object({
  startDate: z.string(),
  startTime: z.string(),
  endDate: z.string(),
  endTime: z.string(),
  comment: z.string().optional(),
});

type PostRequestType = z.infer<typeof postRequestSchema>; 

router.post("/", verify(postRequestSchema), async (req: Request, res: Response) => {   
  const data = req.body as PostRequestType;
  //buisness logic checks...
  const newAppointment = await Appointment.create<AppointmentType>(data);
  res.json(newAppointment);
});

export default router;