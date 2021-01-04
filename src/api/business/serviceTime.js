import request from '@/utils/request';
import { praseStrEmpty } from "@/utils/nst";
export function listHairdresser(query) {
    return request({
        url: '/buz/appointment-period/list',
        method: 'get',
        params: query
    })
}

export function insertHairdresser(data) {
    return request({
        url: '/buz/appointment-period',
        method: 'post',
        data: data
    })
}

export function updateHairdresser(data) {
    return request({
        url: '/buz/appointment-period',
        method: 'put',
        data: data
    })
}

export function getHairdresser(id) {
    return request({
        url: '/buz/appointment-period/'+praseStrEmpty(id),
        method: 'get',
    })
}

export function deleteHairdresser(id) {
    return request({
        url: '/buz/appointment-period/remove/'+praseStrEmpty(id),
        method: 'delete',
    })
}