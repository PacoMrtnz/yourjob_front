export interface Users {
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
    accountType: string,
    verified?: boolean,
    verificationCode?: string,
    resetPasswordToken?: string,
    resetPasswordExpiresIn?: Date,
    inscribed?: any[],
    createdAt?: string,
    updatedAt?: string,
    _id?: string
}
