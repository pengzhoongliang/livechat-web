import request from '@/utils/request'

// 查询超时列表
export function listRole(query) {
  return request({
    url: '/buz/supervise/overtime/list',
    method: 'get',
    params: query
  })
}

// 提交超时
export function addOvertime(data) {
  return request({
    url: '/buz/supervise',
    method: 'put',
    data: data
  })
}
