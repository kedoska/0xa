import { NextFunction, Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'

export const getScopes = (scopes: string): string[] => scopes.split(',')

export const requiredRules = (scopes: string, secret: string) => (req: Request, res: Response, next: NextFunction) => {
  let token: string = ''
  try {
    const {authorization = ''} = req.headers
    const [scheme, credentials] = authorization.split(' ')
    if (!scheme || scheme !== 'Bearer' || !credentials) {
      return res.status(401).send()
    }
    token = credentials
  } catch ({message}) {
    return res.status(401).send()
  }

  const scope = 'xxx'
  const authorized = getScopes(scopes).find(x => x === scope) !== undefined

  if (!authorized) {
    return res.status(401).send()
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).send()
    }
    console.log(decoded)

    next()
  })
}
