import * as express from 'express'
import * as request from 'supertest'
import * as jwt from 'jsonwebtoken'
import router, { RouterProps } from '../src/api'
import { requiredRules, tokenize } from '../src/auth/middleware'
import { Client } from '../src/clients'

const tokenSecret = process.env['TOKEN_SECRET'] || ''

const app = express()
beforeAll(() => {
  const routerProps: RouterProps = {
    clientEndpoint: process.env['CLIENT_ENDPOINT'] || '',
    policyendpoint: process.env['POLICY_ENDPOINT'] || '',
    tokenSecret,
    authorization: requiredRules,
  }
  app.use(router(routerProps))
})

it('should fail without token', (done) => {
  request(app)
    .get('/v1/users/a0ece5db-cd14-4f21-812f-966633e7be86')
    .expect(401)
    .end(done)
})

it('should authorize and admin via Bearer token', async (done) => {

  const id = 'a0ece5db-cd14-4f21-812f-966633e7be86'
  const scope = 'admin'
  const token = await tokenize({id, scope}, tokenSecret)

  request(app)
    .get('/v1/users')
    .set('Authorization', 'Bearer ' + token)
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      if (err) return done(err)
      const data = res.body as Client[]
      expect(data.length).toBeGreaterThanOrEqual(1) // MAKE SURE you have at least a Jerry in the CLIENT_ENDPOINT
      done()
    })
})

it('should deny access to user', async (done) => {

  const id = 'a3b8d425-2b60-4ad7-becc-bedf2ef860bd'
  const scope = 'user'
  const token = await tokenize({id, scope}, tokenSecret)

  request(app)
    .get('/v1/users/a3b8d425-2b60-4ad7-becc-bedf2ef860bd/policies')
    .set('Authorization', 'Bearer ' + token)
    .expect(401)
    .end(done)
})
