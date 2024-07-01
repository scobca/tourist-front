import ApiResolverUtil from "@/api/utils/api-resolver.util";
import type {CreateUserInputDto} from "@/api/modules/auth/dto/create-user-input.dto";
import type {LoginUserInputDto} from "@/api/modules/auth/dto/login-user-input.dto";

export class AuthModel extends ApiResolverUtil {
    constructor() {
        super('auth');
    }

    async createUser(data: CreateUserInputDto) {
        if (data.password == data.verify_password) {
            return await this.request('createUser', 'POST', data).then((res: any) => {
                if (res.status == 200) {
                    const user: LoginUserInputDto = {
                        login: data.login,
                        password: data.password,
                    }

                    return this.loginUser(user)
                }
            }).catch((err: any) => {
                if (err.response.status == 409) {
                    console.log('Error message: Double record user')
                }
            })
        } else {
            console.log("Passwords doesn't match.")
        }
    }

    async loginUser(data: LoginUserInputDto) {
        return await this.request('loginUser', 'POST', data).then((res: any) => {
            if (res.status == 200) {
                console.log(res.data);
                localStorage.setItem('token', res.data.token)
            }
        }).catch((err: any) => {
            if (err.response.status == 402) {
                console.log('Error message: User with this data not exist')
            }
        })
    }

    async logoutUser() {
        await localStorage.removeItem('token');
    }
}