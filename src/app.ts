import express from 'express'
import { HealthRoutes } from './core/routes/health.routes'
import { MainRoutes } from './core/routes/main.routes'
import { Routes } from './core/routes/routes'
import {RoutesDynamics} from "./core/routes/routes.dynamics";

export default class App {
  public expressApp: express.Application
  public port: number

  private routes: any[]

  constructor(port: number, middlewares?: any[]) {
    this.expressApp = express() //run the express instance and store in app
    this.port = port
    this.middlewares(middlewares)

    this.routes = [new MainRoutes(this.expressApp), new HealthRoutes(this.expressApp), new RoutesDynamics(this.expressApp)]
  }

  private middlewares(middlewares?: any[]) {
    middlewares?.forEach((middleware) => {
      this.expressApp.use(middleware)
    })
  }

  public listen() {
    this.expressApp.listen(this.port, () => {
      console.log('--------------------------------------------------')
      console.log(`Server listening on: http://localhost:${this.port}`)
      console.log('--------------------------------------------------')
    })
  }
}
