import type {User} from "~/types/models/User";

export interface AuthenticationResponse {
    data: {
        access_token: string,
        user: User
    }
}
