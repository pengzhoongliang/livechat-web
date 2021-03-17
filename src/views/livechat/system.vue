<template>
    <div>
      <el-button-group>
      <el-button
              style="margin-left: 30px;margin-top: 20px;margin-bottom: 20px"
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="editPerformer"
      >Edit Performer</el-button>
          <el-button
                  style="margin-left: 10px;margin-top: 20px;margin-bottom: 20px"
                  type="primary"
                  icon="el-icon-plus"
                  size="mini"
                  @click="handleAdd"
          >Add Video</el-button>
      </el-button-group>
      <el-button
              type="text"
              style="margin-left: 70%;color:black"
      >Received Token Total<font color="blue" size="5px">&nbsp;{{tokenList}}</font> </el-button>
      <h3 style="text-align: center;margin-top: -5px">  Video   List  </h3>
      <el-table :data="videoList" empty-text="no data">
        <el-table-column label="Id" prop="id" />
        <el-table-column label="Title" sortable align="center" prop="title"  />
          <el-table-column label="Url" align="center" prop="url"  />
        <el-table-column label="Flag" sortable align="center" prop="flag"  />
        <el-table-column label="Performer" align="center" prop="performer"  />
          <el-table-column label="Video Description" sortable align="center" prop="description"  />
          <el-table-column label="Category" sortable align="center" prop="category"  />
        <el-table-column label="Token Total" sortable align="center" >
          <template slot-scope="scope">
            <!--<p @click="getWalletDesc" style="color: blue;cursor: pointer">{{scope.row.wallet || 0}}</p>-->
            <!--{{scope.row.videoToken || 0}}-->
            <p @click="getVideoToken(scope.row.id)" style="color: blue;cursor: pointer">{{videoTokenList[scope.row.index]}}</p>
          </template>
        </el-table-column>
        <el-table-column label="Like Total" sortable align="center" prop="likelist"  />
        <el-table-column label="View Total" sortable align="center" prop="followlist"  />
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
          <el-table-column label="viewer" align="center" prop="viewer"  />
          <el-table-column label="token" align="center" prop="token"  />
          <el-table-column label="time" align="center" prop="updatedDate"  />
        </el-table>
      </el-dialog>
      <el-dialog title="live chat" :visible.sync="rocketType" width="80%">
        <iframe id="rocketchat" name="rocketchat" :key="xToken" @load="iFrameLoaded"
                :src="rocketServer+'/channel/'+rocketId+'?layout=embedded'"
                style="height: 600px;width: 100%;border: 0"/>
      </el-dialog>

      <el-dialog title="Edit Performer" :visible.sync="performerType" width="800px">
        <el-form :rules="performerFormRules" ref="performerRef" :model="performerForm" label-width="140px">
          <el-form-item label="Name" prop="name">
            <el-input v-model="performerForm.name"  />
          </el-form-item>
          <el-form-item label="Alias" prop="alias">
            <el-input v-model="performerForm.alias"/>
          </el-form-item>
            <el-form-item label="Update Password">
                <el-switch
                        v-model="isUpdatePassword"
                        active-value="1"
                        inactive-value="2"
                ></el-switch>
            </el-form-item>
          <el-form-item label="Current Password" v-if="isUpdatePassword==='1'">
            <el-input v-model="performerForm.currentPassword"/>
          </el-form-item>
          <el-form-item label="New Password" v-if="isUpdatePassword==='1'">
            <el-input v-model="performerForm.password"/>
          </el-form-item>
          <el-form-item label="Email" prop="email">
            <el-input v-model="performerForm.email"  />
          </el-form-item>
          <el-form-item label="Mobile" prop="mobile">
            <el-input v-model="performerForm.mobile"  />
          </el-form-item>

          <el-form-item label="Description" prop="description">
            <el-input v-model="performerForm.description"  />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="updatePerformer">submit</el-button>
          <el-button @click="cancel">cancel</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
    import { walletListByVideo,listfollower,updatePerformer,walletListByPerformer,deleteVideo,registervideo,getvideoinfo,updatevideo,setvideoflag,getmyprofile } from '@/api/login'
    import { formatDate } from "@/utils/index";
    import SHA256 from "crypto-js/sha256"
    import { getToken } from '@/utils/auth'
    export default {
        name: "system",
        data(){
            return {
              title:'',//弹出框标题
                userid:'',
                videoList:[],//视频列表
                isUpdatePassword:'2',//是否修改密码 默认不修改
                performerName:'',//演出者名称
                wallet:'',//余额
              rocketId:'',//视频ID
              xToken:'',//火箭聊天token
              performerType:false,//
              rocketServer:'https://api.networkgateway.net:3021',
              rocketType:false,//火箭聊天是否打开
              walletList:[],
              videoTokenList:[],
              tokenList:0,
              walletType:false,//钱包明细弹框
                videoForm:{
                    title:'',//标题
                    url:'',//url
                    performer:'',//演出者
                    description:'',//描述
                    category:'',//类别
                    flag:'LIVE',//
                },//添加视频表单
              performerForm:{

              },////账号信息
              //修改账户信息验证
              performerFormRules:{
                name: [
                  { required: true, message: "NOT NULL", trigger: "change" }
                ],
                alias: [
                  { required: true, message: "NOT NULL", trigger: "change" }
                ],
                email: [
                  { required: true, message: "NOT NULL", trigger: "change" }
                ],
                mobile: [
                  { required: true, message: "NOT NULL", trigger: "change" }
                ],
                description: [
                   { required: true, message: "NOT NULL", trigger: "change" }
                ],
              },
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
                        //this.videoList = res.data.items;//赋值视频列表
                      var i = 0;
                      res.data.items.map(item => {
                        item.followlist = item.followlist.length;
                        item.likelist = item.likelist.length;
                        //通过视频id获取token数
                        walletListByVideo({videoid:item.id}).then(re => {
                          let tokenCount = 0;
                          for (let i = 0; i < re.data.items.length ; i++) {
                              tokenCount += re.data.items[i].token
                          }
                          item.videoToken = tokenCount;
                          item.index = i;
                          i++;
                          this.videoTokenList.push(tokenCount);
                          this.tokenList+=tokenCount
                        })
                      })
                      //this.videoList = res.data.items;
                        console.log('执行了')
                        console.log(res.data.items,this.videoList)
                        this.videoList = res.data.items;
                    }
                })
            },
          getWallet(userid){
            getmyprofile({userid:userid}).then(res => {
              if (res.code === 100){
                this.performerForm = res.data;
                this.performerForm.password = '';
                //this.wallet = res.data.wallet
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
          editPerformer(){
              this.performerType = true;
          },
            //关闭添加演出者弹框
            cancel(){
                this.openEditCore = false;
                this.performerType = false;
            },
            //添加视频
            submitForm(){
              this.tokenList = 0;
              this.videoTokenList = [];
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
                    this.msgSuccess("Update Success!");
                    this.getVideos(this.userid);
                  }else {
                    this.$message.error('Error!');
                  }
                  })
                })
              }else {
                //新增
                this.videoForm.performer = this.userid;
                console.log(this.videoForm);
                registervideo(this.videoForm).then(res => {
                  if (res.code === 100){
                    //添加视频成功同时创建聊天频道
                    this.channelsCreate(res.data);
                    //如果添加的视频是live，需要把其它视频修改为历史状态
                      if (this.videoForm.flag === 'LIVE') {
                          setvideoflag({
                              videoid: res.data,
                              flag: this.videoForm.flag
                          }).then(rec => {
                            console.log('修改flag',rec)
                          }).catch(err => {
                              console.log('错误',err)
                          })
                      }
                    this.getVideos(this.userid);
                    this.openEditCore = false;
                    this.msgSuccess("Add Success!");
                  }else {
                    this.$message.error('Error!');
                  }
                })
              }
                    }
                })
            },
          //修改个人信息
          updatePerformer(){
            this.$refs["performerRef"].validate(valid => {
              if (valid){
                //调用修改接口
                this.performerForm.performerid = this.userid;
                //先修改火箭聊天密码
                this.updateRocketPas(this.performerForm);
              }
            })
          },
          //修改rocket的密码
          updateRocketPas(form){
            this.$axios({
              url:'https://api.networkgateway.net:3021/api/v1/users.updateOwnBasicInfo',
              method:'post',
              headers:{
                'X-Auth-Token': localStorage.getItem('xToken'),
                'X-User-Id': localStorage.getItem('xId'),
                'Content-type':'application/json'
              },
              data:{
                  data: {
                      'newPassword': form.password,
                      'currentPassword': SHA256(form.currentPassword).toString(),
                  }
              }
            }).then(res => {
              if (res.status === 200){
                console.log('修改火箭聊天密码成功');
                  console.log('修改账户密码',form);
                  updatePerformer(form).then(res => {
                      if (res.code === 100){
                          //修改成功后修改rocket的密码
                          this.performerType = false;
                          this.msgSuccess("Update Success!");
                      }else {
                          this.$message.error('Error!');
                      }
                  }).catch(err => {
                      this.$message.error(err);
                  })
              }
            }).catch(err => {
                console.log('错误了',err)
                this.$message.error(err);
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
              this.videoTokenList = [];
              this.tokenList = 0;
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
          //获取视频的token明细
          getVideoToken(videoid){
            walletListByVideo({videoid:videoid}).then(res => {
              if (res.code === 100){
                console.log(res)
                this.walletList = res.data.items;
                this.walletList.map(item => {
                  item.updatedDate = formatDate(item.updatedDate);
                })
                this.walletType = true;
              }
            })
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