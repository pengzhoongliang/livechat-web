import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets
import 'quill/dist/quill.core.css'//富文本编辑器相关css
import 'quill/dist/quill.snow.css'//富文本编辑器相关css
import 'quill/dist/quill.bubble.css'//富文本编辑器相关css

import Element from 'element-ui'
import './assets/styles/element-variables.scss'

import '@/assets/styles/index.scss' // global css
import '@/assets/styles/ruoyi.scss' // ruoyi css
import App from './App'
import store from './store'
import router from './router'
import permission from './directive/permission'
import VideoPlayer from 'vue-video-player' //视频插件
import VueQuillEditor from 'vue-quill-editor'//富文本编辑器

import './assets/icons' // icon
import './permission' // permission control
import axios from 'axios'
import { parseTime, resetForm, addDateRange, selectDictLabel, download, handleTree } from "@/utils/nst";
import Pagination from "@/components/Pagination";
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
Vue.use(VideoPlayer)//注册视频插件
Vue.use(VueQuillEditor)//注册富文本编辑器
// import BaiduMap from 'vue-baidu-map'

// // 地图全局注册
// Vue.use(BaiduMap, {
//   ak: 'xeXyjk05YzsUYhsoeD4ZDYIqQIPvUlLP'
// })

// 全局方法挂载
Vue.prototype.parseTime = parseTime
Vue.prototype.resetForm = resetForm
Vue.prototype.addDateRange = addDateRange
Vue.prototype.selectDictLabel = selectDictLabel
Vue.prototype.download = download
Vue.prototype.handleTree = handleTree
Vue.prototype.$axios = axios
Vue.prototype.$store = store


Vue.prototype.msgSuccess = function (msg) {
  this.$message({ showClose: true, message: msg, type: "success" });
}

Vue.prototype.msgError = function (msg) {
  this.$message({ showClose: true, message: msg, type: "error" });
}

Vue.prototype.msgInfo = function (msg) {
  this.$message.info(msg);
}

// 全局组件挂载
Vue.component('Pagination', Pagination)

Vue.use(permission)

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */

Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
