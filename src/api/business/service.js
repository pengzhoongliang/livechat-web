import request from '@/utils/request';
import { praseStrEmpty } from "@/utils/nst";
export function listHairdresser(query) {
    return request({
        url: '/buz/serviceType/list',
        method: 'get',
        params: query
    })
}

export function insertHairdresser(data) {
    return request({
        url: '/buz/serviceType',
        method: 'post',
        data:data
    })
}

export function updateHairdresser(data) {
    return request({
        url: '/buz/serviceType',
        method: 'put',
        data: data
    })
}

export function getHairdresser(id) {
    return request({
        url: '/buz/serviceType/'+praseStrEmpty(id),
        method: 'get',
    })
}

export function deleteHairdresser(id) {
    return request({
        url: '/buz/serviceType/remove/'+praseStrEmpty(id),
        method: 'delete',
    })
}