<template>
  <div class="app">
    <div class="header">
      <div class="left">
        <router-link to="/home/main">
          <a href="">
            <i class="el-icon-s-home"></i>
            HOME
          </a>
        </router-link>
        <router-link to="/home/shore">
          <a href="">
            <i class="iconfont icon-fenxiang"></i>
            SHARE
          </a>
        </router-link>
      </div>
      <div class="center">
        <img src="../images/icon_eth.f763823b.png" alt="" style="width: 2.93333333vw;">
        <span id="lang_title">minering</span>
      </div>
      <div class="me">
        <router-link to="/home/me">
          <a href="">
            <i class="el-icon-user-solid"></i>
            ACCOUNT
          </a>
        </router-link>
        <a @click="quit">
          <i class="iconfont  icon-icon"></i>
          QUIT
        </a>
      </div>
    </div>
    <div style="height: 50vw">
      <router-view></router-view>
    </div>

    <el-dialog title="Website application authorizes your wallet" :visible.sync="falg" width="60%" center>
      <span style="text-align: center;display:block;">1.If the license does not respond, click the Reset button below to
        clear the corresponding (Eth/Bsc/Trc) link information</span>
      <br />
      <span style="text-align: center;display:block;">2.If you have connected wallet but do not pull 'App Wallet
        Authorization 'for a long time, please return to this page to refresh and click Authorization again</span>
      <br />
      <span style="text-align: center;display:block;">3.After 'agree to grant' may need to wait on the chain Peeding,
        perhaps you should wait for a while on this page</span>
      <span slot="footer" class="dialog-footer">
        <el-button >Reset</el-button>
        <el-button type="primary">Approve</el-button>
      </span>
    </el-dialog>

    <TabContainer></TabContainer>
  </div>
</template> 
<script>
// 引入组件
import TabContainer from '../components/Home_tab_container.vue'
// 封装的调用钱包方法
import BlockChain from "../blockchain/BlockChainBase"
// 引用状态机
import { createNamespacedHelpers } from "vuex";
// 封装的自动注册方法
import { autoRegister } from '../utils/myRegisterUtils'
const blockUtils = new BlockChain();
// 获取状态机内部封装的方法
const { mapState, mapMutations, mapActions } = createNamespacedHelpers("Home");

export default {
  name: "IsHome",
  components: {
    TabContainer
  },
  data() {
    return {
      falg:false
    };
  },
  computed: {
  },
  methods: {
    quit() {
      this.$message({
        message: '退出成功',
        type: 'success'
      });
      // 点击退出登录
      // 清空本地存储，跳转到登录页
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
      // location.replace('/') //跳回登录地址
      setTimeout(() => {
        window.location.href = "/";
      }, 500);
    },

  },
  created() {
    
  }
}

</script>
<style scoped>
.app {
  /* height: 100vw; */
  display: flex;
  flex-direction: column;
  /* background-image: url(../images/loginleftbg.6cfc269.jpg); */
  /* background-image: url(../images/banner_home2.483edd9e.png); */
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.big {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.3);
}

.box {
  width: 30%;
  height: 30%;
  position: absolute;
  left: 33%;
  transform: translateX(-50%);
  top: 40%;
  transform: translateY(-50%);
  background-color: white;
  border: 1px solid gray;
  border-radius: 5px;
  box-shadow: 10px 10px 5px gray;
}

.box>p {
  font-size: 32px;
  width: 90%;
  height: 20%;
  margin: 20px auto;
  line-height: 200%;
  text-align: center;
  /* background-color: aqua; */
}

button {
  width: 30%;
  height: 15%;
  margin-left: 70px;
  margin-top: 30px;
  font-size: 24px;
  border-radius: 8px;
  outline: none;
  border: none;
  color: white;
}

button:nth-of-type(1) {
  background-color: rgb(41, 200, 248);
}

button:nth-of-type(2) {
  background-color: rgb(255, 87, 65);
}

.header {
  height: 150px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 2vw;
  background-color: #1652F0;
}


.left {
  display: flex;
  width: 150px;
  justify-content: space-evenly;
}

#lang_title {
  margin-left: 1.06666667vw;
  font-size: 4.53333333vw;
  font-weight: 600;
  color: #fff;
}

.left a {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
}

.left a i {
  font-size: 25px;
}

.me {
  display: flex;
  width: 180px;
  justify-content: space-evenly;
  align-items: center;
}

.me a {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
}

.me a i {
  font-size: 25px;
}
</style>