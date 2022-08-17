<template>
    <div style="height:100vh">
        <el-container style="height:100%">
            <!-- <el-row> -->
            <el-header style="padding: 0;background-color: #545C64;display: flex;">
                <div style="width:234px;height:100%;text-align: center;">
                    <img src="@/images/logo.png" alt="" style="height: 100%;object-fit: cover;" />
                </div>
                <div class="head"
                    style="display: flex;justify-content: space-between; height: 100%;align-items: center;flex-grow: 1;padding:0 20px;">
                    <span class="title" style="color: #fff;font-size: 20px;font-weight: bold;">
                        后台管理                                                -Release Version 0.1.0
                    </span>
                    <!-- <el-button size="small" @click="quit">退出登录</el-button> -->
                    <el-dropdown @command="handleCommand" size="small" type="primary">
                        <el-button type="primary" style="background-color:#fff;color: #000;border-color: #fff;">
                            我的<i class="el-icon-arrow-down el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="changePassword">修改密码</el-dropdown-item>
                            <el-dropdown-item command="quit">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
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
        <el-dialog title="修改密码" :visible.sync="dialogFormVisible">
            <el-form :model="form" :rules="rules" ref="form" status-icon>
                <el-form-item label="当前密码" :label-width="formLabelWidth" prop="nowPassword">
                    <el-input v-model="form.nowPassword" autocomplete="off" show-password></el-input>
                </el-form-item>
                <el-form-item label="修改密码" :label-width="formLabelWidth" prop="changePassword">
                    <el-input v-model="form.changePassword" autocomplete="off" show-password></el-input>
                </el-form-item>
                <el-form-item label="确认密码" :label-width="formLabelWidth" prop="confirmPassword">
                    <el-input v-model="form.confirmPassword" autocomplete="off" show-password></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitForm('form')">确 定</el-button>
            </div>
        </el-dialog>
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
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入当前密码'));
            }
            else {
                this.iptBlur((res) => {
                    console.log(res, `res`);
                    if (res) {
                        callback();
                    } else {
                        callback(new Error(`输入密码错误`));
                    }
                })
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.form.changePassword !== '') {
                    // this.$refs.form.validateField('changePassword');
                }
                callback();
            }
        };
        var validatePass3 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.form.changePassword) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            user: '',
            dialogFormVisible: false,
            form: {
                nowPassword: '',
                changePassword: '',
                confirmPassword: '',
            },
            formLabelWidth: '120px',
            rules: {
                nowPassword: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                changePassword: [
                    { validator: validatePass2, trigger: 'blur' }
                ],
                confirmPassword: [
                    { validator: validatePass3, trigger: 'blur' }
                ],
            },
            href:""
        }
    },
    computed: {
        ...mapState(['data', 'verifyPassWordRes', 'nowPassWordRes'])
    },
    methods: {
        ...mapActions(['GetUserId', 'VerifyPassWord', 'UpdatePassWord']),
        handleCommand(command) {
            switch (command) {
                case 'quit':
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
                    break;
                case 'changePassword':
                    this.dialogFormVisible = true
                    break;
                default:
                    break;
            }
        },
        async iptBlur(callback) {
            // 如果输入当前密码为空
            if (this.form.nowPassword === '') {
                callback(new Error('请输入当前密码'));
            } else {
                // 当前密码不为空
                await this.VerifyPassWord({ id: this.user.id, passWord: this.form.nowPassword })
                console.log(this.verifyPassWordRes.code);
                if (this.verifyPassWordRes.code == 200) {
                    callback(true);
                } else {
                    callback(false);
                }
            }

        },
        // 提交修改密码
        submitForm(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    await this.UpdatePassWord({ id: this.user.id, passWord: this.form.changePassword })
                    console.log(this.nowPassWordRes);
                    if (this.nowPassWordRes.code == 1) {
                        this.$message({
                            message: '修改密码成功',
                            type: 'success'
                        });
                        this.dialogFormVisible = false
                        // 延迟退出
                        setTimeout(() => {
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
                        }, 500);
                    } else {
                        this.$message({
                            message: '修改密码失败',
                            type: 'error'
                        });
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
    },
    created() {
        let user = JSON.parse(sessionStorage.getItem('user'));
        this.user = user
    }

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

.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
}

.el-icon-arrow-down {
    font-size: 12px;
}
