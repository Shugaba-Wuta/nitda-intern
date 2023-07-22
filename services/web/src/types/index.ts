import React from "react";

export interface IChildren {
    children: React.ReactElement
}
export interface IGenericAPIResponse {
    message: string
    result: any,
    success: boolean
}