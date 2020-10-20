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

  return router
}
