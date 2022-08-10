<template>
    <div class="main">
        <div class="fromTable">
            <h1 style="text-align: center">个人中心</h1>
            <el-form ref="form" :model="form" label-width="15%">
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
        <div class="bgi"></div>
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
* {
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif;
    font-size: 3.73333333vw;
    -webkit-font-smoothing: antialiased;
}

.main {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
  background-color: #1652F0;
}

.bgi {
    width: 40%;
    height: 70%;
    /* background-color: #fff; */
    background-image: url(../images/banner_home2.483edd9e.png);
    background-repeat: no-repeat;
    background-size: contain;
}

.fromTable {
    width: 40%;
    height: 60%;
    border-radius: 10px;
    background-color: #fff;
}
</style>