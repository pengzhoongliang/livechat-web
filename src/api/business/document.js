import request from '@/utils/request'

// 查询角色列表
export function listDocument(query) {
  return request({
    url: '/resource/list',
    method: 'get',
    params: query
  })
}
