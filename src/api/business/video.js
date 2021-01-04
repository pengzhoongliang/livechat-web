import request from '@/utils/request'

// 查询角色列表
export function listVideo(query) {
  return request({
    url: '/buz/video/list',
    method: 'get',
    params: query
  })
}

// 新增视频
export function addVideo(data) {
    return request({
      url: '/buz/video',
      method: 'post',
      data: data
    })
}

// 查询单个数据
export function getVideo(id) {
    return request({
      url: '/buz/video/' + id,
      method: 'get',
    })
}

// 修改视频
export function updatVideo(data) {
    return request({
      url: '/buz/video',
      method: 'put',
      data: data
    })
 }

// 删除文章
export function delVideo(id) {
    return request({
      url: '/buz/video/remove/' + id,
      method: 'delete'
    })
}