import request from '@/utils/request'

// 查询群众列表
export function listMasses(query) {
  return request({
    url: '/buz/masses/list',
    method: 'get',
    params: query
  })
}

// 查询单个群众信息
export function danMasses(id,query) {
  return request({
    url: '/buz/masses/'+id,
    method: 'get',
    params: query
  })
}

// 查询单个群众信息
export function addMasses(data) {
  return request({
    url: '/buz/masses',
    method: 'put',
    data: data
  })
}