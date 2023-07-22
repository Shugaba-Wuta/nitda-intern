/**
 * This file contains all environment variables and app configuration
 *
 */


import * as dotenv from 'dotenv'
dotenv.config()


const MONGO_ROOT_USERNAME = process.env?.MONGO_ROOT_USERNAME
const MONGO_PORT = process.env?.MONGO_PORT
const MONGO_ROOT_PASSWORD = process.env?.MONGO_ROOT_PASSWORD
const MONGO_DB_HOST = process.env?.MONGO_DB_HOST

export const APP_PORT = parseInt(process.env?.APP_PORT as string)
export const COOKIE_SECRET = process.env?.COOKIE_SECRET
export const NODE_ENV = process.env?.NODE_ENV as string
export const JWT_TOKEN_SECRET = process.env?.JWT_TOKEN_SECRET as string
export const MONGO_DB_URL = `mongodb://${MONGO_ROOT_USERNAME}:${MONGO_ROOT_PASSWORD}@mongodb:${MONGO_PORT}` as string

export const MAILER_EMAIL_PASS = process.env?.MAILER_EMAIL_PASS as string
export const MAILER_EMAIL_ADDRESS = process.env?.MAILER_EMAIL_ADDRESS as string
