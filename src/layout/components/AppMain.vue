<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </section>
</template>

<script>
  export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.path
    },
  },
    data(){
      return {
       performerList:[],//演出者列表
        openEditCore:false,//添加演出者弹框
        performerForm:{
         name:'',
          alias:'',
          email:'',
          mobile:'',
          username:'',
          password:'',
          type:'PERFORMER'
        }
      }
    },
    created() {
      this.getPerformerList();
    },
    methods:{
      //打开添加演出者弹框
     handleAdd() {
       this.openEditCore = true;
     },
      //关闭添加演出者弹框
      cancel(){
        this.openEditCore = false;
      },
    }
  }
</script>

<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}

.fixed-header+.app-main {
  padding-top: 50px;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 84px);
  }

  .fixed-header+.app-main {
    padding-top: 84px;
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
