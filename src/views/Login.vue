<template>
  <div style="
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
    ">
    <div class="login">
      <h1>账号登录</h1>
      <div style="min-height: 50px"></div>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="账号">
          <el-input v-model="form.userId"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.passWord"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">登录</el-button>
          <el-button @click="ontap">去注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapMutations, mapActions } = createNamespacedHelpers("Login");
export default {
  name: "IsLogin",
  data() {
    return {
      form: {
        userId: "",
        passWord: "",
      },
    };
  },
  computed: {
    ...mapState(["data"]),
  },
  methods: {
    ...mapActions(["GoLogin"]),
    async onSubmit() {
      await this.GoLogin({ ...this.form });
      // 如果登录成功
      console.log(this.data);
      if (this.data.code == 0) {
        this.$message({
          message: this.data.msg,
          type: 'error'
        });
      } else {
        sessionStorage.setItem("token", this.data.data.token);
        let user = JSON.stringify(this.data.data);
        sessionStorage.setItem("user", user);
        if (!this.data.data.userType == "-1") {
          this.$message({
            message: '登录成功',
            type: 'success'
          });
          this.$router.push("/home");
        } else {
          this.$message({
            message: '登录成功',
            type: 'success'
          });
          this.$router.push("/backstage");
        }
      }
    },
    // 跳转到注册
    ontap() {
      this.$router.push("/register");
    },
  },
  created() {
    this.$store.state.isLoading = false;
  }

};
</script>
<style scoped>
.login {
  width: 500px;
  margin: 0 auto;
}

.login h1 {
  text-align: center;
}
</style>