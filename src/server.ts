import bodyParser from 'body-parser'
import App from './app'
// Initialize Configuration
import { ENV_CONFIG } from './config/env.config'

// Middlewares
import { CorsMiddleware } from './core/middlewares/cors.middleware'
import { LoggerMiddleware } from './core/middlewares/logger.middleware'

/**
 * App Middlewares
 */
const middlewares = [
  bodyParser.json(),
  new LoggerMiddleware().getMiddleware,
  new CorsMiddleware().getMiddleware,
]

/**
 * Start application
 */
const app = new App(ENV_CONFIG.PORT, middlewares)

app.listen()
