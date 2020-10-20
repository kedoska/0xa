import * as express from 'express'
import * as request from 'supertest'

import {Client} from '../src/clients'

test('Get user data filtered by user id (single only)', function (done) {
  const app = express()
  request(app)
    .get('/v1/users/a0ece5db-cd14-4f21-812f-966633e7be86')
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      if (err) return done(err)
      // the body should be a single object (if ID is correct)
      const data = res.body as Client
      expect(data.email).toBe('britneyblankenship@quotezart.com')
      expect(data.role).toBe('admin')
      done()
    })
})

test('Get user data filtered by user name (multiple possible)', function (done) {
  const app = express()
  request(app)
    .get('/v1/users/?name=Jerry')
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      if (err) return done(err)
      // the body should be an array of objects (if multiple customers with the same name are available)
      const data = res.body as Client[]
      expect(data.length).toBeGreaterThanOrEqual(1) // MAKE SURE you have at least a Jerry in the CLIENT_ENDPOINT
      done()
    })
})

test('Get the list of policies linked to a user id', function (done) {
  const app = express()
  request(app)
    .get('/v1/users/a0ece5db-cd14-4f21-812f-966633e7be86/policies')
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      if (err) return done(err)
      // the body should be a single object (if ID is correct)
      const data = res.body as Client
      expect(data.email).toBe('britneyblankenship@quotezart.com')
      expect(data.role).toBe('admin')
      done()
    })
})
