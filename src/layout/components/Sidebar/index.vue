<template>
  <div :class="{'has-logo':showLogo}">
<!--     <logo v-if="showLogo" :collapse="isCollapse" />-->
    <!-- :background-color="variables.menuBg"  //背景颜色 -->
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :text-color="variables.black"
        :unique-opened="true"
        :active-text-color="variables.green"
        :collapse-transition="false"
        mode="vertical"
      >
<!--        <sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" />-->
        <el-menu-item index="1">
            <router-link to="/system">
                <i class="el-icon-video-camera-solid">
                    <span slot="title" style="padding-left: 20px">Video List</span>
                </i>
            </router-link>
        </el-menu-item>
          <el-menu-item index="2">
              <router-link to="/system">
                  <i class="el-icon-menu">
                      <span slot="title" style="padding-left: 20px">More</span>
                  </i>
              </router-link>
          </el-menu-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/assets/styles/variables.scss'

export default {
  components: { SidebarItem, Logo },
  computed: {
    ...mapGetters([
      'permission_routes',
      'sidebar'
    ]),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
