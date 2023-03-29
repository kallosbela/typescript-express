import dotenv from "dotenv";
dotenv.config();

import supertest from "supertest";
import app from "../app";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { Appointment, AppointmentType } from "../model/Appointment";

const testApp = supertest(app);

describe("appointmnent test", () => {
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri(), {});
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  afterEach(async () => {
    await Appointment.deleteMany();
    // await mongoose.connection.db.dropDatabase();
  });

  it("should return 400 when empty body sent", async () => {
    const response = await testApp.post("/api/appointment");
    expect(response.status).toBe(400);
  });

  it("should put the data into the DB and return 200 status when normal data is sent", async () => {
    // given
    const [startDate, startTime] = new Date().toISOString().split("T");
    const appointment = {
      startDate,
      startTime,
      endDate: startDate,
      endTime: startTime,
      comment: "valami",
    };

    // when
    const response = await testApp.post("/api/appointment").send(appointment);

    // then
    const DBContent = await Appointment.find();
    expect(DBContent).toHaveLength(1);
    expect(DBContent[0].startDate).toBe(startDate);
    expect(response.status).toBe(200);
  });
});
