import { createTestAccount, createTransport } from "nodemailer"
import hbs from "nodemailer-express-handlebars"
import Mail, { Options } from "nodemailer/lib/mailer";
import { CustomAPIError } from "../errors";
import { MAILER_EMAIL_ADDRESS, MAILER_EMAIL_PASS, TEST_ENV } from "../config";

type ExtendedOptions = Options & { template: string, context: object };


interface ISMTPConfig {
    host?: string
    port?: number
    secure?: boolean
    user?: string
    password?: string
}

class SysEmail {
    host: string
    port: number
    secure: boolean
    user: string
    password: string


    constructor(SMTPConfig?: ISMTPConfig, test: boolean = false) {
        this.host = SMTPConfig?.host || "smtp.ethereal.email"
        this.port = SMTPConfig?.port || 587
        this.secure = SMTPConfig?.secure || false
        this.user = SMTPConfig?.user || MAILER_EMAIL_ADDRESS
        this.password = SMTPConfig?.password || MAILER_EMAIL_PASS
    }

    async getTransporter() {
        if (!this.password || !this.user) {
            throw new CustomAPIError("MAILER INFO MISSING")
        }

        const transporter = createTransport({
            service: "gmail",
            auth: {
                user: this.user,
                pass: this.password,
            },
        })
        return transporter
    }

    async sendEmail(
        recipient: string,
        from: string,
        context: object,
        template: string,
        subject: string) {
        const transporter = await this.getTransporter()
        transporter.use("compile", hbs({
            viewEngine: {
                extname: '.hbs',
                layoutsDir: 'source/mailing/templates/',
                defaultLayout: false,
                partialsDir: 'source/mailing/templates/partials',
            },
            viewPath: 'source/mailing/templates/',
            extName: '.hbs'
        }))
        const options: ExtendedOptions = {
            from,
            to: recipient,
            subject,
            template,
            context
        }
        // await transporter.verify()
        await transporter.sendMail(options)
    }
}


export default new SysEmail({}, TEST_ENV)
