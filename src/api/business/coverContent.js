import request from '@/utils/request'
// 新增文章
export function addCoverContent(data) {
    return request({
      url: '/buz/article/content',
      method: 'post',
      data: data
    })
}

// 查询文章列表
export function listCoverContent(query) {
    return request({
      url: '/buz/article/content/list',
      method: 'get',
      params: query
    })
}

// 查询文章分类单条记录
export function getCoverContent(id) {
    return request({
      url: '/buz/article/content/' + id,
      method: 'get'
    })
}
// 修改文章
export function updatCoverContent(data) {
    return request({
      url: '/buz/article/content',
      method: 'put',
      data: data
    })
}

// 删除文章
export function delCoverContent(id) {
    return request({
      url: '/buz/article/content/remove/' + id,
      method: 'delete'
    })
}