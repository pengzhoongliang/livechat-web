import request from '@/utils/request'

// 登录方法
/*export function login(username, password, code, uuid) {
  const data = {
    username,
    password,
    code,
    uuid
  }
  return request({
    url: '/auth/token',
    method: 'post',
    params: data
  })
}*/

// 获取用户详细信息
export function getInfo() {
  return request({
    url: '/auth/info',
    method: 'get'
  })
}

// 退出方法
export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}
//登录
export function login(data) {
  return request({
    url: '/auth',
    method: 'post',
    params: data
  })
}
//演出者登录
export function token(z) {
  return request({
    url: '/auth',
    method: 'post',
    params: data
  })
}
//演出者列表
export function performerList() {
  return request({
    url: '/core/performer',
    method: 'get',
  })
}
//演出者视频列表
export function listfollower(params) {
  return request({
    url: '/performer/listfollower',
    method: 'get',
    params:params
  })
}
//添加演出者视频
export function registervideo(data) {
  return request({
    url: '/performer/registervideo',
    method: 'post',
    data:data
  })
}
//查询单个视频
export function getvideoinfo(data) {
  return request({
    url: '/performer/getvideoinfo',
    method: 'get',
    params:data
  })
}
//修改视频
export function updatevideo(data) {
  return request({
    url: '/performer/updatevideo',
    method: 'post',
    params:data
  })
}
//修改视频flag
export function setvideoflag(data) {
  return request({
    url: '/performer/setvideoflag',
    method: 'post',
    params:data
  })
}
//获取演出者信息
export function getmyprofile(data) {
  return request({
    url: '/performer/getmyprofile',
    method: 'get',
    params:data
  })
}
//删除视频
export function deleteVideo(data) {
  return request({
    url: '/performer/deleteVideo',
    method: 'post',
    params:data
  })
}
//获取钱包明细
export function walletListByPerformer(data) {
  return request({
    url: '/performer/walletListByPerformer',
    method: 'get',
    params:data
  })
}
//结算单日与单月的钱包
export function closeAnAccount(data) {
  return request({
    url: '/user/monthEndToken',
    method: 'post',
    params:data
  })
}
//获取视频点赞数
export function likeCountByVideoId(data) {
  return request({
    url: '/core/likecount',
    method: 'get',
    params:data
  })
}
//获取观看数
export function viewCountByVideoId(data) {
  return request({
    url: '/core/viewcount',
    method: 'get',
    params:data
  })
}
//修改演出者个人信息
export function updatePerformer(data) {
  return request({
    url: '/performer/updatePerformer',
    method: 'post',
    params:data
  })
}
//通过视频id查询token
export function walletListByVideo(data) {
  return request({
    url: '/user/walletListByVideo',
    method: 'get',
    params:data
  })
}
//修改演出者账号状态
export function setperformerstatus(userid,status) {
  const data = {
    userid:userid,
    status:status
  }
  return request({
    url: '/performer/setperformerstatus',
    method: 'post',
    params:data
  })
}
export function registerUser(data) {
  return request({
    url: '/core/registerUser',
    method: 'post',
    data: data
  })
}
// // 获取验证码
// export function getCodeImg() {
//   return request({
//     url: '/captchaImage',
//     method: 'get'
//   })
// }
