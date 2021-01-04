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

//问题类型列表*
export function caseCaseTypes(data) {
  return request({
    url: `/weChat/case/caseTypes`,
    method: 'get',
    data: data
  })
}

//提交评价*
export function submitEvaluation(data) {
  return request({
    url: `/buz/case/comment`,
    method: 'post',
    data: data
  })
}


//提交部门调度*
export function submitArrange(caseId,data) {
  return request({
    url: `/buz/case/arrange/${caseId}`,
    method: 'put',
    params: data
  })
}

//响应问题*
export function response(caseId) {
  return request({
    url: `/buz/case/response/${caseId}`,
    method: 'put',
  })
}

//不受理问题*
export function reject(caseId) {
  return request({
    url: `/buz/case/reject/${caseId}`,
    method: 'put',
  })
}

//处理问题*
export function processs(caseId) {
  return request({
    url: `/buz/case/process/${caseId}`,
    method: 'put',
  })
}

//办结问题*
export function complete(caseId,data) {
  return request({
    url: `/buz/case/complete/${caseId}`,
    method: 'put',
    params: data
  })
}