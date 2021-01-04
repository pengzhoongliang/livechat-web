import request from '@/utils/request';
import { praseStrEmpty } from "@/utils/nst";
export function listVip(query) {
    return request({
        url: '/buz/vip/list',
        method: 'get',
        params: query
    })
}

export function insertVip(data) {
    return request({
        url: '/buz/vip',
        method: 'post',
        data: data
    })
}

export function updateVip(data) {
    return request({
        url: '/buz/vip',
        method: 'put',
        data: data
    })
}

export function getVip(id) {
    return request({
        url: '/buz/vip/'+praseStrEmpty(id),
        method: 'get',
    })
}

export function deleteVip(id) {
    return request({
        url: '/buz/vip/remove/'+praseStrEmpty(id),
        method: 'delete',
    })
}