import request from '@/utils/request'

// 类型列表
export function listPost(query) {
  return request({
    url: '/buz/case/type/list',
    method: 'get',
    params: query
  })
}

// 查询类型详细
export function getPost(postId) {
  return request({
    url: '/buz/case/type/' + postId,
    method: 'get'
  })
}

// 新增类型
export function addPost(data) {
  return request({
    url: '/buz/case/type',
    method: 'post',
    data: data
  })
}

// 修改类型
export function updatePost(data) {
  return request({
    url: '/buz/case/type',
    method: 'put',
    data: data
  })
}

// 删除类型
export function delPost(postId) {
  return request({
    url: '/buz/case/type/remove/' + postId,
    method: 'delete'
  })
}

// 导出岗位
export function exportPost(query) {
  return request({
    url: '/sys/post/export',
    method: 'get',
    params: query
  })
}