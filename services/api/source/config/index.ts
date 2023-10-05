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
const MONGO_DB_DBNAME = process.env?.MONGO_DB_DBNAME
const NODE_ENV = process.env?.NODE_ENV as string

export const APP_PORT = parseInt(process.env?.APP_PORT as string)
export const COOKIE_SECRET = process.env?.COOKIE_SECRET
export const TEST_ENV = ["DEV", "TEST", "STAGING"].includes(NODE_ENV)
export const JWT_TOKEN_SECRET = process.env?.JWT_TOKEN_SECRET as string
export const MONGO_DB_URL = `mongodb://${MONGO_ROOT_USERNAME}:${MONGO_ROOT_PASSWORD}@${MONGO_DB_HOST}:${MONGO_PORT}/${MONGO_DB_DBNAME}` as string

export const MAILER_EMAIL_PASS = process.env?.MAILER_EMAIL_PASS as string
export const MAILER_EMAIL_ADDRESS = process.env?.MAILER_EMAIL_ADDRESS as string


export const ADMIN_CREDENTIALS = {
    firstName: process.env?.ADMIN_FIRST_NAME as string,
    lastName: process.env?.ADMIN_LAST_NAME as string,
    email: process.env?.ADMIN_EMAIL as string,
    password: process.env?.ADMIN_PASSWORD as string
}

export const PAYSTACK_AUTH_TOKEN = process.env?.PAYSTACK_AUTH_TOKEN as string