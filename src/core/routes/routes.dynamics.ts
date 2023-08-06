import { Application, Request, Response } from 'express'
import * as fs from 'fs'
import { ENV_CONFIG } from '../../config/env.config'

interface RouteClass {
  (req: Request, res: Response): void
}

interface RouteData {
  routeUrl: string
  routeClass: RouteClass
}

export class RoutesDynamics {
  private readonly routesUrl: string[] = []
  private routesRead: RouteData[] = []
  private _apiPrefix: string = ENV_CONFIG.API_PREFIX
  private _apiVersion: string = ENV_CONFIG.API_VERSION

  constructor(private readonly app: Application) {
    this.routesUrl = fs.readdirSync(`${__dirname}/_routes`)
    this.loadRoutes()
  }

  private async importRouteClass(routeUrl: string): Promise<RouteClass> {
    const routeModule = await import(`${__dirname}/_routes/${routeUrl}`)
    return routeModule.default
  }

  private loadRoutes(): void {
    this.routesUrl.forEach(async (routeUrl: string) => {
      try {
        const routeUrlReplaced = routeUrl.replace('.ts', '')
        const routeClass = await this.importRouteClass(routeUrl)
        this.routesRead.push({
          routeUrl: routeUrlReplaced,
          routeClass,
        })

        const apiRoute = `/${this._apiPrefix}/${this._apiVersion}/${routeUrlReplaced}`
        console.log(apiRoute)

        this.app.use(apiRoute, (req, res) => {
          routeClass(req, res)
        })
      } catch (err) {
        console.error(err)
      }
    })
  }
}
