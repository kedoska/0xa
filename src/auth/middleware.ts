import { NextFunction, Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'

export const getScopes = (scopes: string): string[] => scopes.split(',')

export interface TokenObject {
  id: string
  scope: string
  iat?: number
}

export const requiredRules = (scopes: string, secret: string) => (req: Request, res: Response, next: NextFunction) => {
  let token: string = ''
  try {
    const { authorization = '' } = req.headers
    const [scheme, credentials] = authorization.split(' ')
    if (!scheme || scheme !== 'Bearer' || !credentials) {
      return res.status(401).send()
    }
    token = credentials
  } catch ({ message }) {
    return res.status(401).send()
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).send()
    }

    const obj = decoded as TokenObject

    const { scope = 'unknown' } = obj
    const authorized = getScopes(scopes).find((x) => x === scope) !== undefined

    if (!authorized) {
      return res.status(401).send()
    }

    next()
  })
}

export const tokenize = (obj: TokenObject, secret: string): Promise<string> =>
  new Promise((resolve, reject) => {
    try {
      const token = jwt.sign(obj, secret, { expiresIn: 60 * 60 })
      resolve(token)
    } catch (err) {
      reject(err)
    }
  })
