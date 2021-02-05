<template>
    <div>
          <el-button
                  style="margin-left: 100px;margin-top: 20px;margin-bottom: 20px"
                  type="primary"
                  icon="el-icon-plus"
                  size="mini"
                  @click="handleAdd"
          >add video</el-button>
      <el-button
              type="text"
              style="margin-left: 70%"
              @click="getWalletDesc"
      >Received Token Total <font color="black" size="5px">{{wallet}}</font> </el-button>
      <el-table :data="videoList" empty-text="no data">
        <el-table-column label="Id" prop="id" width="120" />
        <el-table-column label="Title" align="center" prop="title" width="180" />
          <el-table-column label="Url" align="center" prop="url" width="180" />
        <el-table-column label="Flag" align="center" prop="flag" width="180" />
        <el-table-column label="Performer" align="center" prop="performer" width="180" />
          <el-table-column label="Account Description" align="center" prop="description" width="180" />
          <el-table-column label="Category" align="center" prop="category" width="100" />
        <el-table-column label="Token Total" align="center" prop="wallet" width="100" />
        <el-table-column label="Like Total" align="center" prop="likelist" width="100" />
        <el-table-column label="View Total" align="center" prop="followlist" width="100" />
        <el-table-column label="Operation" align="center" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button
                    size="mini"
                    type="text"
                    icon="el-icon-chat-dot-round"
                    @click="openRocket(scope.row)"
            >Rocket Chat</el-button>
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
                    @click="deleteById(scope.row)"
            >delete</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog :title="title" :visible.sync="openEditCore" width="500px">
        <el-form :rules="videoFormRules" ref="videoRef" :model="videoForm" label-width="100px">
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
               <!-- <el-input v-model="videoForm.category"  />-->
              <el-select v-model="videoForm.category" placeholder="please select">
                <el-option
                        v-for="item in videoType"
                        :key="item"
                        :label="item"
                        :value="item">
                </el-option>
              </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitForm">submit</el-button>
          <el-button @click="cancel">cancel</el-button>
        </div>
      </el-dialog>

      <el-dialog title="wallet particulars" :visible.sync="walletType" width="600px">
        <el-table :data="walletList" empty-text="no data">
          <el-table-column label="viewer" align="center" prop="viewer" width="180" />
          <el-table-column label="token" align="center" prop="token" width="180" />
          <el-table-column label="time" align="center" prop="updatedDate" width="180" />
        </el-table>
      </el-dialog>
      <el-dialog title="live chat" :visible.sync="rocketType" width="80%">
        <iframe id="rocketchat" name="rocketchat" :key="xToken" @load="iFrameLoaded"
                :src="rocketServer+'/channel/'+rocketId+'?layout=embedded'"
                style="height: 600px;width: 100%;border: 0"/>
      </el-dialog>
    </div>
</template>

<script>
    import { listfollower,walletListByPerformer,deleteVideo,registervideo,getvideoinfo,updatevideo,setvideoflag,getmyprofile } from '@/api/login'
    import { formatDate } from "@/utils/index";
    import { getToken } from '@/utils/auth'
    export default {
        name: "system",
        data(){
            return {
              title:'',//弹出框标题
                userid:'',
                videoList:[],//视频列表
                performerName:'',//演出者名称
                wallet:'',//余额
              rocketId:'',//视频ID
              xToken:'',//火箭聊天token
              rocketServer:'https://api.networkgateway.net:3021',
              rocketType:false,//火箭聊天是否打开
              walletList:[],
              walletType:false,//钱包明细弹框
                videoForm:{
                    title:'',//标题
                    url:'',//url
                    performer:'',//演出者
                    description:'',//描述
                    category:'',//类别
                    flag:'LIVE',//
                },//添加视频表单
                openEditCore:false,//添加演出者弹框
              //视频类别
              videoType:{
                cate:'cate',
                fashion:'fashion',
                recreation:'recreation',
                live:'live',
                information:'information',
                game:'game',
                car:'car',
                exercise:'exercise',
                music:'music',
                cartoon:'cartoon',
                health:'health',
              },
                videoFormRules:{
                    title: [
                        { required: true, message: "NOT NULL", trigger: "change" }
                    ],
                    url: [
                        { required: true, message: "NOT NULL", trigger: "change" }
                    ],
                    description: [
                        { required: true, message: "NOT NULL", trigger: "change" }
                    ],
                    flag: [
                        { required: true, message: "NOT NULL", trigger: "change" }
                    ],
                    category: [
                         { required: true, message: "NOT NULL", trigger: "change" }
                    ],
                }
            }
        },
        created() {
            console.log('created，token是',this.xToken);
            this.userid = sessionStorage.getItem('id');
            this.performerName = sessionStorage.getItem('name');
            this.getWallet(this.userid);
            this.getVideos(sessionStorage.getItem('id'));
        },
        methods:{
            //获取演出者视频
            getVideos(id){
                listfollower({userid:id}).then(res => {

                    if (res.code === 100){
                        this.videoList = res.data.items;//赋值视频列表
                      this.videoList.map(item => {
                        item.followlist = item.followlist.length;
                        item.likelist = item.likelist.length;
                      })
                    }
                })
            },
          getWallet(userid){
            getmyprofile({userid:userid}).then(res => {
              if (res.code === 100){
                this.wallet = res.data.wallet
              }
            })
          },
            //添加视频
            handleAdd(){
              this.title = 'add video';
              this.videoForm = {
                  flag:'LIVE'
              };
                this.openEditCore = true;
            },
            //关闭添加演出者弹框
            cancel(){
                this.openEditCore = false;
            },
            //添加视频
            submitForm(){
                this.$refs["videoRef"].validate(valid => {
                    if (valid){
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
                this.videoForm.performer = this.performerName;
                console.log(this.videoForm);
                registervideo(this.videoForm).then(res => {
                  if (res.code === 100){
                    //添加视频成功同时创建聊天频道
                    this.channelsCreate(res.data);
                    this.openEditCore = false;
                    this.msgSuccess("add success!");
                    this.getVideos(this.userid);
                  }else {
                    this.$message.error('error!');
                  }
                })
              }
                    }
                })
            },
          //创建视频聊天频道
          channelsCreate(name){
            this.$axios({
              url:'https://api.networkgateway.net:3021/api/v1/channels.create',
              method:'post',
              headers:{
                'X-Auth-Token': localStorage.getItem('xToken'),
                'X-User-Id': localStorage.getItem('xId')
              },
              data:{
                name:name
              }
            }).then(res => {
              if (res.status === 200){
                console.log('创建聊天频道成功');
              }
            })
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
          //查询钱包明细
          getWalletDesc(){
            walletListByPerformer().then(res => {
              if (res.code === 100) {
                this.walletList = res.data.items
                this.walletList.map(item => {
                  item.updatedDate = formatDate(item.updatedDate)
                })
                this.walletType = true;
              }
            })
          },
          //删除单个视频
          deleteById(row){
            const id = row.id ;
            this.$confirm('Confirm Delete', {
              confirmButtonText: "yes",
              cancelButtonText: "cancel",
              type: "warning"
            }).then(function() {
              return deleteVideo({videoid:id});
            }).then(() => {
              this.getVideos(this.userid);
              this.msgSuccess("delete success");
            }).catch(function() {});
          },
          //火箭聊天
          iFrameLoaded(){
                this.xToken = localStorage.getItem('xToken');
              console.log('token是',this.xToken);
              document.getElementById("rocketchat").contentWindow.postMessage({
                 externalCommand: 'login-with-token',
                 token:this.xToken
             },'*');
          },
          //聊天窗口打开
          openRocket(row){
            this.rocketId = row.id;
              //this.rocketId = 'DAFB4072-8E8A-4492-8F18-1BFA19ECAA15'
            this.rocketType = true;
          },
            logout(){
                this.$axios({
                    url:'https://api.networkgateway.net:3021/api/v1/logout',
                    method:'post',
                    headers:{
                        'X-Auth-Token': 'rxjMOjxyEMHPpHDMQbFyhgHB1F4WkHxs3cphsoiRoQV',
                        'X-User-Id': 'ShecmkD7H6enAsbbN'
                    }
                }).then(res => {
                    if (res.status === 200){
                        alert('注销成功')
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>