import axios from "axios";
import apiConf from "@/api/conf/api.conf";

export default class ApiResolverUtil {
    endpoint = ""

    constructor(endpoint: string) {
        this.endpoint = endpoint
    }

    async request(url: string, method: string, data: any) {
        url = `${apiConf.endpoint}/${this.endpoint}/${url}`
        return await (new Promise((resolve, reject) => axios({
            url,
            method,
            data
        }).then(async (response: any) => {
            resolve(response)
        }).catch(async (error: any) => {
            reject(error)
        })))
    }
}