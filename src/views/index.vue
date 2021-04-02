<template>
  

</template>

<script>
  import PanelGroup from './dashboard/PanelGroup'
  import { caseMainInfo, getProblem, listProblem } from '@/api/buz/case/comment'
  import { caseCaseTypes } from '@/api/buz/case/problem'
  import { listZone } from '@/api/buz/case/geocoding'
  import { getToken } from '@/utils/auth'
  import { getDicts } from '@/api/sys/dict/data'


  export default {
  components: {
    PanelGroup,
  },
  data() {
    return {
    };
  },
  mounted() {


  },
  methods: {

  }
};
</script>


<style>
body,
html,
#allmap {
  width: 100%;
  height: 800px;
  margin: 0;
  font-family: "微软雅黑";
}
.mapBox{
  position: relative;
}
.screen{
    position: absolute;
    left: 0;
    top: 15px;
    display: flex;
    height: 48px;
    z-index: 100;
    line-height: 48px;
    font-size: 13px;
}
.screen>div{
    box-shadow: 0px 3px 5px #c7c5c5;
}
.screenItem{
  width: 126px;
  text-align: center;
  background: #fff;
}
.screen img{
  vertical-align: sub;
}
.elSelect{
  background: #fff;
  margin-right: 20px;
  padding: 0 13px;
}
.adjust{
  position: absolute;
  right: 0;
  top: 15px;
  z-index: 100;
}

.actives{
    position: fixed;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
    z-index: 1100;
}

.mapBox .el-input--medium .el-input__inner{
  width: 120px;
  border: none;
}
</style>
