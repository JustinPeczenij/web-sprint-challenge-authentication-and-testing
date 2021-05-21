const db = require('../data/dbConfig')
const request = require('supertest')
const server = require('./server')

beforeAll(async () => {
  await db.migrate.latest()
})

beforeEach(async () => {
  await db.seed.run() 
})

afterAll(async () => {
  await db.seed.run() 
  await db.destroy()
})

test('sanity', () => {
  expect(process.env.NODE_ENV).toBe('testing')
})

describe('[POST] /api/auth/register', () => {
  // beforeEach(async () => {
  //   await db('users').insert({ username: 'bonto', password: '1234' })
  // })
  it('responds with "username and password required" when password is missing', async () => {
    const res = await request(server)
      .post('/api/auth/register')
      .send({ username: 'timmy'})
    expect(res.body).toEqual({message: 'username and password required'})
  })
  it('responds with "username taken" when username is taken', async () => {
    const res = await request(server)
      .post('/api/auth/register')
      .send({ username: 'bonto', password: '1234'})
    expect(res.body).toEqual({message: 'username taken'})
  })
})

describe('[POST] /api/auth/login', () => {
  // beforeEach(async () => {
  //   await db('users').insert({ username: 'bonto', password: '1234' })
  // })
  it('responds with "invalid credentials" if username does not exist', async () => {
    const res = await request(server)
      .post('/api/auth/login')
      .send({ username: 'tricky', password: '1234' })
    expect(res.body).toEqual({ message: 'invalid credentials' })
  })
  it('responds with "invalid credentials" if password is incorrect', async () => {
    const res = await request(server)
      .post('/api/auth/login')
      .send({ username: 'bonto', password: '123' })
    expect(res.body).toEqual({ message: 'invalid credentials' })
  })
  it('responds with a token with valid credentials', async () => {
    const res = await request(server)
      .post('/api/auth/login')
      .send({ username: 'bonto', password: '1234' })
    expect(res.body).toHaveProperty('token')
  })

  // cant figure out res.body resolves to an error message. I'm able to login on postman and the I know the knex syntax is right.
  // I ended up making a seed to login - but I still don't understand why that wasn't working
  // it('responds with a token upon successful login', async () => {
  //   const res = await request(server).post('/api/auth/login').send({ username: 'bonto', password: '1234' })
  //   console.log(res.body)
  //   expect(res.body).toHaveProperty('token')
  // })

})

describe('[GET] /api/jokes', () => {
  it("can't get jokes without a token", async () => {
    const res = await request(server).get('/api/jokes')
    expect(res.body).toEqual({ message: 'token required' })
  })
  it("resolves to an array of jokes when a valid token is in the Request Headers", async () => {
    const loginRes = await request(server)
      .post('/api/auth/login')
      .send({ username: 'bonto', password: '1234' })
    const token = loginRes.body.token
    const jokeRes = await request(server)
      .get('/api/jokes')
      .set('Authorization', token)
    expect(jokeRes.body).toHaveLength(3)
  })

})