<template>
    <div style="height: 100%;">
        <el-menu :default-active="$route.path" router class="el-menu-vertical-demo" background-color="#545c64"
            text-color="#fff" active-text-color="#ffd04b">
            <el-menu-item index="/backstage" router>
                <i class="el-icon-s-home"></i>
                <span slot="title">
                    主页
                </span>
            </el-menu-item>
            <el-submenu index="2" v-if="this.user.userType == '0'">
                <template slot="title">
                    <i class="el-icon-s-tools"></i>
                    <span>GM工具</span>
                </template>
                <el-menu-item @click="openStop">
                    <i class="el-icon-remove"></i>
                    <span slot="title">一键停止</span>
                </el-menu-item>
                <el-menu-item @click="openDistory">
                    <i class="el-icon-warning"></i>
                    <span slot="title">
                        一键销毁
                    </span>
                </el-menu-item>
            </el-submenu>
            <el-menu-item index="/backstage/user" router>
                <i class="el-icon-user-solid"></i>
                <span slot="title">
                    用户管理
                </span>
            </el-menu-item>
            <el-menu-item index="/backstage/angentmanage" router v-if="this.user.userType != '2'">
                <i class="el-icon-s-custom"></i>
                <span slot="title">
                    代理管理
                </span>
            </el-menu-item>
            <el-menu-item index="/backstage/order" router>
                <i class="el-icon-s-order"></i>
                <span slot="title">
                    历史记录
                </span>
            </el-menu-item>
            <el-menu-item index="/backstage/excitation" router>
                <i class="el-icon-s-check"></i>
                <span slot="title">
                    激励
                </span>
            </el-menu-item>
            <!-- 创建账户 -->
            <el-menu-item index="/backstage/createAccount" router>
                <i class="el-icon-s-claim"></i>
                <span slot="title">
                    创建账户
                </span>
            </el-menu-item>
            <el-menu-item index="/backstage/authorization" router v-if="this.user.userType != '0'">
                <i class="el-icon-share"></i>
                <span slot="title">
                    授权链接
                </span>
            </el-menu-item>
        </el-menu>
    </div>
</template>
<script>
export default {
    data() {
        return {
            user: {}
        }
    },
    methods: {
        openStop() {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        openDistory() {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        }
    },
    created() {
        let user = JSON.parse(sessionStorage.getItem('user'))
        this.user = user
    }
}
</script>
<style scoped>
.el-menu {
    height: 100%;
}
</style>