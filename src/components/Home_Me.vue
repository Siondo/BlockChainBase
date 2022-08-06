<template>
    <div class="main">
        <div class="fromTable">
            <h1 style="text-align: center">个人中心</h1>
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="名称">
                    <el-input v-model="form.userName" :disabled="statusName" ref="Myname"></el-input>
                    <el-button type="success" @click="checkName">{{ statusName ? '修改名称' : '修改完成' }}</el-button>
                </el-form-item>
                <el-form-item label="账号">
                    <el-input v-model="form.userId" disabled></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="form.password" :disabled="statusPassword"></el-input>
                    <!-- <el-button type="success" @click="checkPassword">{{ statusPassword ? '修改密码' : '修改完成' }}</el-button> -->
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
    name: "IsMe",
    data() {
        return {
            form: {
                userName: '',
                userId: '',
                password: '******'
            },
            statusName: true,
            statusPassword: true,
        }
    },
    methods: {
        onSubmit() {
            console.log('submit!');
        },
        checkName(e) {
            this.statusName = !this.statusName;
            if (this.statusName) {
                // 这里修改用户名称
                console.log(this.form.name);
            }
        },
        checkPassword() {
            this.statusPassword = !this.statusPassword;
            if (this.statusName) {
                // 这里修改用户密码
                console.log(this.form.password);
            }
        },

    },
    created() {
        let user = sessionStorage.getItem('user')
        let res = JSON.parse(user)
        Object.assign(this.form, res)
    }
}
</script>
<style scoped>
    /* .fromTable {
        width: 500px;
        margin: 0 auto;
    } */

.main {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: right;
}

.fromTable {
    width: 35%;
    height: 500px;
    padding: 30px;
    background-color: #fff;
    border-radius: 10px;
     margin-right: 5%;

}
</style>