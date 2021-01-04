import request from '@/utils/request'
// 新增商品分类
export function addGoodsCategory(data) {
    return request({
      url: '/buz/goods-category',
      method: 'post',
      data: data
    })
}

// 查询商品分类列表
export function listGoodsCategory(query) {
    return request({
      url: '/buz/goods-category/list',
      method: 'get',
      params: query
    })
}

// 查询文商品分类单条记录
export function getGoodsCategory(id) {
    return request({
      url: '/buz/goods-category/' + id,
      method: 'get'
    })
}
// 修改商品分类
export function updateGoodsCategory(data) {
    return request({
      url: 'buz/goods-category/',
      method: 'put',
      data: data
    })
}

// 删除商品分类信息
export function delGoodsCategory(id) {
    return request({
      url: '/buz/goods-category/remove/' + id,
      method: 'delete'
    })
}
