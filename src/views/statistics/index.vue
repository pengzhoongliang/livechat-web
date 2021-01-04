<template>
  <div class="dashboard-editor-container">

    <panel @handleSetLineChartData="handleSetLineChartData" />

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <el-col :xs="24" :sm="24" :lg="16">
      <line-chart :chart-data="lineChartData" />
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">


        <template>
          <h3>排行榜</h3>
          <el-button-group>
            <el-button @click="getCaseByDepartment">按部门</el-button>
            <el-button @click="getCaseByType">按分类</el-button>
          </el-button-group>
          <el-table
                  v-show="showDept"
                  :data="tableData"
                  style="width: 100%">
            <el-table-column
                    prop="ranking"
                    label="排名"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="deptName"
                    label="部门"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="weeksFrom"
                    label="问题数">
            </el-table-column>
            <el-table-column
                    property ="proportion"
                    label="占比">
              <template slot-scope="scope">
                <el-progress :percentage="quYu(scope.row.proportion)"></el-progress>
              </template>
            </el-table-column>
          </el-table>
          <el-table
                  v-show="showType"
                  :data="tableData"
                  style="width: 100%">
            <el-table-column
                    prop="ranking"
                    label="排名"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="deptName"
                    label="分类"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="weeksFrom"
                    label="问题数">
            </el-table-column>
            <el-table-column
                    property ="proportion"
                    label="占比">
              <template slot-scope="scope">
                <el-progress :percentage="quYu(scope.row.proportion)"></el-progress>
              </template>
            </el-table-column>
          </el-table>

        </template>
      </el-col>
    </el-row>

    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <raddar-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <bar-chart />
        </div>
      </el-col>
    </el-row>


  </div>
</template>

<script>
import panel from '@/views/dashboard/panel'
import LineChart from '@/views/dashboard/LineChart'
import RaddarChart from '@/views/dashboard/RaddarChart'
import PieChart from '@/views/dashboard/PieChart'
import BarChart from '@/views/dashboard/BarChart'
import { caseByType,caseByDepartment,caseCount } from "@/api/buz/index";
const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}

export default {
  name: 'Index',
  components: {
    panel,
    LineChart,
    RaddarChart,
    PieChart,
    BarChart
  },
  data() {
    return {
      lineChartData: lineChartData.newVisitis,
      //表格数据
      tableData:[],
      //总问题数
      count:undefined,
      //分类表格名
      rowName:"部门",
      //表格视图控制
      showDept:true,
      showType:false

    }
  },
  created(){
    this.getCaseByDepartment();
    this.getCaseCount();
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    },
    quYu(num){
      return Math.round((num/this.count)*100)
    },
    getCaseByDepartment() {
      this.showDept = true;
      this.showType = !this.showDept;
      caseByDepartment().then(response => {
        let res = response.data;
        this.tableData = [];
        for (let i = 0; i < res.length; i++) {
          this.tableData.push({ranking:i+1,deptName:res[i].deptName,weeksFrom:res[i].count,proportion:res[i].count});
          if (this.tableData.length>=5){
            return;
          }
        }
      });
    },
    getCaseByType(){
      this.showDept = false;
      this.showType = !this.showDept;
      caseByType().then(response => {
        let res = response.data;
        this.tableData = [];
        for (let i = 0; i <res.length ; i++) {
          this.tableData.push({ranking:i+1,deptName:res[i].type_name,weeksFrom:res[i].count,proportion:res[i].count});
          if (this.tableData.length>=5){
            return;
          }
        }
      })
    },
    getCaseCount() {
      caseCount().then(response => {
        this.count = response.data.count;
      });
    },
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>