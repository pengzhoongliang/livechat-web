import request from '@/utils/request';
import { praseStrEmpty } from "@/utils/nst";

export function listStoreBuyLog(query) {
    return request({
        url: '/buz/store/buy/list',
        method: 'get',
        params: query
    })
}

// export function selectStoreBuyLog(query) {
//     return request({
//         url: '/buz/store/buy',
//         method: 'get',
//         params: query
//     })
// }
