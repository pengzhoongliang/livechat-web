import request from '@/utils/request';
import { praseStrEmpty } from "@/utils/nst";
export function listStatistical(query) {
    return request({
        url: '/buz/statistical/list',
        method: 'get',
        params: query
    })
}

export function insertStatistical(data) {
    return request({
        url: '/buz/statistical',
        method: 'post',
        data: data
    })
}

export function updateStatistical(data) {
    return request({
        url: '/buz/statistical',
        method: 'put',
        data: data
    })
}

export function getStatistical(id) {
    return request({
        url: '/buz/statistical/'+praseStrEmpty(id),
        method: 'get',
    })
}

export function deleteStatistical(id) {
    return request({
        url: '/buz/statistical/remove/'+praseStrEmpty(id),
        method: 'delete',
    })
}
