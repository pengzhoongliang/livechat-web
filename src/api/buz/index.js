import request from '@/utils/request'

// 获取数据统计信息
export function caseCount() {
    return request({
        url: '/buz/case/caseCount',
        method: 'get',
    })
}

// 按类型统计问题记录
export function caseByType(query) {
    return request({
        url: '/buz/case/caseByType',
        method: 'get',
        params: query
    })
}

// 按区域统计问题记录
export function caseByZone(query) {
    return request({
        url: '/buz/case/caseByZone',
        method: 'get',
        params: query
    })
}

// 按部门统计问题记录
export function caseByDepartment(query) {
    return request({
        url: '/buz/case/caseByDepartment',
        method: 'get',
        params: query
    })
}

// 按分类获取本周类型问题记录
export function caseByTypeAndWeek() {
    return request({
        url: '/buz/case/caseByTypeAndWeek',
        method: 'get',
    })
}

// 按部门获取本周类型问题记录
export function caseByDeptAndWeek() {
    return request({
        url: '/buz/case/caseByDeptAndWeek',
        method: 'get',
    })
}

