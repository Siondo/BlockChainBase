<template>
    <div style="display: flex;align-items: center;justify-content: center;height: 100vh;">
        <div class="login">
            <h1>账号注册</h1>
            <div style="min-height:50px"></div>
            <el-form ref="form" :model="form" label-width="80px" :rules="rules">
                <el-form-item label="名称" prop="userName">
                    <el-input v-model="form.userName"></el-input>
                </el-form-item>
                <el-form-item label="账号" prop="userId">
                    <el-input v-model="form.userId"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="nowpassword">
                    <el-input type="password" v-model="form.nowpassword"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">注册</el-button>
                    <el-button @click="ontap">去登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapMutations, mapActions } = createNamespacedHelpers("Register");
export default {
    name: "IsRegister",
    data() {
        // rules校验  调用的方法
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.form.nowpassword !== '') {
                    this.$refs.form.validateField('nowpassword');
                }
                callback();
            }
        };
        // rules校验  调用的方法
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.form.password) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            // 注册表单初始化数据
            form: {
                name: '',
                admin: '',
                password: '',
                nowpassword: '',
            },
            // 校验规则
            rules: {
                userName: [
                    { required: true, message: '请输入用户名称', trigger: 'blur' },
                    { min: 1, max: 9, message: '长度在 1 到 9 个字符', trigger: 'blur' }
                ],
                userId: [
                    { required: true, message: '请输入用户账号', trigger: 'blur' },
                    { min: 1, max: 9, message: '长度在 1 到 9 个字符', trigger: 'blur' }
                ],
                password: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                nowpassword: [
                    { validator: validatePass2, trigger: 'blur' }
                ],
            }
        }
    },
    computed: {
        ...mapState(['data'])
    },
    methods: {
        ...mapActions(['GoRegister']),
        onSubmit() {
            // 异步处理
            new Promise((resolve, reject) => {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        // 成功的回调
                        resolve()
                    } else {
                        // 失败的回调
                        reject()
                    }
                });
            }).then(async () => {
                // 成功后执行
                let data = {
                    userName: this.form.userName,
                    passWord: this.form.password,
                    userId: this.form.userId,
                    userType: '3'
                }
                await this.GoRegister({ ...data })
                // 登录成功就跳转到登录
                if (this.data.code == 200) {
                    this.$message({
                        // 注册账号成功
                        message: '注册成功',
                        type: 'success'
                    });
                    this.$router.push('/login')
                } else if (this.data.code == 400) {
                    this.$message({
                        // 该账号已重复
                        message: this.data.msg,
                        type: 'error'
                    });
                } else {
                    this.$message({
                        message: '注册账号失败',
                        type: 'error'
                    });
                }
            }, () => {
                // 失败后执行
                console.log('error submit!!');
                return false;
            })

        },
        ontap() {
            this.$router.push('/login')
        }
    }
}
</script>
<style scoped>
.login {
    width: 500px;
    margin: 0 auto;
}

.login h1 {
    text-align: center;
}
</style>