<template>
    <div>
        <el-card class="box-card">
            <div>
                <div class="title">
                    <el-select v-model="value" placeholder="请选择" size="small">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                    <el-input placeholder="搜索" size="small"></el-input>
                    <el-button type="primary" size="small">主要按钮</el-button>
                </div>
            </div>
        </el-card>
        <div style="min-height: 50px"></div>
        <el-card class="box-card">
            <el-table :data="nowData.slice((page - 1) * size, page * size)" border style="width: 100%" size="medium"
                height="400">
                <el-table-column fixed prop="id" label="地址" width="300">
                </el-table-column>
                <el-table-column prop="lastTime" label="开始时间" width="250" sortable>
                </el-table-column>
                <el-table-column prop="updateTime" label="修改时间" width="250" sortable>
                </el-table-column>
                <el-table-column prop="userId" label="用户账号" width="170">
                </el-table-column>
                <el-table-column prop="userName" label="用户名" width="170">
                </el-table-column>
                <el-table-column prop="userType" label="级别" width="150">
                </el-table-column>
                <el-table-column width="180" fixed="right" label="操作">
                    <template slot-scope="scope">
                        <el-button @click="openAddress(scope.row)"
                            :type="scope.row.loginStatus == 1 ? 'danger' : 'primary'" size="small"
                            :disabled="scope.row.loginStatus == 1 ? true : false">修改钱包地址</el-button>
                        <el-button :type="scope.row.loginStatus == 1 ? 'danger' : 'primary'" size="small"
                            @click="openNum(scope.row)" :disabled="scope.row.loginStatus == 1 ? true : false"
                            v-if="scope.row.status">
                            修改分成比例</el-button>
                        <el-button :type="scope.row.loginStatus == 1 ? 'danger' : 'primary'" size="small"
                            :disabled="scope.row.loginStatus == 1 ? true : false" @click="freeze(scope.row)">冻结
                        </el-button>
                        <el-button size="small" @click="open(scope.row)">查看比例</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination background layout="prev, pager, next,total,sizes" :current-page="page"
                @current-change="handleCurrentChange" @size-change="handleSizeChange" :page-sizes="[5, 10, 15, 30]"
                :page-size="size" :total="total">
            </el-pagination>
        </el-card>
    </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapMutations, mapActions } = createNamespacedHelpers("Angentmanage");
export default {
    data() {
        return {
            options: [{
                value: '选项1',
                label: '黄金糕'
            }, {
                value: '选项2',
                label: '双皮奶'
            }],
            value: '',
            tableData: [],
            total: 0,//总共页数
            page: 1,//当前页
            size: 5,//每页显示的数量
            nowData: []
        }
    },
    computed: {
        ...mapState(["data", "deleteBeliel","proxyProportion"]),

    },

    watch: {
        // 计算属性的 getter
        data: function (newVal, Val) {
            // `this` 指向 vm 实例
            let user = JSON.parse(sessionStorage.getItem('user'))
            newVal.some((item) => {
                if (user.userType == item.userType - 1) {
                    item.status = true
                }
                switch (item.userType) {
                    case '-1':
                        item.userType = '用户'
                        break
                    case '0':
                        item.userType = '管理员'
                        break
                    case '1':
                        item.userType = '总代理'
                        break
                    case '2':
                        item.userType = '代理'
                        break
                    case '3':
                        item.userType = '一级代理'
                        break
                    case '4':
                        item.userType = '二级代理'
                        break
                    default:
                        break;
                }
            })

            this.nowData = newVal

        },


    },

    methods: {
        ...mapActions(['GetAngentmanage', 'DeleteBeliel', 'DeleteAddress', 'FreezeAccount', 'GetProxyProportion']),
        // 修改比例
        openNum(row) {
            // ele封装的弹出框
            this.$prompt('请输入比例(只能输入1-100数字)最后数字四舍五入', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputPattern: /\d+/,
                inputErrorMessage: '请输入正确数字'
            }).then(async ({ value }) => {
                let num = Math.round(value);
                if (value >= 100 || value < 0) {
                    this.$message({
                        type: 'error',
                        message: '比例错误'
                    });
                } else {
                    await this.DeleteBeliel({ proportion: num, userId: row.userId });
                    if (this.deleteBeliel.code == 200) {
                        this.$message({
                            type: 'success',
                            message: this.deleteBeliel.data
                        });
                    }
                    else {
                        this.$message({
                            type: 'info',
                            message: this.deleteBeliel.data
                        });
                    }
                }

            }

            )
        },
        async open(row) {
            const { id } = row;
            // 调用分成比例接口
            await this.GetProxyProportion({ id });
            this.$alert(`该账户的分成比例为${this.proxyProportion}`, '提示', {
                confirmButtonText: '确定',
                // callback: action => {
                //     this.$message({
                //         type: 'info',
                //         message: `action: ${action}`
                //     });
                // }
            });
        },
        // 修改钱包地址
        openAddress(row) {
            // ele封装的弹出框
            this.$prompt('请输入钱包地址', '提示', {
            }).then(({ value }) => {
                this.DeleteAddress({ userId: row.userId, address: value })
                // if(this.data.code=200){
                this.$message({
                    type: 'success',
                    message: '修改地址成功'
                });
                // }
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '修改地址失败'
                });
            });
        },
        handleCurrentChange(page) {
            this.page = page
        },
        async getList() {
            let user = sessionStorage.getItem('user')
            let { id } = JSON.parse(user)
            await this.GetAngentmanage(id);
            Object.assign(this.tableData, this.data)
            this.total = this.data.length
        },
        handleSizeChange(size) {
            this.size = size
        },
        async freeze(row) {
            let id = row.id
            await this.FreezeAccount(id)
            await this.getList()
            console.log(row)
        }
    },
    created() {
        // 本地获取user信息
        this.getList()
    }
}
</script>
<style scoped>
.title {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}

.title>div:nth-child(1) {
    flex-grow: 1;
    max-width: 200px;

}

.title>div:nth-child(2) {
    flex-grow: 3;
    max-width: 400px;
}

.title>div:nth-child(3) {
    flex-grow: 2;
}

.el-button--small {
    margin: 5px 0;
}

.el-pagination {
    margin: 5px 0;
    float: right;
}
</style>    