<template>
  <div class="login">
    <div class="login-inout-back">
      <div class="login-title-back">
<!--        <img src="@/assets/image/newImg/favicon.ico">-->
        <span>Live Chat</span>
      </div>
      <img src="@/assets/image/newImg/livechat.jpg" style="width: 400px; height: 200px; position: absolute;left:400px;top:80px;opactiy:0.0"/>
      <el-form class="login-form">
        <h3 class="title">Performer Management System</h3>
        <el-form-item prop="username">
          <el-input style="width:50%" v-model="loginForm.username" type="text" auto-complete="off" placeholder="username">
            <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon" />
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
                  style="width:50%"
                  v-model="loginForm.password"
                  type="password"
                  auto-complete="off"
                  placeholder="password"
                  @keyup.enter.native="handleLogin"
          >
            <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon" />
          </el-input>
        </el-form-item>
<!--        <el-form-item prop="code">-->
<!--          <el-input-->
<!--                  v-model="loginForm.code"-->
<!--                  auto-complete="off"-->
<!--                  placeholder="验证码"-->
<!--                  style="width:40%"-->
<!--                  @keyup.enter.native="handleLogin"-->
<!--          >-->
<!--            <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon input-icon" />-->
<!--          </el-input>-->
<!--          <div class="login-code">-->
<!--            &lt;!&ndash; <img :src="codeUrl" @click="getCode" /> &ndash;&gt;-->
<!--            <my-captcha :codeValue="loginForm.code" @codeCheck="codeCheck"></my-captcha>-->
<!--          </div>-->
<!--        </el-form-item>-->
<!--        <el-checkbox v-model="loginForm.rememberMe" style="margin:0px 0px 25px 0px;">自动登录</el-checkbox>-->
        <el-form-item style="width:100%;">
          <el-button
                  :loading="loading"
                  size="medium"
                  type="primary"
                  style="width:50%; height: 50px; font-size: 18px; background: #C9A14F; border: none;"
                  @click.native.prevent="handleLogin"
          >
            <span v-if="!loading">Login</span>
            <span v-else>Logging In</span>
          </el-button>
        </el-form-item>
      </el-form>

    </div>

    <!-- <img class="login-back-img" src="@/assets/image/newImg/default_bg .png" > -->
  </div>
</template>

<script>
  import { getCodeImg,getmyprofile } from "@/api/login";
  import Cookies from "js-cookie";
  import { encrypt, decrypt } from "@/utils/jsencrypt";
  import myCaptcha from "@/components/captcha";

  export default {
    name: "Login",
    components: {
      myCaptcha
    },
    data() {
      let that = this;
      var codeIsOk = (rule, value, callback) => {
        console.log(that.isCodeCorrect);
        if (!that.isCodeCorrect) {
          callback(new Error("1234556"));
        } else {
          callback();
        }
      };
      return {
        isCodeCorrect: false,
        codeUrl: "",
        cookiePassword: "",
        loginForm: {
          username: "",
          password: "", //默认密码
        },
        loading: false,
        redirect: undefined,
          email:''
      };
    },
    created() {
      const that = this;
    },
    watch: {
      $route: {
        handler: function(route) {
          this.redirect = route.query && route.query.redirect;
        },
        immediate: true
      }
    },
    created() {
      //this.getCode();
      //this.getCookie();
    },
    methods: {
      codeCheck(isOk) {
        this.isCodeCorrect = isOk;
      },
      getCode() {
        // getCodeImg().then(res => {
        //   this.codeUrl = "data:image/gif;base64," + res.img;
        //   this.loginForm.uuid = res.uuid;
        // });
      },
      getCookie() {
        const username = Cookies.get("username");
        const password = Cookies.get("password");
        const rememberMe = Cookies.get("rememberMe");
        this.loginForm = {
          username: username === undefined ? this.loginForm.username : username,
          password:
                  password === undefined ? this.loginForm.password : decrypt(password),
          rememberMe: rememberMe === undefined ? false : Boolean(rememberMe)
        };
      },
      handleLogin() {
            this.loading = true;
              Cookies.set("username", this.loginForm.username, { expires: 30 });
              Cookies.set("password", encrypt(this.loginForm.password), {
                expires: 30
              });
              Cookies.set("rememberMe", this.loginForm.rememberMe, {
                expires: 30
              });
              this.$store
                      .dispatch("Login", this.loginForm)
                      .then(() => {
                        this.loading = false;
                        //登录成功跳转界面
                        if (this.loginForm.username === 'admin'){
                          //this.$router.push({path: "/performer"})
                            this.$message.error('Please Login the Performer Account!');
                        } else {
                            //同时登录火箭聊天
                            this.getUserInfo(sessionStorage.getItem('id'));
                          this.$router.push({path: "/system"})
                            //this.$message.error('Please Login the Operator Account!');
                          console.log('演出者用户')
                        }
                      })
                      .catch(() => {
                        this.$message.error('This account has been disabled!');
                        this.loading = false;
                      });
      },
        //同时登录火箭聊天
        loginRocket(data){
            this.$axios({
                url:'https://api.networkgateway.net:3021/api/v1/login',
                method:'post',
                data:{
                    user:data.username,
                    password:data.password
                }
            }).then(res => {
                if (res.status === 200){
                    localStorage.setItem('xToken',res.data.data.authToken);
                    localStorage.setItem("xId",res.data.data.userId);
                }
                //登录成功，保存rocket token
            }).catch(err => {
                //未注册，需要注册用户
                //清除token
                localStorage.setItem('xToken','');
                localStorage.setItem("xId",'');
                this.createRocketChat(data);
            })
        },
        //获取个人信息
        getUserInfo(userid){
            getmyprofile({userid:userid}).then(res => {
                if (res.code === 100){
                    this.email = res.data.email;
                    console.log('email',this.email)
                    this.loginRocket(this.loginForm);
                }
            })
        },
        //注册rocket.chat
        createRocketChat(user){
          let email = this.email;
          this.$axios({
              url:'https://api.networkgateway.net:3021/api/v1/users.register',
              method:'post',
              data:{
                name:user.username,
                  pass:user.password,
                  username:user.username,
                  email:email
              }
          }).then(res => {
              if (res.status === 200){
                  //注册成功，重新登录
                  this.loginRocket(user);
              }
          })
        }
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss">
  .login-title-back {
    display: flex;
    position: absolute;
    bottom: calc(100% + 53px);
    width: 100%;
    align-items: center;
    justify-content: center;
    img {
      width: 80px;
      margin-right: 27px;
    }
    span {
      font-weight: bold;
      font-size: 54px;
    }
  }
  .login-inout-back {
    position: relative;
    z-index: 1;
  }
  .login {
    min-width: 1200px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 100%;
    // background-image: url("../assets/image/login-background.jpg");
    background-color: #d1f3f0;
    background-size: cover;
    position: relative;
    justify-content: center;
    // background-size: 100%;
  }
  .login-back-img {
    position: fixed;
    bottom: 0;
    width: 65%;
  }
  .title {
    margin: 0px auto 60px auto;
    text-align: left;
    color: #707070;
  }


  .lgoin-befaultGirl{
    width: 100px;
    height: 150px;
  }
  .login-form {
    // position: absolute;
    border-radius: 20px;
    background: #ffffff;
    width: 800px;
    padding: 60px 43px 5px 43px;
    // margin-right: 14%;
    .el-input {
      height: 50px;
      input {
        height: 50px;
        padding-left: 55px;
      }
    }
    .input-icon {
      height: 50px;
      width: 20px;
      margin-left: 15px;
    }
  }
  .login-tip {
    font-size: 13px;
    text-align: center;
    color: #bfbfbf;
  }
  .login-code {
    width: 60%;
    height: 38px;
    float: right;
    img {
      cursor: pointer;
      vertical-align: middle;
    }
  }
</style>
