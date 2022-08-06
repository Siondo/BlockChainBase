<template>
  <div class="app">
    <el-tabs v-model="activeName" type="card" :stretch='true' class="width">
      <el-tab-pane label="激励钱包地址" name="jili">
        <el-form :model="ruleForm" label-position="top" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="ETH_MAINNET">
            <el-input v-model="ruleForm.ethMainnetAddress"></el-input>
          </el-form-item>
          <el-form-item label="BSC_MAINNET">
            <el-input v-model="ruleForm.bscMainnetAddress"></el-input>
          </el-form-item>
          <el-form-item label="TRC_MAINNET">
            <el-input v-model="ruleForm.trcMainnetAddress"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm1('ruleForm')">Save</el-button>
            <!-- <el-button @click="resetForm('ruleForm')">Cancel</el-button> -->
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="收款地址" name="shouquan">
        <el-form :model="ruleForm" label-position="top" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="ETH_MAINNET">
            <el-input v-model="ruleForm.address"></el-input>
          </el-form-item>
          <el-form-item label=" BSC_MAINNET">
            <el-input v-model="ruleForm.bscAddress"></el-input>
          </el-form-item>
          <el-form-item label=" TRC_MAINNET">
            <el-input v-model="ruleForm.trcAddress"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm2('ruleForm')">Save</el-button>
            <!-- <el-button @click="resetForm('ruleForm')">Cancel</el-button> -->
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="APIKeys" name="key">
        <el-form :model="ruleForm" label-position="top" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="ETH_MAINNET KEY">
            <el-input v-model="ruleForm.ethMainnetKey"></el-input>
          </el-form-item>
          <el-form-item label="BSC_MAINNET KEY">
            <el-input v-model="ruleForm.bscMainnetKey"></el-input>
          </el-form-item>
          <el-form-item label="TRC_MAINNET KEY">
            <el-input v-model="ruleForm.trcMainnetKey"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm3('ruleForm')">Save</el-button>
            <!-- <el-button @click="resetForm('ruleForm')">Cancel</el-button> -->
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>


<script>
import { createNamespacedHelpers } from "vuex";
import { JSON } from "lodash/_freeGlobal.js";
const { mapState, mapMutations, mapActions } = createNamespacedHelpers("payAddress");
export default {
  data() {
    return {
      ruleForm: {
        address: "",
        bscMainnetAddress: "",
        trcMainnetAddress: "",
        ethMainnetAddress: "",
        bscAddress: "",
        trcAddress: "",
      },
      users: "",
      URl: "",
      Ip: '',
      activeName: 'jili'
    };
  },
  computed: {
    ...mapState(['User']),
  },
  methods: {
    ...mapActions(['addmoneyAddresss', 'GetUserId']),
    submitForm1(formName) {

      this.$confirm('确认修改?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let user = JSON.parse(sessionStorage.getItem('user'))
        const { bscMainnetAddress, trcMainnetAddress, ethMainnetAddress } = this.ruleForm
        let obj = {
          bscMainnetAddress,
          trcMainnetAddress,
          ethMainnetAddress
        }
        console.log(obj);
        Object.assign(obj, this.ruleForm)
        // 授权三条链接
        await this.addmoneyAddresss(this.ruleForm);
        this.$message({
          type: 'success',
          message: '修改成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消修改'
        });
      });
    },
    submitForm2(formName) {
      // this.centerDialogVisible = true;
      this.$confirm('确认修改?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let user = JSON.parse(sessionStorage.getItem('user'))
        const { address, bscAddress, trcAddress } = this.ruleForm
        let obj = {
          address,
          bscAddress,
          trcAddress
        }
        Object.assign(obj, this.ruleForm)
        // 授权三条链接
        await this.addmoneyAddresss(this.ruleForm);
        // 收钱address
        this.$message({
          type: 'success',
          message: '修改成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消修改'
        });
      });
    },
    submitForm3(formName) {
      // 收钱address
      this.$confirm('确认修改?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let user = JSON.parse(sessionStorage.getItem('user'))
        const { bscMainnetKey, trcMainnetKey, ethMainnetKey } = this.ruleForm

        let obj = {
          bscMainnetKey, trcMainnetKey, ethMainnetKey
        }
        Object.assign(obj, this.ruleForm)
        // 授权三条链接
        await this.addmoneyAddresss(this.ruleForm);
        this.$message({
          type: 'success',
          message: '修改成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消修改'
        });
      });
    },
    // 表单清空
    resetForm(formName) {
      this.$refs[formName].resetFields();
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
    async finshdata() {
      // 本地获取user
      let user = JSON.parse(sessionStorage.getItem('user'))
      await this.GetUserId({ id: user.id })
      const { address, bscMainnetAddress, trcMainnetAddress, ethMainnetAddress, bscMainnetKey, trcMainnetKey, ethMainnetKey, bscAddress, trcAddress } = this.User;
      this.ruleForm = {
        address,
        bscMainnetAddress,
        trcMainnetAddress,
        ethMainnetAddress,
        bscMainnetKey,
        trcMainnetKey,
        ethMainnetKey,
        bscAddress,
        trcAddress,
        id: user.id
      }
    }
  },
  created() {
    let Ip = window.location.origin;
    this.Ip = Ip
    // 初始化数据
    this.finshdata();
  },
};
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.app {
  display: flex;
  align-items: center;
  justify-content: center;
}

.width {
  width: 700px;
}

a {
  color: rgb(253, 70, 46);
}
</style>