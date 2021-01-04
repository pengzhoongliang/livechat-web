import request from '@/utils/request'

// 查询打赏列表
export function listReward(query) {
    return request({
      url: '/buz/reward/list',
      method: 'get',
      params: query
    })
}

// 查询打赏单条记录
export function getRewar(id) {
    return request({
      url: '/buz/reward/' + id,
      method: 'get'
    })
}
