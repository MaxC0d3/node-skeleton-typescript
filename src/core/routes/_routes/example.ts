import { Request, Response } from 'express'

export default function example(req: Request, res: Response) {
  res.json({ message: 'Example route dynamic' })
}
