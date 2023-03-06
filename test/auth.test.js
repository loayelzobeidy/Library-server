// auth.test.ts

const  app = require("../app")
const db = require("../src/models")

const faker = require("faker")
const supertest = require("supertest")

const authentication =  require("../src/controllers/auth.controller")
const { INTEGER } = require("sequelize")

describe("test the JWT authorization middleware", () => {
  // Set the db object to a variable which can be accessed throughout the whole test file
  let thisDb = db

  // Before any tests run, clear the DB and run migrations with Sequelize sync()
  beforeAll(async () => {
    await thisDb.sequelize.sync({ force: true })
  })

  it("should succeed when accessing an authed route with a valid JWT", async () => {
    const username = faker.random.alphaNumeric(10)
    const email = `user-${username}@email.com`
    const password = `password`

    let response = await supertest(app)
    .post("/api/auth/signup")
    .expect(200)
    .set("Content-Type", 'application/json').send({
      
        "username":username,
        "email":email,
        "password":password,
        "roles":["moderator","user"]
    
    })
    // App is used with supertest to simulate server request
    console.log("first ",response.body)
     response = await supertest(app)
      .post("/api/auth/signin")
      .expect(200)
      .set("Content-Type", 'application/json').send({
      
        "username":username,
        "password":password
    
    })
    console.log("second ",response.body)

    expect(response.body).toMatchObject({
      accessToken: expect.stringMatching(/I/),
      email: email,
      id: 1,
      roles:  [],
      username:username,
      
    })
  })

  // After all tersts have finished, close the DB connection
  afterAll(async () => {
    await thisDb.sequelize.close()
  })
  })

// })