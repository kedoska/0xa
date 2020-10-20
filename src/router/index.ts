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

  return router
}
