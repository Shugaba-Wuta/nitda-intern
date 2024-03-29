import jwt, { decode } from "jsonwebtoken"
import { token } from "morgan"
import { COOKIE_DURATION, TOKEN_DURATION } from "../config/data"
import { BadRequestError } from "../errors"
import { JWT_TOKEN_SECRET } from "../config"



export const createJWT = (payload: object, type: string = "token") => {
    if (!JWT_TOKEN_SECRET) {
        throw new Error("variable: JWT_TOKEN_SECRET is missing")
    }
    if (type === "token") {
        return jwt.sign(payload, JWT_TOKEN_SECRET, { expiresIn: TOKEN_DURATION })
    } else if (type === "cookie") {
        return jwt.sign(payload, JWT_TOKEN_SECRET, { expiresIn: COOKIE_DURATION })
    } else if (type === "refresh") {
        return jwt.sign(payload, JWT_TOKEN_SECRET, { expiresIn: TOKEN_DURATION, })
    } else {
        throw new Error(`token: invalid type ${type}`)
    }
}

export const isTokenValid = (token: string) => {
    if (!JWT_TOKEN_SECRET) {
        throw new Error("variable: JWT_TOKEN_SECRET is missing")
    }
    return jwt.verify(token, JWT_TOKEN_SECRET, (error, decode) => {
        if (error) return false
        return true
    })
}

export const decodeToken = async (token: string) => {
    if (!JWT_TOKEN_SECRET) {
        throw new Error("variable: JWT_TOKEN_SECRET is missing")
    }
    const decoded = jwt.verify(token, JWT_TOKEN_SECRET)
    if (decoded) {
        return decoded instanceof String ? JSON.parse(String(decoded)) : decoded
    }
    throw new BadRequestError("Authentication failed: invalid token")
}


