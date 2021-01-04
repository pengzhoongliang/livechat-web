import request from '@/utils/request';
import { praseStrEmpty } from "@/utils/nst";

export function listMember(query) {
    return request({
        url: '/buz/article/consumer/members',
        method: 'get',
        params: query
    })
}

// 根据订单编号启用/停用
export function updateStatusInfo(data) {
    return request({
        url: '/buz/article/consumerVip/updateStatusInfo',
        method: 'post',
        params: data
    })
}

// 根据订单编号查询会员信息
export function getBuzConsumerVip(query) {
    return request({
        url: '/buz/article/consumerVip/getBuzConsumerVip',
        method: 'post',
        params: query

    })
}

// 根据订单编号查询会员信息
export function updateConsumerVip(data) {
    return request({
        url: '/buz/article/consumerVip/',
        method: 'put',
        data: data
    })
}

export function selectMembers(query) {
    return request({
        url: '/buz/article/consumer/members',
        method: 'get',
        params: query
    })
}
