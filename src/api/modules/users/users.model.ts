import ApiResolverUtil from "@/api/utils/api-resolver.util";
import type {UserInputDto} from "@/api/modules/users/dto/user-input.dto";

export class UsersModel extends ApiResolverUtil {
    constructor() {
        super('users');
    }

    async getAll() {
        return await this.request('getAll', 'GET').then((res: any) => {
            if (res.status == 200) {
                console.log(res.data);
            }
        })
    }

    async getUser(data: UserInputDto) {
        return await this.request('getUser', "POST", data).then((res: any) => {
            if (res.status == 200) {
                console.log(res.data);
            }
        }).catch((err: any) => {
            if (err.response.status == 402) {
                console.log("Error message: User with this credits not exists")
            }
        })
    }

    async getUserByID(data: {id: number}) {
        return await this.request('getByID', 'POST', data).then((res: any) => {
            if (res.status == 200) {
                console.log(res.data);
            }
        }).catch((err: any) => {
            if (err.response.status == 402) {
                console.log("Error message: User with this ID not exists")
            }
        })
    }

    async deleteUserByID(data: {id: number}) {
        return await this.request('deleteByID', 'DELETE', data).then((res: any) => {
            if (res.status == 200) {
                console.log(res.data.message);
            }
        }).catch((err: any) => {
            if (err.response.status == 402) {
                console.log('Error message: User with this ID not exist')
            }
        })
    }
}