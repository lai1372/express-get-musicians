// install dependencies
const { execSync } = require("child_process");
execSync("npm install");
execSync("npm run seed");

const request = require("supertest");
const { db } = require("./db/connection");
const { Musician } = require("./models/index");
const app = require("./src/app");
const seedMusician = require("./seedData");
const exp = require("constants");

describe("./musicians endpoint", () => {
  // Write your tests here

  test("GET - request to root should return list of all musicians", async () => {
    const response = await request(app).get("/musicians");
    const data = JSON.parse(response.text);
    expect(response.statusCode).toBe(200);
    expect(data.length).toBe(3);
  });
  test("GET BY ID - should return a single musician when using parametric endpoints", async () => {
    const response = await request(app).get("/musicians/2");
    const data = JSON.parse(response.text);
    expect(response.statusCode).toBe(200);
    expect(data.id).toBe(2);
    expect(data.name).toBe("Drake");
  });

  test("PUT - should accept put request to replace a musician", async () => {
    const response = await request(app)
      .put("/musicians/1")
      .send({ name: "Greg Adams", instrument: "Trumpet" });
    const musicianCheck = await request(app).get("/musicians/1");
    const data = JSON.parse(musicianCheck.text);
    expect(response.statusCode).toBe(200);
    expect(data.name).toBe("Greg Adams");
  });

  test("POST - should post / add new musician successfully", async () => {
    const response = await request(app)
      .post("/musicians")
      .send({ name: "Jimi Hendrix", instrument: "Guitar" });
    const data = JSON.parse(response.text);
    const allMusicians = await Musician.findAll();
    expect(response.statusCode).toBe(200);
    expect(data.name).toBe("Jimi Hendrix");
    expect(data.instrument).toBe("Guitar");
    expect(allMusicians.length).toBe(4);
  });

  test("POST - should return an error if either value is empty", async () => {
    const errorTest = await request(app)
      .post("/musicians")
      .send({ name: "", instrument: "clarinet" });
    const errorTest2 = await request(app)
      .post("/musicians")
      .send({ name: "laila", instrument: "" });
    expect(errorTest.body.error).toEqual([
      {
        location: "body",
        msg: "Invalid value",
        path: "name",
        type: "field",
        value: "",
      },
    ]);
    expect(errorTest2.body.error).toEqual([
      {
        location: "body",
        msg: "Invalid value",
        path: "instrument",
        type: "field",
        value: "",
      },
    ]);
  });
});
