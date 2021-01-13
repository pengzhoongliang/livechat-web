import { login, logout, getInfo,getmyprofile } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    permissions: [],
    user: {},
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.permission = permissions
    },
    SET_USER: (state, user) => {
      state.user = user
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      let data = '';
      if (userInfo.username === 'admin'){
        data = {
          username:userInfo.username,
          password:userInfo.password,
          type:'OPERATOR'
        }
      } else {
        data = {
          username:userInfo.username,
          password:userInfo.password,
          type:'PERFORMER'
        }
      }

      return new Promise((resolve, reject) => {
        /* "username": "admin" , "password": "not4u2know", "type": "OPERATOR"*/
        login(data).then(res => {
          if (res.data.user.status === '1') {
            setToken(res.data.token)
            commit('SET_TOKEN', res.data.token)
            sessionStorage.setItem("id", res.data.user.id || 0)
            sessionStorage.setItem("name", res.data.user.alias || '')
            resolve()
          }else {
            reject('This account has been disabled');
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        /*getInfo(state.token).then(res => {
          res = res.data;
          const user = res.user;
          commit('SET_USER', res.user)
          const avatar = user.avatar == "" ? require("@/assets/image/profile.jpg") : process.env.VUE_APP_URL+process.env.VUE_APP_BASE_API+"/weChat/case/file/"+user.avatar+".jpeg";
          if (res.roles && res.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', res.roles)
            commit('SET_PERMISSIONS', res.permissions)
            localStorage.setItem('permissions', JSON.stringify(res.permissions))
          } else {
            commit('SET_ROLES', ['ROLE_DEFAULT'])
          }
          commit('SET_NAME', user.username)
          commit('SET_AVATAR', avatar)
          resolve(res)
        }).catch(error => {
          reject(error)
        })*/
        resolve({code:-1})
      })
    },

    // 退出系统
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          commit('SET_PERMISSIONS', [])
          removeToken()
          localStorage.clear();
          resolve();
          location.reload() // 强制刷新
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
