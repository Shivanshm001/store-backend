
export type UserRole = "user" | "admin";

export interface IUsers {
    username: string,
    password: string,
    refreshToken: string | null,
    role: UserRole,
    userId: string,
    wishlist: string[],
    cart: string[]
}