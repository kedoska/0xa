import * as express from 'express'
import * as request from 'supertest'
import router, { RouterProps } from '../src/api'
import { requiredRules } from '../src/auth/middleware'
import { Client } from '../src/clients'

const app = express()
beforeAll(() => {
  const routerProps: RouterProps = {
    clientEndpoint: process.env['CLIENT_ENDPOINT'] || '',
    policyendpoint: process.env['POLICY_ENDPOINT'] || '',
    authorization: requiredRules,
  }
  app.use(router(routerProps))
})

it('should fail without token', function (done) {
  request(app)
    .get('/v1/users/a0ece5db-cd14-4f21-812f-966633e7be86')
    .expect(401)
    .end((err, res) => done())
})

it('should respond with data with vali', function (done) {
  request(app)
    .get('/v1/users')
    .set('Authorization', 'Bearer ' + '123-321')
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      if (err) return done(err)
      const data = res.body as Client[]
      expect(data.length).toBeGreaterThanOrEqual(1) // MAKE SURE you have at least a Jerry in the CLIENT_ENDPOINT
      done()
    })
})
