import { NextFunction, Request, Response } from 'express'

export const getScopes = (scopes: string): string[] => scopes.split(',')

export const requiredRules = (scopes: string) => (req: Request, res: Response, next: NextFunction) => {
  try {
    const {authorization = ''} = req.headers
    const [scheme, token] = authorization.split(' ')
    if (!scheme || scheme !== 'Bearer' || !token) {
      return res.status(401).send()
    }
  } catch ({message}) {
    return res.status(401).send()
  }

  const scope = 'xxx'
  const authorized = getScopes(scopes).find(x => x === scope) !== undefined

  if (!authorized) {
    return res.status(401).send()
  }

  next()
}
