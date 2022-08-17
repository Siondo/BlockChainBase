
<template>
  <div class="aa">
    <!-- 刷新数据 -->
    <el-card>
      <el-row>
        <el-button type="primary" size="small" class="floatleft" @click="jumpResults" v-if="falg">激励界面</el-button>
        <el-button type="primary" size="small" class="floatleft" @click="jumpInterface" v-if="falgs">激励结果</el-button>
        <el-button type="primary" size="small" class="floatright" @click="fresh">刷新</el-button>
      </el-row>
    </el-card>

    <div style="min-height:50px"></div>
    <!-- 表格区域 -->
    <el-card>
      <div v-if="falg">
        <el-table border :data="jiliDataListawait.slice((page - 1) * size, page * size)" style="width: 100%"
          size="medium" height="400">
          <el-table-column fixed prop="incentives" label="激励比例" width="100">
          </el-table-column>
          <el-table-column prop="userName" label="姓名" width="150">
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" width="180">
          </el-table-column>
          <el-table-column prop="incentivesMoney" label="激励总量" width="110" sortable></el-table-column>
          <el-table-column prop="tempAddress" label="钱包地址" width="350"> </el-table-column>
          <el-table-column prop="coinType" label="授权币种" width="100"> </el-table-column>
          <el-table-column prop="accountBalance" label="账户余额" width="110" sortable>
          </el-table-column>
          <el-table-column prop="userParentName" label="上级用户" width="100">
          </el-table-column>
          <el-table-column prop="userType" label="用户权限" width="120">
          </el-table-column>
          <el-table-column label="操作" fixed="right">
            <template slot-scope="scope">
              <el-button size="mini" @click.native.prevent="jili(scope.row, tableData)" type="primary"
                class="floatleft">激励
              </el-button>
              <el-button size="mini" @click="handleEdit(scope.row)">修改激励值
                <!-- 弹窗设置激励百分值 -->
                <!-- handleEdit(scope.$index, scope.row) -->
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination background layout="prev, pager, next,total,sizes" :current-page="page"
          @current-change="handleCurrentChange" @size-change="handleSizeChange" :page-sizes="[5, 10, 15, 30]"
          :page-size="size" :total="total">
        </el-pagination>
      </div>


      <!-- 激励结果界面 -->
      <div v-if="falgs">
        <el-table border :data="jiliResultawait.slice((page2 - 1) * size2, page2 * size2)" style="width: 100%"
          size="medium" height="400">
          <el-table-column fixed prop="incentives" label="激励比例" width="150">
          </el-table-column>
          <el-table-column prop="userName" label="姓名" width="180">
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" width="180">
          </el-table-column>
          <el-table-column prop="id" label="id" width="350"> </el-table-column>
          <el-table-column prop="address" label="地址" width="300">
          </el-table-column>
          <el-table-column prop="userParentName" label="上级用户" width="100">
          </el-table-column>
          <el-table-column prop="userType" label="用户权限" width="120">
          </el-table-column>
          <el-table-column label="操作" fixed="right">
            <template slot-scope="scope">
              <el-button size="mini" class="backred" @click.native.prevent="deleteRow(scope.row)">
                移除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination background layout="prev, pager, next,total,sizes" :current-page="page2"
          @current-change="handleCurrentChange2" @size-change="handleSizeChange2" :page-sizes="[5, 10, 15, 30]"
          :page-size="size2" :total="total2">
        </el-pagination>
      </div>
    </el-card>

    <!-- 弹窗 -->
    <el-dialog title="提示" :visible.sync="centerDialogVisible" width="30%" center>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="激励比例" prop="pass">
          <el-input type="text" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Gas" prop="checkPass">
          <el-input type="text" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Total Cost" prop="age">
          <el-input v-model.number="ruleForm.age"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="centerDialogVisible = false" v-on:click="split">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改激励状态弹窗 -->
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="formtab">
        <el-form-item label="激励比例" :label-width="formLabelWidth">
          <el-input v-model="formtab.beliel" disabled></el-input>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="formtab.userId" disabled></el-input>
        </el-form-item>
        <el-form-item label="创建时间" :label-width="formLabelWidth">
          <el-input v-model="formtab.createTime" disabled></el-input>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth">
          <el-input v-model="formtab.tempAddress" disabled></el-input>
        </el-form-item>
       <el-form-item label="激励金额" :label-width="formLabelWidth">
          <el-input v-model="formtab.incentivesMoney" ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="subjili">确认激励</el-button>
        <el-button @click="dialogFormVisible = false">取消激励</el-button>
      </div>
    </el-dialog>
    <!-- 修改激励值弹窗 -->
    <el-dialog title="设置投喂数据" :visible.sync="dialogVisible" width="50%">
      <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="80px">
        <el-form-item prop="incentives" :rules="{
          required: true,
          message: '激励值不能为空',
          trigger: 'blur',
        }" label="激励值">
          <el-input v-model="dynamicValidateForm.incentives" width="80">
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancle">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 导入仓库
import { createNamespacedHelpers } from "vuex";
const { mapState, mapMutations, mapActions } = createNamespacedHelpers("Excitation");
import BlockChain from "../blockchain/BlockChainBase";
const blockChain = new BlockChain();
export default {
  data() {
    // 校验方法 rules调用
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (value < 18) {
            callback(new Error("必须年满18岁"));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    // 校验方法 rules调用
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入数字(0-100的整数)"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    // 校验方法 rules调用
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入数字(0-100的整数)"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入数字不一致!"));
      } else {
        callback();
      }
    };

    return {
      // 初始化表单
      ruleForm: {
        pass: "",
        checkPass: "",
        age: "",
      },
      // 校验方法
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        age: [{ validator: checkAge, trigger: "blur" }],

      },

      centerDialogVisible: false,
      // 激励界面切换开关
      falg: true,
      // 开关
      falgs: false,
      // 开关
      //储存用户的id
      use: "",
      uses: {},
      tableData: [],
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px',
      dialogFormVisible: false,
      dialogVisible: false,
      // 确认激励模态框from
      formtab: {
      },
      dynamicValidateForm: {
        incentives: "",
      },
      total: 0,//总共页数
      page: 1,//当前页
      size: 5,//每页显示的数量
      total2: 0,//总共页数
      page2: 1,//当前页
      size2: 5,//每页显示的数量
      jiliDataList: [],   //激励页面渲染的数据
      jiliResult: [],
      jiliDataListawait: [],
      jiliResultawait: []
    };
  },
  computed: {
    ...mapState(['data', 'updateIncentivesMoneyData', 'user']),
    // 计算属性计算激励页面数据
    capitalize: function (value) {
      return this.data
    },
  },
  watch: {
    // 监听激励页面的数据
    data: function (newVal, val) {
      console.log(this.jiliDataList);
      this.jiliDataList = newVal
    },
    // 获取操作人user信息,判断操作人旗下用户是否授权
    user: function (newVal, val) {


    },
    // 监听激励结果页面的数据
    capitalize: function (newVal, val) {
      console.log(newVal);
      this.jiliResult = newVal
    }
  },

  methods: {
    ...mapActions(['FindIncentives', 'FindOne', 'UpdateBeliel', 'UpdateIncentivess', 'UpdateIncentivesMoney']),
    async subjili() {
      let user = JSON.parse(sessionStorage.getItem("user"))
      // 确认激励----是否激励
      // 解构操作地址
      const { address } = this.user;
      // 解构激励用户
      const { id, chainType, tempAddress, incentivesMoney } = this.formtab
      // 激励接口
      blockChain.doTransfer(address, tempAddress, 10, async (result) => {
        // 如果激励成功
        if (result) {
          // 记录激励操作
          await this.UpdateIncentivesMoney({ id, incentivesMoney, loginUserId: user.id })
          const { code, msg } = this.updateIncentivesMoneyData
          if (code == 200) {
            this.$message({
              type: 'success',
              message: msg
            });
          } else {
            this.$message({
              type: 'error',
              message: msg
            });
          }
        } else {
          // 激励失败
          this.$message({
            type: 'error',
            message: `操作激励失败`
          });
        }
      }, null, chainType)

      // 关闭模态框
      this.dialogFormVisible = false;
    },
    deleteRow(row) {
      // 删除一条激励数据
      // rows.splice(index, 1);
      // console.log(index, rows);
      // console.log(row)
      // console.log(this.data)
      // this.data = this.data.filter((item)=>{item.id==row.id})
    },

    handleEdit(row) {
      this.scoperow = row;
      this.dialogVisible = true;
    },
    handleSubmit() {
      // 提交激励的值---修改激励值
      this.$refs.dynamicValidateForm.validate(async (valid) => {
        let user = JSON.parse(sessionStorage.getItem("user"));
        if (valid) {
          await this.UpdateIncentivess({
            id: this.scoperow.id,
            incentives: this.dynamicValidateForm.incentives,
            loginUserId: user.id
          });
        } else {
          console.log("error submit!!");
          return false;
        }
        this.use = user.id;
        await this.FindIncentives(this.use)
        this.dialogVisible = false;
      });
      // 清空表单数据
      this.dynamicValidateForm = {};
    },
    handleCancle() {
      // 取消表单提交，并清空内容
      this.dynamicValidateForm = {};
      this.dialogVisible = false;
    },
    async jili(row, rows) {
      // console.log(row, rows);
      // 将对应激励用户显示在formtab中
      this.formtab = row;
      this.formtab["totleMoney"] = 0;
      await this.FindIncentives(this.use)
      this.dialogFormVisible = true
      console.log(this.formtab);
    },

    //刷新按钮
    fresh() {
      window.location.reload();
    },

    //修改分成比例
    split() {
      // 调用方法修改比例
      this.UpdateBeliel({
        userId: this.uses,
        beliel: this.ruleForm.pass,
      })
    },

    // 激励界面点击事件
    jumpResults() {
      this.falg = false;
      this.falgs = true;
    },
    jumpInterface() {
      let arr = this.tableData.filter((item) => item.address)
      this.teltableData = arr;
      this.falg = true;
      this.falgs = false;
    },
    handleCurrentChange(page) {
      this.page = page
    },
    handleCurrentChange2(page2) {
      this.page2 = page2
    },
    handleSizeChange(size) {
      this.size = size
    },
    handleSizeChange2(size2) {
      this.size2 = size2
    },
    async getList() {
      let user = JSON.parse(sessionStorage.getItem("user"));
      this.use = user.id;
      await this.FindIncentives(this.use)
      await this.FindOne(user)

      this.$nextTick(() => {
        console.log(this.jiliDataList);
        console.log(this.jiliResult);

        const { address } = this.user
        var setup = (item, callBack) => {
          var agentAddress, userAddress, upperAddress
          if (item.chainType == 'ETH') {
            agentAddress = this.user.ethMainnetAddress   //当前代理激励钱包地址   
            userAddress = item.ethMainnetAddress         //用户钱包地址
            upperAddress = item.parentEthMainnetAddress  //上级激励钱包地址
          }
          else if (item.chainType == 'BSC') {
            agentAddress = this.user.bscMainnetAddress
            userAddress = item.bscMainnetAddress
            upperAddress = item.parentBscMainnetAddress
          }
          else if (item.chainType == 'TRC') {
            agentAddress = this.user.trcMainnetAddress
            userAddress = item.trcMainnetAddress
            upperAddress = item.parentTrcMainnetAddress
          }

          item.upperAgent = upperAddress
          item.isTransferFrom = agentAddress == upperAddress ? true : false
          callBack(upperAddress, userAddress)
        }

        // 循环判断激励数据中是否授权
        this.jiliDataList.filter(async (item, index) => {
          setup(item, async (upperAddress, userAddress) => {
            await blockChain.checkApprove(upperAddress, userAddress, (result) => {
              // 当未判断是否授权时, 默认为true
              // let result = true
              if (result != false) {
                this.jiliDataListawait.push(item)
              }
            }, item.chainType)
          })
        })
        this.total = this.jiliDataListawait.length

        // 循环判断激励数据中是否授权
        this.jiliResult.filter(async (item, index) => {
          setup(item, async (upperAddress, userAddress) => {
            await blockChain.checkApprove(upperAddress, userAddress, (result) => {
              // 当未判断是否授权时, 默认为true
              // let result = true
              if (result != false) {
                this.jiliResultawait.push(item)
              }
            }, item.chainType)
          })
        })
        this.total2 = this.jiliResultawait.length
      })
    }
  },
  //请求用户数据
  created() {
    // 获取用户id
    this.getList()
  },
};
</script>


<style scoped>
.backred {
  color: white;
  background-color: rgb(245, 102, 59);
}

.floatright {
  float: right;
}

.floatleft {
  float: left;
}

.el-pagination {
  margin: 5px 0;
  float: right;
}
</style>



