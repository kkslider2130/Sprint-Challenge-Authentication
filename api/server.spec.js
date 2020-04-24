const request = require("supertest");
const db = require("../database/dbConfig");

beforeEach(async () => {
  await db.seed.run();
});

const server = require("./server");

describe("server", function () {
  it("REGISTER endpoint should return a status of 201", async function () {
    const response = await request(server).post("/api/auth/register").send({
      username: "name4",
      password: "test4",
    });

    expect(response.status).toBe(201);
  });
  it("status should return with text", async function () {
    const response = await request(server).post("/api/auth/register").send({
      username: "name5",
      password: "test5",
    });

    expect(response).toHaveProperty("text");
  });

  it("POST request should return with status 200 in LOGIN endpoint", async function () {
    const response = await request(server)
      .post("/api/auth/register")
      .send({
        username: "username5",
        password: "test5",
      })
      .then((res) => {
        request(server).post("/api/auth/login").send({
          username: "username5",
          password: "test5",
        });
        expect(res.status).toBe(201);
      });
  });

  it("POST request should have appropriate header", async function () {
    await request(server)
      .post("/api/auth/register")
      .send({
        username: "username6",
        password: "test6",
      })
      .then(() => {
        request(server)
          .post("/api/auth/login")
          .send({
            username: "username6",
            password: "test6",
          })
          .then((res) => expect(res).toHaveProperty("header"));
      });
  });

  it("GET request status should return status 201", async function () {
    const response = await request(server)
      .post("/api/auth/register")
      .send({
        username: "username7",
        password: "test7",
      })
      .then(
        request(server).post("api/auth/login").send({
          username: "username7",
          password: "test7",
        })
      )
      .then(request(server).get("/api/jokes"));

    expect(response.status).toBe(201);
  });

  it("GET request status should return json obj", async function () {
    await request(server)
      .post("/api/auth/register")
      .send({
        username: "username8",
        password: "test8",
      })

      .then(() => {
        request(server)
          .get("/api/jokes")
          .then((res) => expect(res.type).toMatch("json"));
      });
  });
});
