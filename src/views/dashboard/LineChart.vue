<template>
  <div>
    <div  :style="{height:'80px',width:width}">
      <el-button-group>
        <el-button v-on:click="getCaseByTypeAndWeek">按分类</el-button>
        <el-button v-on:click="getCaseByDeptAndWeek">按部门</el-button>
      </el-button-group>
      <!-- <el-form :inline="true" label-width="68px">
       <el-form-item label="创建时间">-->
      <!--<el-date-picker
              v-model="dateRange"
              size="small"
              style="width: 240px"
              value-format="yyyy-MM-dd"
              type="daterange"
              range-separator="-"
              :onchange="getCaseByTypeAndWeek()"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
      ></el-date-picker>-->
      <!--</el-form-item>
      </el-form>-->
    </div>
    <div :class="className" :style="{height:height,width:width}" />

  </div>
</template>

<script>
  import echarts from 'echarts'
  require('echarts/theme/macarons') // echarts theme
  import resize from './mixins/resize'
  import { caseByTypeAndWeek , caseByDeptAndWeek} from "@/api/buz/index";

  export default {
    mixins: [resize],
    props: {
      className: {
        type: String,
        default: 'chart'
      },
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '300px'
      }
    },
    data() {
      return {
        chart: null,
        //日期时间范围
        dateRange:[],
        //问题类型
        typeName:['product']
      }
    },
    created(){
      this.getCaseByTypeAndWeek();
    },
    mounted() {
      this.$nextTick(() => {
        this.initChart()
      })
    },
    beforeDestroy() {
      if (!this.chart) {
        return
      }
      this.chart.dispose()
      this.chart = null
    },
    methods: {
      /** 根据问题类型查询数据 */
      getCaseByTypeAndWeek() {
        caseByTypeAndWeek().then(response => {
          //构建数据
          let res = response.data;
          let day = [];
          let data = [];
          let typeName = [];
          for (let i = 0; i < res.length; i++) {
            if (i==0){
              day = res[i].weekDay;
            } else {
              data.push({name:res[i].typeName,type:'bar',data:res[i].data});
              typeName.push(res[i].typeName);
            }
          }
          this.chart.setOption({
            tooltip: {
              trigger: 'axis',
              axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            legend: {
              data: typeName
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: [
              {
                type: 'category',
                data: day
              }
            ],
            yAxis: [
              {
                type: 'value'
              }
            ],
            series: data
          })
        });
      },
      getCaseByDeptAndWeek() {
        caseByDeptAndWeek().then(response => {
          //构建数据
          let res = response.data;
          let day = [];
          let data = [];
          let typeName = [];
          for (let i = 0; i < res.length; i++) {
            if (i==0){
              day = res[i].weekDay;
            } else {
              data.push({name:res[i].typeName,type:'bar',data:res[i].data});
              typeName.push(res[i].typeName);
            }
          }
          this.chart.setOption({
            tooltip: {
              trigger: 'axis',
              axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            legend: {
              data: typeName
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: [
              {
                type: 'category',
                data: day
              }
            ],
            yAxis: [
              {
                type: 'value'
              }
            ],
            series: data
          })
        });
      },
      initChart() {
        this.chart = echarts.init(document.getElementsByClassName("chart")[0], 'macarons')

        this.chart.setOption({


        })
      }
    }
  }
</script>
