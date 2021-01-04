import request from '@/utils/request';
import { praseStrEmpty } from "@/utils/nst";

export function queryList(query) {
    return request({
        url: '/buz/appointment/list',
        method: 'get',
        params: query
    })
}

export function deleteAppointment(id) {
    return request({
        url: '/buz/appointment/remove/'+praseStrEmpty(id),
        method: 'delete',
    })
}
export function updateAppointment(data) {
    return request({
        url: '/buz/appointment',
        method: 'put',
        data: data
    })
}

//根据id查询订单记录
export function getAppointment(id) {
    return request({
        url: '/buz/appointment/'+praseStrEmpty(id),
        method: 'get',
    })
}

// 营业统计汇总
export function queryBookingInfoList(query) {
    return request({
        url: '/buz/appointment/selectBookingInfo',
        method: 'get',
        params: query
    })
}
