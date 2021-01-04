import request from '@/utils/request';
import { praseStrEmpty } from "@/utils/nst";

export function listServiceevalution(query) {
    return request({
        url: '/buz/serviceevalution/list',
        method: 'get',
        params: query
    })
}

export function updateServiceevalution(data) {
    return request({
        url: '/buz/serviceevalution',
        method: 'put',
        data: data
    })
}

export function getServiceevalution(query) {
    return request({
        url: '/buz/serviceevalution/getListByHairdresserDetails',
        method: 'get',
        params: query
    })
}

export function deleteServiceevalution(id) {
    return request({
        url: '/buz/serviceevalution/remove/'+praseStrEmpty(id),
        method: 'delete',
    })
}
