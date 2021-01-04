import request from '@/utils/request'
// 新增商品
export function addGift(data) {
    return request({
      url: '/buz/gift',
      method: 'post',
      data: data
    })
}

// 查询商品列表
export function listGift(query) {
    return request({
      url: '/buz/gift/list',
      method: 'get',
      params: query
    })
}

// 查询文商品分类单条记录
export function getGift(id) {
    return request({
      url: '/buz/gift/' + id,
      method: 'get'
    })
}
// 修改商品
export function updateGift(data) {
    return request({
      url: 'buz/gift/',
      method: 'put',
      data: data
    })
}

// 删除商品信息
export function delGift(id) {
    return request({
      url: '/buz/gift/remove/' + id,
      method: 'delete'
    })
}
