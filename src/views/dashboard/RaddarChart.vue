<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'
import { caseByDepartment } from "@/api/buz/index";

const animationDuration = 3000

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
      chart: null
    }
  },
  created(){
    this.getCaseByDepartment();
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
    getCaseByDepartment() {
      caseByDepartment().then(response => {
        let arr = [];
        let arrs = [];
        for (const res of response.data) {
          arr.push({value:res.count,name:res.deptName});
          arrs.push(res.deptName);
        }
        this.chart.setOption({
          legend: {
            orient: 'vertical',
            right: 10,
            data: arrs
          },
          series: [
            {
              name: '部门情况',
              type: 'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              label: {
                show: false,
                position: 'center',
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '20',
                  fontWeight: 'bold'
                }
              },
              labelLine: {
                show: false
              },
              data: arr
            }
          ]

        });
      });
    },
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({
        title: {
          text: '部门情况',
          left: 'left',
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
      })
    }
  }
}
</script>
