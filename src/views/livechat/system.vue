<template>
    <div>
          <el-button
                  style="margin-left: 100px;margin-top: 20px;margin-bottom: 20px"
                  type="primary"
                  icon="el-icon-plus"
                  size="mini"
                  @click="handleAdd"
          >add video</el-button>
      <el-table :data="videoList">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="id" prop="id" width="120" />
        <el-table-column label="title" align="center" prop="title" width="180" />
          <el-table-column label="url" align="center" prop="url" width="180" />
          <el-table-column label="performer" align="center" prop="performer" width="180" />
          <el-table-column label="description" align="center" prop="description" width="180" />
          <el-table-column label="createdBy" align="center" prop="createdBy" width="180" />
        <el-table-column label="operation" align="center" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button
                    size="mini"
                    type="text"
                    icon="el-icon-edit"
            >update</el-button>
            <el-button
                    size="mini"
                    type="text"
                    icon="el-icon-delete"
            >delete</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog title="add performer" :visible.sync="openEditCore" width="500px">
        <el-form  label-width="100px">
          <el-form-item label="title" prop="title">
            <el-input v-model="videoForm.title"  />
          </el-form-item>
          <el-form-item label="description" prop="description">
            <el-input v-model="videoForm.description"  />
          </el-form-item>
          <el-form-item label="url" prop="url">
            <el-input v-model="videoForm.url"  />
          </el-form-item>
            <el-form-item label="category" prop="category">
                <el-input v-model="videoForm.category"  />
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitForm">submit</el-button>
          <el-button @click="cancel">cancel</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
    import { listfollower,registervideo } from '@/api/login'
    export default {
        name: "system",
        data(){
            return {
                userid:'',
                videoList:[],//视频列表
                videoForm:{
                    title:'',//标题
                    url:'',//url
                    performer:'',//演出者
                    description:'',//描述
                    category:''//类别
                },//添加视频表单
                openEditCore:false,//添加演出者弹框
            }
        },
        created() {
            this.userid = sessionStorage.getItem('id');
            this.getVideos(sessionStorage.getItem('id'));
        },
        methods:{
            //获取演出者视频
            getVideos(id){
                listfollower({userid:id}).then(res => {
                    if (res.code === 100){
                        this.videoList = res.data.items;//赋值视频列表
                    }
                })
            },
            //添加视频
            handleAdd(){
                this.openEditCore = true;
            },
            //关闭添加演出者弹框
            cancel(){
                this.openEditCore = false;
            },
            //添加视频
            submitForm(){
                this.videoForm.performer = this.userid;
                registervideo(this.videoForm).then(res => {
                    if (res.code === 100){
                        this.openEditCore = false;
                        this.msgSuccess("add success!");
                        this.getVideos(this.userid);
                    }else {
                        this.$message.error('error!');
                    }
                })
            },

        }
    }
</script>

<style scoped>

</style>