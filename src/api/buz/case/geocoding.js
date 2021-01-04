import request from '@/utils/request'
import { praseStrEmpty } from "@/utils/nst";

// 区域列表
export function listZone(query) {
  return request({
    url: '/buz/zone/list',
    method: 'get',
    params: query
  })
}

// 获取问题类型和部门列表
export function typeDepartment() {
  return request({
    url: '/buz/zone/type-department',
    method: 'get'
  })
}

// 获取区域单条数据
export function zoneDetailed(id) {
  return request({
    url: '/buz/zone/'+id,
    method: 'get'
  })
}

// 新增区域
export function addZone(data) {
  return request({
    url: '/buz/zone',
    method: 'post',
    data: data
  })
}

// 修改区域信息
export function updatZone(data) {
  return request({
    url: '/buz/zone',
    method: 'put',
    data: data
  })
}

// 删除该条数据/buz/zone/remove/{id}
export function deleteZone(id) {
  return request({
    url: '/buz/zone/remove/'+id,
    method: 'delete',
  })
}

// ---------------------------------------------------->

// 查询问题记录详细
export function getProblem(userId) {
  return request({
    url: '/buz/case/' + userId,
    method: 'get'
  })
}
// 修改用户
export function updatProblem(data) {
  return request({
    url: '/buz/case',
    method: 'put',
    data: data
  })
}

// 删除用户
export function delUser(userId) {
  return request({
    url: '/buz/case/remove/' + userId,
    method: 'delete'
  })
}
