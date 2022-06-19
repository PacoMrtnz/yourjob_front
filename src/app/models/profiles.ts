export interface Profile {
    account: string,
    avatar: string,
    curriculum: string,
    social: {
        website ?: string,
        github ?: string,
        twitter ?: string,
        instagram ?: string 
    }
    createdAt?: string,
    updatedAt?: string,
    _id?: string
}