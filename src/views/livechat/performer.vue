<template>
    <div>
        <el-button
                style="margin-left: 100px;margin-top: 20px;margin-bottom: 20px"
                type="primary"
                icon="el-icon-plus"
                size="mini"
                @click="handleAdd"
        >add performer</el-button>
        <el-table :data="performerList" empty-text="no data">
            <el-table-column type="selection" width="55" align="center" />
            <el-table-column label="id" prop="id" width="120" />
            <el-table-column label="name" align="center" prop="name" width="170" />
            <el-table-column label="username" align="center" prop="username" width="170" />
            <el-table-column label="alias" align="center" prop="alias" width="170" />
            <el-table-column label="mobile" align="center" prop="mobile" width="170" />
            <el-table-column label="email" align="center" prop="email" width="170" />
            <el-table-column label="status" align="center" width="100">
                <template slot-scope="scope">
                    <el-switch
                            v-model="scope.row.status"
                            active-value="1"
                            inactive-value="2"
                            @change="handleStatusChange(scope.row)"
                    ></el-switch>
                </template>
            </el-table-column>
            <el-table-column label="Payable Total" align="center" prop="paymentwallet" width="110" />
            <el-table-column label="Current Month Receive Total" align="center" prop="monthwallet" width="110" />
            <el-table-column label="Cumulated Paid Total" align="center" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            type="text"
                            @click="getWalletDesc(scope.row)"
                    >{{scope.row.wallet}}</el-button>
                </template>
            </el-table-column>
            <el-table-column label="Close An Account" align="center" width="110" >
                <template slot-scope="scope">
                <el-button

                        type="text"
                        icon="el-icon-circle-check"
                        @click="closeAnAccount(scope.row)"
                ></el-button>
                </template>
            </el-table-column>
            <el-table-column label="operation" align="center" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            type="text"
                            icon="el-icon-edit"
                            @click="openUpdate(scope.row)"
                    >update</el-button>
                    <el-button
                            size="mini"
                            type="text"
                            icon="el-icon-delete"
                    >delete</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="performer wallet detail" :visible.sync="walletType" width="500px">
            <el-form  label-width="100px" :rules="performerRules" :model="performerForm" ref="performerRef">
                <el-form-item label="name" prop="name">
                    <el-input v-model="performerForm.name"  />
                </el-form-item>
                <el-form-item label="username" prop="username">
                    <el-input v-model="performerForm.username"  />
                </el-form-item>
                <el-form-item label="password" prop="password">
                    <el-input type="password" :disabled="updPasw" auto-complete="new-password" v-model="performerForm.password"  />
                </el-form-item>
                <el-form-item label="alias" prop="alias">
                    <el-input v-model="performerForm.alias"  />
                </el-form-item>
                <el-form-item label="email" prop="email">
                    <el-input v-model="performerForm.email"  />
                </el-form-item>
                <el-form-item label="mobile" prop="mobile">
                    <el-input v-model="performerForm.mobile"  />
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitForm">submit</el-button>
                <el-button @click="cancel">cancel</el-button>
            </div>
        </el-dialog>

        <el-dialog :title="title" :visible.sync="openEditCore" width="500px">
            <el-form  label-width="100px" :rules="performerRules" :model="performerForm" ref="performerRef">
                <el-form-item label="name" prop="name">
                    <el-input v-model="performerForm.name"  />
                </el-form-item>
                <el-form-item label="username" prop="username">
                    <el-input v-model="performerForm.username"  />
                </el-form-item>
                <el-form-item label="password" prop="password">
                    <el-input type="password" :disabled="updPasw" auto-complete="new-password" v-model="performerForm.password"  />
                </el-form-item>
                <el-form-item label="alias" prop="alias">
                    <el-input v-model="performerForm.alias"  />
                </el-form-item>
                <el-form-item label="email" prop="email">
                    <el-input v-model="performerForm.email"  />
                </el-form-item>
                <el-form-item label="mobile" prop="mobile">
                    <el-input v-model="performerForm.mobile"  />
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitForm">submit</el-button>
                <el-button @click="cancel">cancel</el-button>
            </div>
        </el-dialog>
        <el-dialog title="wallet particulars" :visible.sync="walletDesc" width="600px">
            <el-table :data="walletList" empty-text="no data">
                <el-table-column label="viewer" align="center" prop="viewer" width="180" />
                <el-table-column label="token" align="center" prop="token" width="180" />
                <el-table-column label="time" align="center" prop="updatedDate" width="180" />
            </el-table>
        </el-dialog>
    </div>

</template>

<script>
    import { closeAnAccount ,performerList,getmyprofile,setperformerstatus,walletListByPerformer } from '@/api/login'
    import { formatDate } from "@/utils/index";
    export default {
        name: "performer",
        data(){
            return {
                performerList:[],//演出者列表
                title:'',
                walletType:false,
                walletList:[],
                updPasw:false,//是否可以修改密码
                openEditCore:false,//添加演出者弹框
                walletDesc:false,//礼物明细弹框
                performerForm:{
                    name:'',
                    alias:'',
                    email:'',
                    mobile:'',
                    username:'',
                    password:'',
                    type:'PERFORMER'
                },
                performerRules:{
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
                    username: [
                        { required: true, message: "NOT NULL", trigger: "change" }
                    ],
                    password: [
                        { required: true, message: "NOT NULL", trigger: "change" }
                    ],
                }
            }
        },
        created() {
            this.getPerformerList();
        },
        methods:{
            getPerformerList(){
                performerList().then(res => {
                    if (res.code === 100){
                        this.performerList = res.data.items;
                    }
                })
            },
            //查询钱包明细
            getWalletDesc(user){
                walletListByPerformer({
                    performer : user.id
                }).then(res => {
                    if (res.code === 100) {
                        this.walletList = res.data.items
                        this.walletList.map(item => {
                            item.updatedDate = formatDate(item.updatedDate)
                        })
                        this.walletDesc = true;
                    }
                })
            },
            //打开添加演出者弹框
            handleAdd() {
                this.performerForm = {
                    type:'PERFORMER'
                }
                this.title = 'add performer'
                this.updPasw = false;
                this.openEditCore = true;
            },
            //关闭添加演出者弹框
            cancel(){
                this.openEditCore = false;
            },
            //添加演出者
            submitForm(){
                this.$refs["performerRef"].validate(val => {
                    if (val){
                        if (this.performerForm.id == undefined){
                            //新增
                this.$axios({
                    method:'post',
                    url:process.env.VUE_APP_ROCKET+'/core/register',
                    params:this.performerForm
                }).then(res => {
                    if (res.data.code === 100){
                        this.openEditCore = false;
                        this.getPerformerList();
                        this.msgSuccess("add success!");
                    }else {
                        this.$message.error(res.data.data);
                    }
                })
                    }else {
                            //修改

                        }
                    }
                })
            },
            //打开修改弹框
            openUpdate(data){
                this.title = 'update performer'
                this.updPasw = true;
                getmyprofile(
                    {
                        userid:data.id
                    }
                ).then(res => {
                    if (res.code === 100) {
                        this.performerForm = res.data;
                        this.openEditCore = true;
                    }
                }).catch(err => {
                    alert(err)
                })
            },
            //结算
            closeAnAccount(row){
                closeAnAccount({
                    performerid:row.id
                }).then(res => {
                    if (res.code === 100) {
                        this.msgSuccess('Close An Account Success');
                        this.getPerformerList();
                    }
                })
            },
            //查询礼物明细
            openWallet(data){
                this.walletType = true;
            },
            //修改演出者状态
            handleStatusChange(row) {
                console.log(row.username,row)
                let text = row.status === "2" ? "start using" : "block up";
                this.$confirm('sure"' + text + '""' + row.username + '"performer吗?', "warning", {
                    confirmButtonText: "confirm",
                    cancelButtonText: "cancel",
                    type: "warning"
                }).then(function() {
                    return setperformerstatus(row.id,row.status);
                }).then(() => {
                    this.msgSuccess(text + "success");
                }).catch(function() {
                    row.status = row.status === "2" ? "1" : "2";
                });
            },
        }
    }
</script>

<style scoped>

</style>