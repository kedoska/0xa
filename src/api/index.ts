import 'whatwg-fetch'
import { RequestHandler, Router, urlencoded } from 'express'
import clients from '../clients'
import policies from '../policies'
import { tokenize } from '../auth/middleware'

export interface RouterProps {
  clientEndpoint: string
  policyendpoint: string
  tokenSecret: string
  authorization: (roles: string, secret: string) => RequestHandler
}

export default (props: RouterProps): Router => {
  const router = Router()
  router.use(urlencoded({ extended: false }))

  router.get('/v1/users', props.authorization('user,admin,owner', props.tokenSecret), async (req, res) => {
    const { name = '' } = req.query
    const data = await clients(props.clientEndpoint)
    if (!data.clients) {
      return res.send([])
    }
    if (!name) {
      res.send(data.clients)
    } else {
      res.send(data.clients.filter((x) => x.name === name))
    }
  })

  router.get('/v1/users/:id', props.authorization('user,admin,owner', props.tokenSecret), async (req, res) => {
    const { id = '' } = req.params
    if (!id) {
      return res.status(400).send()
    }
    const data = await clients(props.clientEndpoint)
    if (!data.clients) {
      return res.status(404).send()
    }
    const results = data.clients.filter((x) => x.id === id)
    if (!results.length) {
      return res.status(404).send()
    }
    res.send(results[0])
  })

  router.get('/v1/users/:id/policies', props.authorization('admin,owner', props.tokenSecret), async (req, res) => {
    const { id = '' } = req.params
    if (!id) {
      return res.status(400).send()
    }
    const data = await policies(props.policyendpoint)
    if (!data.policies) {
      return res.status(404).send()
    }

    const results = data.policies.filter((x) => x.clientId === id)
    if (!results.length) {
      return res.status(404).send()
    }
    res.send(results)
  })

  router.get('/auth', async (req, res) => {
    const { email = '' } = req.query
    if (!email) {
      return res.status(400).send()
    }
    const data = await clients(props.clientEndpoint)
    if (!data.clients) {
      return res.status(404).send()
    }
    const client = data.clients.find((x) => x.email === email)
    if (!client) {
      return res.status(401).send()
    }

    const token = await tokenize(
      {
        id: client.id,
        scope: client.role,
      },
      props.tokenSecret,
    )

    res.send({
      access_token: token,
      token_type: 'Bearer',
      expires_in: 3600,
    })
  })

  return router
}
