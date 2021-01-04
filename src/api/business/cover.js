import request from '@/utils/request'
// 新增文章分类
export function addCover(data) {
    return request({
      url: '/buz/article/cover',
      method: 'post',
      data: data
    })
}
// 查询文章分类列表
export function listCover(query) {
    return request({
      url: '/buz/article/cover/list',
      method: 'get',
      params: query
    })
 }

// 查询文章分类单条记录
export function getCover(id) {
    return request({
      url: '/buz/article/cover/' + id,
      method: 'get'
    })
 }
// 修改文章分类
export function updatCover(data) {
    return request({
      url: '/buz/article/cover',
      method: 'put',
      data: data
    })
 }

// 删除文章分类
export function delCover(id) {
    return request({
      url: '/buz/article/cover/remove/' + id,
      method: 'delete'
    })
 }