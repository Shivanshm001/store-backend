declare global {
    namespace Express{
        interface Request {
            username: string,
        }
    }
}

export {}