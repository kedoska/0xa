import 'whatwg-fetch'
import { Router, urlencoded } from "express"
import clients from "../clients"

export interface RouterProps {
  clientEndpoint: string
  policyendpoint: string
}

export default (props: RouterProps): Router => {
  const router = Router()
  router.use(urlencoded({ extended: false }))

  router.get('/v1/users', async (req, res) => {
    const {name = ''} = req.query
    const data = await clients(props.clientEndpoint)
    if (!data.clients) {
      return res.send([])
    }
    if (!name) {
      res.send(data.clients)
    } else {
      res.send(data.clients.filter(x => x.name === name))
    }
  })

  router.get('/v1/users/:id', async (req, res) => {
    const {id = ''} = req.params
    if (!id) {
      return res.status(400).send()
    }
    const data = await clients(props.clientEndpoint)
    if (!data.clients) {
      return res.status(404).send()
    }
    const results = data.clients.filter(x => x.id === id)
    if (!results.length){
      return res.status(404).send()
    }
    res.send(results[0])
  })

  return router
}
