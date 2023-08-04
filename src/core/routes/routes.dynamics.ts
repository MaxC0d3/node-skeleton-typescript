import { Application } from 'express'
import * as fs from 'fs'
import { ENV_CONFIG } from '../../config/env.config'

interface RoutesDynamicsI {
  routeUrl: string
  routeClass: any
}

export class RoutesDynamics {
  private readonly routesUrl: any[] = []
  private routesRead: RoutesDynamicsI[] = []
  private _apiPrefix: string = ENV_CONFIG.API_PREFIX
  private _apiVersion: string = ENV_CONFIG.API_VERSION

  constructor(private readonly app: Application) {
    this.routesUrl = fs.readdirSync(`${__dirname}/_routes`)

    this.routesUrl.forEach((routeUrl: string) => {
      try {
        const routeUrlReplaced = routeUrl.replace('.ts', '')
        const route = import(`${__dirname}/_routes/${routeUrl}`)

        const routeClass = route.then((route: any) => route.default).then((route: any) => route)

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
    this.routesRead.forEach((route: any) => {
      const routeExtracted = route.routeClass.then((route: any) => route)

      const apiRoute = `/${this._apiPrefix}/${this._apiVersion}/${route.routeUrl}`

      console.log(apiRoute)

      this.app.use(`/${this._apiPrefix}/${this._apiVersion}/${route.routeUrl}`, (req, res) => {
        routeExtracted.then((route: any) => route(req, res))
      })
    })
  }
}
