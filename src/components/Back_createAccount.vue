<template>
    <div class="aa">
        <div class="login">
            <h1>创建账户</h1>
            <div style="min-height:50px"></div>
            <el-form ref="form" :model="form" label-width="80px" :rules="formRules">
                <el-form-item label="名称" prop="userName">
                    <el-input v-model="form.userName"></el-input>
                </el-form-item>
                <el-form-item label="账号" prop="userId">
                    <el-input v-model="form.userId"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="passWord">
                    <el-input v-model="form.passWord" type="password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="nowpassWord">
                    <el-input v-model="form.nowpassWord" type="password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">创建账户</el-button>
                </el-form-item>
            </el-form>

        </div>
    </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapMutations, mapActions } = createNamespacedHelpers("CreateAccount");
export default {
    name: "IsRegister",
    data() {
        // 校验密码
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.form.nowpassWord !== '') {
                    this.$refs.form.validateField('nowpassWord');
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.form.passWord) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        // 比例限制
        var checkNum = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('比例不能为空'));
            }
            setTimeout(() => {
                if (!Number.isInteger(value)) {
                    callback(new Error('请输入比例值'));
                } else {
                    if (value < 0 && value > 60) {
                        callback(new Error('必须0-60之间'));
                    } else {
                        callback();
                    }
                }
            }, 1000);
        };
        return {
            tap: true,
            form: {
                userName: '',
                userId: '',
                passWord: '',
                nowpassWord: '',
                beliel: ''
            },
            formRules: {
                userName: [
                    { required: true, message: '请输入名称', trigger: 'blur' },
                    { min: 1, max: 10, message: '长度在 1 到 6 个字符', trigger: 'blur' }
                ],
                userId: [
                    { required: true, message: '请输入账号', trigger: 'blur' },
                    { min: 2, max: 12, message: '长度在 2 到 12 个字符', trigger: 'blur' }
                ],
                passWord: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                nowpassWord: [
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
            // 点击注册方法
            new Promise((resolve, reject) => {

                this.$refs.form.validate((valid) => {
                    if (valid) {
                        // 如果全部信息填完执行成功
                        resolve()
                    } else {
                        // 信息未填完执行失败
                        reject()
                    }
                });
            }).then(() => {
                // 成功后的回调执行
                let user = sessionStorage.getItem('user');
                let User = JSON.parse(user);
                console.log(User)
                let data = {
                    userName: this.form.userName,
                    passWord: this.form.passWord,
                    userId: this.form.userId,
                    userType: Number(User.userType) + 1,
                    userParentId: User.id,
                    nonce: 0
                }
                // 注册成功调用该方法发送注册请求
                this.createAcc(data)
                setTimeout(() => {
                    if (this.data.code == 200) {
                        this.$message({
                            message: '创建账户成功',
                            type: 'success'
                        });
                    } else {
                        this.$message.error('创建账户失败');
                    }
                    this.$refs.form.resetFields()
                }, 500)
            }, () => {
                // 失败后的回调执行
                console.log('error submit!!');
                return false;
            })
        },
        // 创建账方法
        createAcc(data) {
            this.GoRegister(data)
        }
    },
}
</script>
<style scoped>
.login {
    width: 500px;
    margin: 0 auto;
}

.aa {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%
}

.login h1 {
    text-align: center;
}
</style>