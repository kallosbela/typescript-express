import mongoose from "mongoose";
import {Schema, InferSchemaType} from 'mongoose';

const appointmentSchema = new Schema({
  startDate: {type: String, required: true},
  startTime: {type: String, required: true},
  endDate: {type: String, required: true},
  endTime: {type: String, required: true},
  comment: {type: String},
});

export type AppointmentType = InferSchemaType<typeof appointmentSchema>;
export const Appointment = mongoose.model("Appointment", appointmentSchema);