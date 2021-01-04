import request from '@/utils/request'
import { praseStrEmpty } from "@/utils/nst";

// 查询列表
export function listSuggestion(query) {
  return request({
    url: '/buz/suggestion/list',
    method: 'get',
    params: query
  })
}

// 查询详细
export function suggestion(id) {
  return request({
    url: '/buz/suggestion/'+id,
    method: 'get'
  })
}

// 修改
export function updateSuggestion(data) {
  return request({
    url: '/buz/suggestion',
    method: 'put',
    data: data
  })
}

// 删除
export function delRemove(id) {
  return request({
    url: '/buz/suggestion/remove/' + id,
    method: 'delete'
  })
}
