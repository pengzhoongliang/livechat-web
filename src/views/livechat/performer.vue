<template>
    <div>
        <el-button
                style="margin-left: 100px;margin-top: 20px;margin-bottom: 20px"
                type="primary"
                icon="el-icon-plus"
                size="mini"
                @click="handleAdd"
        >add performer</el-button>
        <el-table :data="performerList">
            <el-table-column type="selection" width="55" align="center" />
            <el-table-column label="id" prop="id" width="120" />
            <el-table-column label="name" align="center" prop="name" width="180" />
            <el-table-column label="username" align="center" prop="username" width="180" />
            <el-table-column label="alias" align="center" prop="alias" width="180" />
            <el-table-column label="mobile" align="center" prop="mobile" width="180" />
            <el-table-column label="email" align="center" prop="email" width="180" />
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
            <el-form  label-width="80px">
                <el-form-item label="name" prop="name">
                    <el-input v-model="performerForm.name"  />
                </el-form-item>
                <el-form-item label="username" prop="username">
                    <el-input v-model="performerForm.username"  />
                </el-form-item>
                <el-form-item label="password" prop="password">
                    <el-input type="password" v-model="performerForm.password"  />
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
    </div>

</template>

<script>
    import { performerList } from '@/api/login'
    export default {
        name: "performer",
        data(){
            return {
                performerList:[],//演出者列表
                openEditCore:false,//添加演出者弹框
                performerForm:{
                    name:'',
                    alias:'',
                    email:'',
                    mobile:'',
                    username:'',
                    password:'',
                    type:'PERFORMER'
                }
            }
        },
        created() {
            this.getPerformerList();
        },
        methods:{
            getPerformerList(){
                /*this.$axios({
                    method:'get',
                    url:"https://api.networkgateway.net/api/v1/core/performer"
                }).then(res => {
                    if (res.data.code === 100){
                        this.performerList = res.data.data.items;
                    }
                })*/
                performerList().then(res => {
                    if (res.code === 100){
                        this.performerList = res.data.items;
                    }
                })

            },
            //打开添加演出者弹框
            handleAdd() {
                this.openEditCore = true;
            },
            //关闭添加演出者弹框
            cancel(){
                this.openEditCore = false;
            },
            //添加演出者
            submitForm(){
                this.$axios({
                    method:'post',
                    url:'https://api.networkgateway.net/api/v1/core/register',
                    params:this.performerForm
                }).then(res => {
                    if (res.data.code === 100){
                        this.openEditCore = false;
                        this.getPerformerList();
                        this.msgSuccess("add success!");
                    }else {
                        this.$message.error('error!');
                    }
                })

            }
        }
    }
</script>

<style scoped>

</style>