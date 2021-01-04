import request from '@/utils/request'
import { praseStrEmpty } from "@/utils/nst";

// 问题记录列表
export function listProblem(query) {
  return request({
    url: '/buz/case/list',
    method: 'get',
    params: query
  })
}

// 查询问题记录详细
export function getProblem(userId) {
  return request({
    url: '/buz/case/' + userId,
    method: 'get'
  })
}

// 新增用户
export function addProblem(data) {
  return request({
    url: '/buz/case',
    method: 'post',
    data: data
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

// 概要统计
export function caseMainInfo() {
  return request({
    url: '/weChat/case/mainInfo',
    method: 'get'
  })
}

//获取评价
export function getComments(caseId) {
  return request({
    url: '/buz/case/comment/getCommentByCaseId/'+caseId,
    method: 'get'
  })
}