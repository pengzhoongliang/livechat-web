import request from '@/utils/request'

// 监管配置
export function superviseConfig(query) {
  return request({
    url: '/buz/supervise/config',
    method: 'get',
    params: query
  })
}

// 修改监管配置
export function updatConfig(data) {
  return request({
    url: '/buz/supervise/config',
    method: 'put',
    data: data
  })
}