import { config } from 'dotenv'
config()
import * as express from 'express'
import * as cluster from 'cluster'
import { cpus } from 'os'

import api, { RouterProps } from './api'
import { requiredRules } from './auth/middleware'

cluster.on('exit', (worker: cluster.Worker) => {
  console.log('Worker %d died :(', worker.id)
  cluster.fork()
})

if (cluster.isMaster) {
  const cpuCount = cpus().length
  for (let i = 0; i < cpuCount; i += 1) {
    cluster.fork()
  }
} else {
  ;(async () => {
    const app = express()
    const routerProps: RouterProps = {
      clientEndpoint: process.env['CLIENT_ENDPOINT'] || '',
      policyendpoint: process.env['POLICY_ENDPOINT'] || '',
      tokenSecret: process.env['TOKEN_SECRET'] || '',
      authorization: requiredRules,
    }
    app.use(api(routerProps))

    const port = process.env['PORT']

    app.listen(port, () => {
      console.log(`running on ${port}`)
    })
  })()
}
