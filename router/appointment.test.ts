import dotenv from "dotenv";
dotenv.config();

import supertest from "supertest";
import app from "../app";

const testApp = supertest(app); 

describe("appointmnent test",()=>{
  it("gets the test endpoint",async ()=>{
    const response = await testApp.post("/api/appointment");
    expect(response.status).toBe(400);
  })
})