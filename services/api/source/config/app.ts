import express from "express"
import morgan from "morgan"
import helmet from "helmet"
import cors from "cors"
import xss from "xss-clean"
import cookieParser from "cookie-parser"
import fileUpload from "express-fileupload"
const expressAsyncErrors = require("express-async-errors")






//Local imports
import { notFound as notFoundMiddleware } from "../middleware/not-found"
import { errorHandlerMiddleware } from '../middleware/error-handler'
import { connectDB } from '../db/connect'
import { attachUserToRequest } from '../middleware/auth'
import authRouter from "../routers/auth-route"
import userRouter from "../routers/user-route"
import payrollRouter from "../routers/payroll-route"
import { MAX_FILE_UPLOAD_IN_MB } from "./data"
import { APP_PORT, COOKIE_SECRET, MONGO_DB_URL } from '.'

const app = express()
app.set("trust-proxy", 1)

//Top-level middlewares

app.use(helmet());
app.use(cors());
app.use(xss());
app.use(cors())
app.use(express.json());
app.use(cookieParser(COOKIE_SECRET))

app.use(morgan("tiny"))
//Unauthenticated paths
app.use("/api/auth", authRouter)








//Low-level middlewares
app.use(attachUserToRequest)
app.use(fileUpload({
    createParentPath: true,
    safeFileNames: true,
    preserveExtension: true,
    abortOnLimit: true,
    limits: { fileSize: MAX_FILE_UPLOAD_IN_MB * 1024 * 1024 }
}))



//Authenticated paths
app.use("/api/users", userRouter)
app.use("/api/payroll", payrollRouter)
app.use(notFoundMiddleware)


//errorHandler for throwing HTTP >= 400
app.use(errorHandlerMiddleware)



const startApp = async () => {
    try {
        await connectDB(MONGO_DB_URL)
        app.listen(APP_PORT, async () => {
            console.log(`Server is running on Port: ${APP_PORT} ......................................`)
        })
    } catch (error) {
        console.log(error)
    }

}





export default startApp