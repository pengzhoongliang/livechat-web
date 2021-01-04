import request from '@/utils/request';
import { praseStrEmpty } from "@/utils/nst";
export function listHairdresser(query) {
    return request({
        url: '/buz/hairdresser/list',
        method: 'get',
        params: query
    })
}

export function insertHairdresser(data) {
    return request({
        url: '/buz/hairdresser',
        method: 'post',
        data: data
    })
}

export function updateHairdresser(data) {
    return request({
        url: '/buz/hairdresser',
        method: 'put',
        data: data
    })
}

export function getHairdresser(id) {
    return request({
        url: '/buz/hairdresser/'+praseStrEmpty(id),
        method: 'get',
    })
}

export function deleteHairdresser(id) {
    return request({
        url: '/buz/hairdresser/remove/'+praseStrEmpty(id),
        method: 'delete',
    })
}