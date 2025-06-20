const request = require("supertest");
const app = require("../../index.js");


describe('createAccount directory tests', () => {
  /*
    it("", () => {
      
    })
  */


  it("check if email, password, name are detected in object", async () => {
    const res = await request(app)
    .post("/createAccount")
    .send({email: "a@g.com", name:"agw", password: "124"});

    expect(res.statusCode).toBe(201);
    expect(typeof res.body.auth).toBe("string");
  })
})

