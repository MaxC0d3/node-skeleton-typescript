/**
 * Environmnet Constants
 */

const DEFAULT_PORT = 3000
const PORT =
  process.env.SERVER_PORT === undefined ? DEFAULT_PORT : Number.parseInt(process.env.SERVER_PORT)
const API_PREFIX = process.env.API_PREFIX === undefined ? 'api' : process.env.API_PREFIX
const API_VERSION = process.env.API_VERSION === undefined ? 'v1' : process.env.API_VERSION

export const ENV_CONFIG = {
  DEFAULT_PORT,
  PORT,
  API_PREFIX,
  API_VERSION,
}
