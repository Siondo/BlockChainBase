<template>
    <div>
        <el-card class="box-card">
            <div>
                <div class="title">
                    <el-button size="small" @click="handlePro" v-if="user.userType != 2">修改分成比例</el-button>
                    <el-button size="small" @click="handlejiliPercent">修改激励比例</el-button>
                    <el-button size="small" @click="handleDrawing">划账</el-button>
                    <el-button size="small" @click="handlejili">激励</el-button>
                    <el-button size="small" @click="handleAcount">创建账户</el-button>
                    <el-button size="small" @click="handleStop" v-if="user.userType == 0">一键停止</el-button>
                    <el-button size="small" @click="handleDestroy" v-if="user.userType == 0">一键销毁</el-button>

                </div>
            </div>
        </el-card>
        <div style="min-height: 50px"></div>
        <el-card class="box-card">
            <!-- 修改分成比例表格 -->
            <el-table :data="data.slice((page - 1) * size, page * size)" border style="width: 100%" size="medium"
                height="400" v-if="show">
                <el-table-column fixed prop="userName" label="修改人" width="250">
                </el-table-column>
                <el-table-column prop="ratio" label="修改值">
                </el-table-column>
                <el-table-column prop="createTime" label="修改时间" fixed="right" width="300">
                </el-table-column>
            </el-table>

            <!-- 修改激励比例表格 -->
            <el-table :data="data.slice((page - 1) * size, page * size)" border style="width: 100%" size="medium"
                height="400" v-if="showjiliPercent">
                <el-table-column fixed prop="userName" label="修改人" width="250">
                </el-table-column>
                <el-table-column prop="incentives" label="修改值">
                </el-table-column>
                <el-table-column prop="createTime" label="修改时间" fixed="right" width="300">
                </el-table-column>
            </el-table>

            <!-- 划账表格 -->
            <el-table :data="data.slice((page - 1) * size, page * size)" border style="width: 100%" size="medium"
                height="400" v-if="showDrawing">
                <el-table-column fixed prop="userName" label="修改人" width="250">
                </el-table-column>
                <el-table-column prop="collectionAddress" label="收款钱包地址">
                </el-table-column>
                <el-table-column prop="sendAddress" label="发款钱包地址">
                </el-table-column>
                <el-table-column prop="hash" label="交易地址">
                </el-table-column>
                <el-table-column prop="createTime" label="修改时间" width="200" fixed="right">
                </el-table-column>
            </el-table>

            <!-- 激励表格 -->
            <el-table :data="data.slice((page - 1) * size, page * size)" border style="width: 100%" size="medium"
                height="400" v-if="showjili">
                <el-table-column fixed prop="userName" label="修改人" width="250">
                </el-table-column>
                <el-table-column prop="incentivesMoney" label="激励金额" width="200">
                </el-table-column>
                <el-table-column prop="incentivesAddress" label="激励地址">
                </el-table-column>
                <el-table-column prop="createTime" label="修改时间" fixed="right" width="300">
                </el-table-column>
            </el-table>

            <!-- 创建用户表格 -->
            <el-table :data="data.slice((page - 1) * size, page * size)" border style="width: 100%" size="medium"
                height="400" v-if="showAcount">
                <el-table-column fixed prop="userId" label="创建ID" width="250">
                </el-table-column>
                <el-table-column prop="createType" label="创建type">
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间" fixed="right" width="300">
                </el-table-column>
            </el-table>

            <!-- 一键停止表格 -->
            <el-table :data="data.slice((page - 1) * size, page * size)" border style="width: 100%" size="medium"
                height="400" v-if="showDestroy">
                <el-table-column fixed prop="userId" label="修改人">
                </el-table-column>
                <el-table-column prop="updateTime" label="修改时间" fixed="right" width="300">
                </el-table-column>
            </el-table>

            <!-- 一键销毁表格 -->
            <el-table :data="data.slice((page - 1) * size, page * size)" border style="width: 100%" size="medium"
                height="400" v-if="showStop">
                <el-table-column fixed prop="userId" label="修改人">
                </el-table-column>
                <el-table-column prop="updateTime" label="修改时间" fixed="right" width="300">
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-pagination background layout="prev, pager, next,total,sizes" :current-page="page"
                @current-change="handleCurrentChange" @size-change="handleSizeChange" :page-sizes="[5, 10, 15, 30]"
                :page-size="size" :total="total">
            </el-pagination>
        </el-card>
    </div>
</template>
<script>
// 导入仓库
import { createNamespacedHelpers } from "vuex";
const { mapState, mapMutations, mapActions } = createNamespacedHelpers("Order");
export default {
    data() {
        return {
            show: true,
            data: [],
            showjiliPercent: false,
            showDrawing: false,
            showjili: false,
            showAcount: false,
            showDestroy: false,
            showStop: false,
            // 登录账号信息
            user: {},
            total: 0,//总共页数
            page: 1,//当前页
            size: 5,//每页显示的数量
        }
    },
    methods: {
        ...mapActions(['GetHistory']),
        async handlePro() {
            this.page = 1
            let user = JSON.parse(sessionStorage.getItem("user"))
            await this.GetHistory({ userType: user.userType, type: 1, pid: user.id })
            if (this.dataList.code == 200) {
                this.data = this.dataList.data
            }
            // 显示修改分成比例记录
            this.total = this.data.length
            this.show = true
            this.showjiliPercent = false
            this.showDrawing = false
            this.showjili = false
            this.showAcount = false
            this.showDestroy = false
            this.showStop = false

        },
        async handlejiliPercent() {
            this.page = 1
            let user = JSON.parse(sessionStorage.getItem("user"))
            await this.GetHistory({ userType: user.userType, type: 2, pid: user.id })
            if (this.dataList.code == 200) {
                this.data = this.dataList.data
            }
            // 显示修改百分比
            this.total = this.data.length
            this.showjiliPercent = true
            this.show = false
            this.showDrawing = false
            this.showjili = false
            this.showAcount = false
            this.showDestroy = false
            this.showStop = false
        },
        async handleDrawing() {
            this.page = 1
            let user = JSON.parse(sessionStorage.getItem("user"))
            await this.GetHistory({ userType: user.userType, type: 3, pid: user.id })
            if (this.dataList.code == 200) {
                this.data = this.dataList.data
            }
            // 显示修改划账记录
            this.total = this.data.length
            this.showDrawing = true
            this.show = false
            this.showjiliPercent = false
            this.showjili = false
            this.showAcount = false
            this.showDestroy = false
            this.showStop = false
        },
        async handlejili() {
            this.page = 1
            let user = JSON.parse(sessionStorage.getItem("user"))
            await this.GetHistory({ userType: user.userType, type: 4, pid: user.id })
            if (this.dataList.code == 200) {
                this.data = this.dataList.data
            }
            // 显示激励结果
            this.total = this.data.length
            this.showjili = true
            this.show = false
            this.showjiliPercent = false
            this.showDrawing = false
            this.showAcount = false
            this.showDestroy = false
            this.showStop = false
        },
        async handleAcount() {
            this.page = 1
            let user = JSON.parse(sessionStorage.getItem("user"))
            await this.GetHistory({ userType: user.userType, type: 5, pid: user.id })
            if (this.dataList.code == 200) {
                this.dataList.data.filter((item) => {
                    switch (item.createType) {
                        case 0:
                            item.createType = '管理员'
                            return
                        case 1:
                            item.createType = '总代理'
                            return
                        case 2:
                            item.createType = '代理'
                            return
                        case 3:
                            item.createType = '用户'
                            return
                        default:
                            return;
                    }
                })
                this.data = this.dataList.data
            }
            // 显示创建用户记录
            this.total = this.data.length
            this.showAcount = true
            this.show = false
            this.showjiliPercent = false
            this.showDrawing = false
            this.showjili = false
            this.showDestroy = false
            this.showStop = false
        },
        handleStop() {
            this.page = 1
            // 显示一键停止记录
            this.total = this.data.length
            this.showStop = true
            this.show = false
            this.showjiliPercent = false
            this.showDrawing = false
            this.showjili = false
            this.showAcount = false
            this.showDestroy = false
        },
        handleDestroy() {
            this.page = 1
            // 显示一键销毁记录
            this.total = this.data.length
            this.showDestroy = true
            this.show = false
            this.showjiliPercent = false
            this.showDrawing = false
            this.showjili = false
            this.showAcount = false
            this.showStop = false
        },
        handleSizeChange(size) {
            this.size = size
        },
        handleCurrentChange(page) {
            this.page = page
        },
    },
    computed: {
        ...mapState(['dataList'])
    },
    created() {
        this.handlePro()
        let user = JSON.parse(sessionStorage.getItem("user"))
        this.user = user
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