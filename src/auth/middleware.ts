import { NextFunction, Request, Response } from 'express'

export const requiredRules = (scopes: string) => (req: Request, res: Response, next: NextFunction) => {
  next()
}
