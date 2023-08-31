export interface IDecodedUserInfo {
    userID: string,
    role: string,
    permissions: string,
    email: string,
    sessionID: string,
    iat: number,
    exp: number
}
export interface ILoginPayload {
    password: string,
    email: string
}
export interface IResetPasswordPayload {
    email: string,
    newPassword: string,
    confirmNewPassword: string,
    tokenPurpose: string,
    OTPCode: string

}