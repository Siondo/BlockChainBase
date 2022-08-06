<template>
    <div class="main">
        <div class="meShore">
            <h3>我的链接</h3>
            <div style="min-height:20px"></div>
            <el-input v-model="input" placeholder="请输入对应链接">
                <el-button slot="append">复制</el-button>
            </el-input>
            <p>邀請好友參與流動性挖礦，分享更多收益。</p>
        </div>
    </div>
</template>
<script>
export default {
    name: "IsShore",
    data() {
        return {
            input: ''
        }
    }
}
</script>
<style scoped>
.main {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: right;
}

.meShore {
    width: 35%;
    height: 400px;
    padding: 30px;
    background-color: #fff;
    border-radius: 10px;
    margin-right: 5%;
}

.meShore p {
    margin-top: 30px;
}

.lis {
    display: flex;
    justify-content: space-evenly;
}

.lis .item {
    width: 70px;
    height: 90px;
}

.lis .item img {
    width: 100%;
}
</style>