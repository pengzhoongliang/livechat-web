import request from '@/utils/request'

// 查询菜单列表
export function listMenu(query) {
  console.log("123");
  return request({
    url: '/sys/menu/list/plain',
    method: 'get',
    params: query
  })
}

// 查询菜单详细
export function getMenu(id) {
  return request({
    url: '/sys/menu/' + id,
    method: 'get'
  })
}

// 查询菜单下拉树结构
export function tree() {
  return request({
    url: '/sys/menu/tree',
    method: 'get'
  })
}

// 根据角色ID查询菜单下拉树结构
export function roleTree(roleId) {
  return request({
    url: '/sys/menu/roleTree/' + roleId,
    method: 'get'
  })
}

// 新增菜单
export function addMenu(data) {
  return request({
    url: '/sys/menu',
    method: 'post',
    data: data
  })
}

// 修改菜单
export function updateMenu(data) {
  return request({
    url: '/sys/menu',
    method: 'put',
    data: data
  })
}

// 删除菜单
export function delMenu(menuId) {
  return request({
    url: '/sys/menu/remove/' + menuId,
    method: 'delete'
  })
}
