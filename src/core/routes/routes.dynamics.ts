import { Application, Request, Response } from 'express'
import * as fs from 'fs'

interface RoutesDynamicsI {
  routeUrl: string
  routeClass: any
}

export class RoutesDynamics {
  private readonly routesUrl: any[] = []
  private routesRead: RoutesDynamicsI[] = []

  constructor(private readonly app: Application) {
    this.routesUrl = fs.readdirSync(`${__dirname}/_routes`)

    this.routesUrl.forEach((routeUrl: string) => {
      try {
        const routeUrlReplaced = routeUrl.replace('.ts', '')
        const route = import(`${__dirname}/_routes/${routeUrl}`)

        const routeClass = Promise.resolve(route).then((route) => {
          return new route.default()
        })

        this.routesRead.push({
          routeUrl: routeUrlReplaced,
          routeClass,
        })
      } catch (err) {
        console.error(err)
      }
    })

    this.readRoutes()
  }

  public readRoutes(): void {
    console.log('AAA', this.routesRead)
    this.routesRead.forEach((route: any) => {


      this.app.use(`/${route.routeUrl}`, (req: Request, res: Response) => {
        res.header('Content-Type', 'application/json')

        res.json({ message: 'Hello World' })

      })

    })
  }
}
