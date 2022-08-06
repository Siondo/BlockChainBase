<template>
    <div style="height:100vh">
        <el-container style="height:100%">
            <!-- <el-row> -->
            <el-header style="padding: 0;background-color: #545C64;display: flex;">
                <div style="width:234px;height:100%;text-align: center;">
                    <img src="@/images/logo.png" alt="" style="height: 100%;object-fit: cover;">
                </div>
                <div class="head"
                    style="display: flex;justify-content: space-between; height: 100%;align-items: center;flex-grow: 1;padding:0 20px;">
                    <span class="title" style="color: #fff;font-size: 20px;font-weight: bold;">
                        后台管理 Release Version 0.0.2 @2022 XinDuo Company
                    </span>
                    <el-button size="small" @click="quit">退出登录</el-button>
                </div>
            </el-header>
            <!-- </el-row> -->
            <el-row style="height:100%">
                <el-container style="height:100%">
                    <el-col :xl="4" :sm="7" :md="5" :lg="4" :xs="8">
                        <el-aside style="height:100%;" width="100%">
                            <BackStageMenus></BackStageMenus>
                        </el-aside>
                    </el-col>
                    <el-col :xl="20" :sm="17" :md="19" :lg="20" :xs="16">
                        <el-main>
                            <router-view></router-view>
                        </el-main>
                    </el-col>
                </el-container>
            </el-row>
        </el-container>
    </div>
</template>
<script>
// 引用状态机
import { createNamespacedHelpers } from "vuex";
// 获取状态机内部封装的方法
const { mapState, mapMutations, mapActions } = createNamespacedHelpers("Backstage");
export default {
    name: "BackStage",
    data() {
        return {
            user: ''
        }
    },
    computed: {
        ...mapState(['data'])
    },
    methods: {
        ...mapActions(['GetUserId']),
        quit() {
            // 点击退出登录
            // 清空本地存储，跳转到登录页
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("user");
            this.$message({
                message: '退出成功',
                type: 'success'
            });
            // location.replace('/') //跳回登录地址
            window.location.href = "/";
            this.$store.state.isLoading = true;
        },
    },

}
</script>
<style scoped>
.el-header {
    padding: 0 !important;
    background-color: #545C64;
}

.head {
    display: flex;
    justify-content: space-around;
    padding: 30px;
    box-sizing: border-box;

}

.title {
    background-color: #545C64;
    font-size: 20px;
    font-weight: bold;
    color: #000;
    line-height: 60px;
    padding: 20px;
    box-sizing: border-box;
}

.el-aside {
    overflow: none auto;
    /* width:200px; */
}
