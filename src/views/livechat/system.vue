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
        <el-table-column label="flag" align="center" prop="flag" width="180" />
        <el-table-column label="performer" align="center" prop="performer" width="180" />
          <el-table-column label="description" align="center" prop="description" width="180" />
          <el-table-column label="createdBy" align="center" prop="createdBy" width="180" />
        <el-table-column label="operation" align="center" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button
                    size="mini"
                    type="text"
                    icon="el-icon-edit"
                    @click="getvideoinfo(scope.row)"
            >update</el-button>
            <el-button
                    size="mini"
                    type="text"
                    icon="el-icon-delete"
            >delete</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog :title="title" :visible.sync="openEditCore" width="500px">
        <el-form  label-width="100px">
          <el-form-item label="title" prop="title">
            <el-input v-model="videoForm.title"  />
          </el-form-item>
          <el-form-item label="flag" prop="flag">
            <el-radio v-model="videoForm.flag" label="LIVE"/>
            <el-radio v-model="videoForm.flag" label="HISTORY"/>
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
    import { listfollower,registervideo,getvideoinfo,updatevideo,setvideoflag } from '@/api/login'
    export default {
        name: "system",
        data(){
            return {
              title:'',//弹出框标题
                userid:'',
                videoList:[],//视频列表
                videoForm:{
                    title:'',//标题
                    url:'',//url
                    performer:'',//演出者
                    description:'',//描述
                    category:'',//类别
                    flag:'LIVE',//
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
              this.title = 'add video';
              this.videoForm = {};
                this.openEditCore = true;
            },
            //关闭添加演出者弹框
            cancel(){
                this.openEditCore = false;
            },
            //添加视频
            submitForm(){
              if (this.videoForm.id != undefined){
                //修改
                this.videoForm.videoid = this.videoForm.id;
                updatevideo(this.videoForm).then(res => {
                  setvideoflag({
                    videoid:this.videoForm.videoid,
                    flag:this.videoForm.flag
                  }).then(red => {
                  if (res.code === 100 && red.code === 100){
                    this.openEditCore = false;
                    this.msgSuccess("update success!");
                    this.getVideos(this.userid);
                  }else {
                    this.$message.error('error!');
                  }
                  })
                })
              }else {
                //新增
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
              }

            },
          //查询单个视频
          getvideoinfo(data){
            this.title = 'update video'
            getvideoinfo({
              videoid:data.id,
              flag:data.flag
            }).then(res => {
              this.openEditCore = true
              if (res.code === 100){
                this.videoForm = res.data;
                }
              })
          },

        }
    }
</script>

<style scoped>

</style>