import { UserEntity } from "./database/entities/user.entity.ts";

declare global {
    namespace Express {
        interface Request {
            user: UserEntity | null
        }
    }
}

export { }