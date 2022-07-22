import supertest from "supertest";

import app from "../index.js";
import prisma from "../database/database.js";
import {createSafeNote} from "./factories/safenoteFactory.js";

let tokenAdmin: string;
let tokenUser: string;

const agent = supertest(app);

beforeAll(async () => {
  const result = await supertest(app).post("/signin").send({
    email: "admin@gmail.com",
    password: "adminadmin"
  });
  tokenAdmin = "Bearer " + result.body.token;

  const result2 = await supertest(app).post("/signin").send({
    email: "user@gmail.com",
    password: "useruseruser"
  });
  tokenUser = "Bearer " + result2.body.token;
});

beforeEach( async () => {
  await prisma.$executeRaw`TRUNCATE TABLE "safeNotes";`;
});

describe("POST /safenotes", () => {

  it("given a valid safe note it should return 201", async () => {
    const safeNote = createSafeNote();
    const result = await agent.post("/safenotes").send(safeNote).set("Authorization", tokenAdmin);
    const {status} = result;
    expect(status).toEqual(201);
    const safeNoteInDB = await prisma.safeNote.findFirst({where: {title: safeNote.title}});
    expect(safeNoteInDB).not.toBeNull();
  });

  it("given an invalid safe note it should return 422", async () => {
    const invalidSafeNote = {
      title: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      text: "aaaaa"
    };
    const result = await agent.post("/safenotes").send(invalidSafeNote).set("Authorization", tokenAdmin);
    const {status} = result;
    expect(status).toEqual(422);
  }); 

});

describe("GET /safenotes/:id", () => {

  it("if a user tries to access a safe note from another user it should return 403", async () => {

    const {id} = await prisma.user.findUnique({where: {email: "admin@gmail.com"}});
    const safeNote = createSafeNote();
    const {id: safeNoteId} = await prisma.safeNote.create({data: {
      userId: id,
      ...safeNote
    }});
    const result = await agent.get("/safenotes/" + safeNoteId).set("Authorization", tokenUser);
    expect(result.status).toEqual(403);
  });

});

describe("GET /safenotes/:id", () => {

  it("if a user tries to delete a safe note from another user it should return 403", async () => {

    const {id} = await prisma.user.findUnique({where: {email: "admin@gmail.com"}});
    const safeNote = createSafeNote();
    const {id: safeNoteId} = await prisma.safeNote.create({data: {
      userId: id,
      ...safeNote
    }});
    const result = await agent.delete("/safenotes/" + safeNoteId).set("Authorization", tokenUser);
    expect(result.status).toEqual(403);
  });

});

afterAll(async () => {
  await prisma.$disconnect();
});