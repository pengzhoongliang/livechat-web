import request from '@/utils/request'
// 新增商品
export function addGoods(data) {
    return request({
      url: '/buz/goods',
      method: 'post',
      data: data
    })
}

// 查询商品列表
export function listGoods(query) {
    return request({
      url: '/buz/goods/list',
      method: 'get',
      params: query
    })
}

// 查询文商品分类单条记录
export function getGoods(id) {
    return request({
      url: '/buz/goods/' + id,
      method: 'get'
    })
}
// 修改商品
export function updateGoods(data) {
    return request({
      url: 'buz/goods/',
      method: 'put',
      data: data
    })
}

// 删除商品信息
export function delGoods(id) {
    return request({
      url: '/buz/goods/remove/' + id,
      method: 'delete'
    })
}
