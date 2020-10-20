import * as express from 'express'
import * as request from 'supertest'

import {Client} from '../src/clients'
import {Policy} from '../src/policies'

import router, {RouterProps} from '../src/api'

const app = express()
beforeAll(() => {
  const routerProps: RouterProps = {
    clientEndpoint: process.env['CLIENT_ENDPOINT'] || '',
    policyendpoint: process.env['POLICY_ENDPOINT'] || '',
    // during this test we are always authorized
    authorization: () => (req: express.Request, res: express.Response, next: express.NextFunction) => next()
  }
  app.use(router(routerProps))
})

test('Get user data filtered by user id (single only)', function (done) {
  request(app)
    .get('/v1/users/a0ece5db-cd14-4f21-812f-966633e7be86')
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      if (err) return done(err)
      // the body should be a single object (if ID is correct)
      const data = res.body
      expect(data.email).toBe('britneyblankenship@quotezart.com')
      expect(data.role).toBe('admin')
      done()
    })
})

test('Get user data  (multiple possible)', function (done) {
  request(app)
    .get('/v1/users')
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

test('Get user data filtered by user name (multiple possible)', function (done) {
  request(app)
    .get('/v1/users/?name=Jerry')
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      if (err) return done(err)
      // the body should be an array of objects (if multiple customers with the same name are available)
      const data = res.body as Client[]
      expect(data.length).toBeGreaterThanOrEqual(1) // MAKE SURE you have at least a Jerry in the CLIENT_ENDPOINT
      expect(data[0].name).toBe('Jerry')
      done()
    })
})

test('Get the list of policies linked to a user id', function (done) {
  request(app)
    .get('/v1/users/a0ece5db-cd14-4f21-812f-966633e7be86/policies')
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      if (err) return done(err)
      // the body could be an array of objects 
      const data = res.body as Policy[]
      expect(data.length).toBeGreaterThanOrEqual(1)
      done()
    })
})
