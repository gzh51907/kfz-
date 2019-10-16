<template>
  <div>
   <div class="content">
        <header>
           <img src="../assets/logo.png" style="width:50px;height:50px">
           <span>孔夫子旧书网后台管理系统</span>
        </header>
    <el-form :model="ruleForm" :rules="rules" ref="regForm" status-icon label-width="4.2rem" style="margin-top:.3rem">
      <el-form-item label="用户名" prop="username" class="label">
        <el-input v-model="ruleForm.username" style="width:85%" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off" style="width:85%" placeholder="请输入密码" maxlength="16"></el-input>
      </el-form-item>
      <el-form-item>
        <el-checkbox label="下次免登陆" v-model="ruleForm.mdl"></el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm" style="width:85%">登录</el-button>
      </el-form-item>
    </el-form>
   </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ruleForm: {
        username: "",
        password: "",
        mdl: true
      },
      rules: {
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        username: [
          { required: true, message: "亲，用户名必须填写哟", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
      goOff() {
      this.$router.go(-1);
      },
      goto(){
          this.$router.push('/reg')
      },
    submitForm() {
      //   校验整个表单
      this.$refs.regForm.validate(async valid => {
        // valid： 所有校验规则都通过后，得到true，只要有一个表单元素校验不通过则得到form
        if (valid) {
          // alert('submit!');
          // 发起ajax请求，等待服务器返回结果
          // 根据服务器返回结果：注册成功->跳到“我的”

          let { username, password, mdl } = this.ruleForm;

          let { data } = await this.$axios.get(
            "http://localhost:1906/user/login",
            {
              params: {
                username,
                password,
                mdl
              }
            }
          );
          console.log("data:", data);

          // this.$router.replace('/mine')
          if (data.code === 1) {
            let { targetUrl } = this.$route.query;console.log('targetUrl:',targetUrl)

            this.$router.replace({
              path: targetUrl || "/goods"
            });

            // 把token写入localstorage
            localStorage.setItem("Authorization", data.data);
            // this.$router.replace({path:'/mine',params:{username}})
          } else {
            alert("用户名或密码不正确");
          }
        } else {
          window.console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style scoped>
.content{
    margin-top:50%;
    width: 50%;
    height: 30%;
    margin: auto;
}
header {
  width: 100%;
  height: 2.64rem;
  line-height: .64rem;
  position: relative;
  font-size: .253333rem;
  display: flex;
  justify-content: space-around;
  font-size: 20px;
  line-height: 50px;
  margin-bottom: 20px;
  
}

.label{width: 100%;}
</style>