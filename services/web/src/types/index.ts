import React from "react";

export interface IChildren {
    children: React.ReactElement
}
export interface IGenericAPIResponse {
    message: string
    result: object | object[],
    success: boolean
    error?: boolean
}