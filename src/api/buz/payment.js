import request from '@/utils/request'
import { praseStrEmpty } from "@/utils/nst";

// 查询用户列表
export function listPayment(query) {
  return request({
    url: '/buz/payment/list',
    method: 'get',
    params: query
  })
}
