import axios from "axios"
import { PAYSTACK_AUTH_TOKEN } from "../config";
import { BadGatewayError, BadRequestError } from "../errors";
import { IRequest } from "request";
import { Response } from "express";

export const getBankName = async (req: IRequest, res: Response) => {
    const { accountNumber, bankCode } = req.body
    if (!PAYSTACK_AUTH_TOKEN?.length || accountNumber?.length < 10 || !bankCode?.length) throw new BadRequestError("Invalid account number or bank code")
    try {
        const response = await axios.get(`https://api.paystack.co/bank/resolve?account_number=${accountNumber}&bank_code=${bankCode}`, {
            headers: {
                Authorization: `Bearer ${PAYSTACK_AUTH_TOKEN}`,
            },
        })
        return res.json(response.data)
    }
    catch (error) {
        throw new BadGatewayError("Unable to verify account details")
    }
}