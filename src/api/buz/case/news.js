import request from '@/utils/request'

// 消息列表
export function listMessage(query) {
  return request({
    url: '/buz/message/list',
    method: 'get',
    params: query
  })
}

// 修改消息
export function updateReaded(id) {
  return request({
    url: `/buz/message/readed/${id}`,
    method: 'put',
  })
}

// 批量修改信息
export function updateAll(query){
  return request({
    url: `/buz/message/readed/batch`,
    method: 'put',
    data: query
  })
}