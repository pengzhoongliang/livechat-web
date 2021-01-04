import request from '@/utils/request';
import { praseStrEmpty } from "@/utils/nst";

export function listSuggestion(query) {
    return request({
        url: '/buz/suggestion/list',
        method: 'get',
        params: query
    })
}

export function updateSuggestion(data) {
    return request({
        url: '/buz/suggestion',
        method: 'put',
        data: data
    })
}

export function getSuggestion(query) {
    return request({
        url: '/buz/suggestion',
        method: 'get',
        params: query
    })
}

export function deleteSuggestion(id) {
    return request({
        url: '/buz/suggestion/remove/'+praseStrEmpty(id),
        method: 'delete',
    })
}
