
export type UserRole = "user" | "admin";

export interface IUsers {
    username: string,
    password: string,
    role: UserRole,
    userId: string,
    wishlist: string[],
    cart: string[]
}