<template>
  
</template>

<script>
import CountTo from 'vue-count-to'

export default {
  props:{
    mainInfoData: Object,
  },
  components: {
    CountTo
  },
  computed: {
    // 计算属性的 getter
    reversedMessage: function () {
      let success = this.mainInfoData.caseFinished-this.mainInfoData.caseDissatisfied;
      // `this` 指向 vm 实例
      return this.mainInfoData.caseDissatisfied==0?100:(success/this.mainInfoData.caseFinished*100).toFixed(2);
    }
  },
  methods: {
   
  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    text-align: center;
    font-size: 12px;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);
    padding: 16px 0;

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3
    }

    .card-panel-icon-wrapper {
      padding-bottom: 13px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      font-size: 25px;
    }

    .card-panel-description {
      font-weight: bold;
      margin-left: 0px;

      .card-panel-text {
        line-height: 20px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 14px;
      }

      .card-panel-num {
        font-size: 14px;
        margin-bottom: 8px;
      }
    }
  }
}

@media (max-width:550px) {
  .card-panel-description {
    // display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 0px auto !important;
      float: none !important;
    }
  }
}
</style>
