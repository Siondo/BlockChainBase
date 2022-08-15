<template>
    <div class="main">
        <div class="meShore">
            <h3>我的链接</h3>
            <div style="min-height:20px"></div>
            <el-input v-model="input" id="copyCode" placeholder="请输入对应链接">
                <el-button slot="append" @click="copy">复制</el-button>
            </el-input>
            <p>邀請好友參與流動性挖礦，分享更多收益。</p>
        </div>
        <div class="bgi"></div>
    </div>
</template>
<script>
export default {
    name: "IsShore",
    data() {
        return {
            input: '',
            // 初始化域名或者ip
            Ip: '',
        }
    },
    methods: {
        getRandomString(len) {
            let _charStr = 'abacdefghjklmnopqrstuvwxyzABCDEFGHJKLMNOPQRSTUVWXYZ0123456789',
                min = 0,
                max = _charStr.length - 1,
                _str = '';                    //定义随机字符串 变量
            //判断是否指定长度，否则默认长度为15
            len = len || 15;
            //循环生成字符串
            for (var i = 0, index; i < len; i++) {
                index = (function (randomIndexFunc, i) {
                    return randomIndexFunc(min, max, i, randomIndexFunc);
                })(function (min, max, i, _self) {
                    let indexTemp = Math.floor(Math.random() * (max - min + 1) + min),
                        numStart = _charStr.length - 10;
                    if (i == 0 && indexTemp >= numStart) {
                        indexTemp = _self(min, max, i, _self);
                    }
                    return indexTemp;
                }, i);
                _str += _charStr[index];
            }
            return _str;
        },
        init() {
            let user = JSON.parse(sessionStorage.getItem('user'))
            // 获取访问的ip地址或者域名地址
            this.Ip = window.location.host
            // 获取随机字符串
            let str = this.getRandomString(10)
            let re = ''
            re += `userParentId=${user.id}`
            re += '?'
            // re += `${row.BlockChain}=${row.bscMainnetAddress}`
            // re += '?'
            // 设置访问路径
            this.URl = '/home/main' + '?data=' + re + str,
                // 'https://'+this.Ip+ 
                // 设置可视化访问路径
                this.URl2 = this.Ip + '/home/main' + '?data=' + re + str
            this.input = this.URl2
        },
        // 复制
        copy() {
            var copycode = document.getElementById("copyCode");
            console.log(copycode.value);
            copycode.select(); // 选择对象
            document.execCommand("Copy"); // 执行浏览器复制命令
            this.$message({
                message: '复制成功',
                type: 'success'
            });
            // copycode.remove()
        }
    },
    created() {
        let user = JSON.parse(sessionStorage.getItem('user'))
        if (user == '3') {
            this.init();
        }
        //如果有数据
        else if (this.$route.query.data) {
            this.input=window.location.href
        }
    }
}
</script>
<style scoped>
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

.meShore {
    width: 40%;
    height: 60%;
    border-radius: 10px;
    background-color: #fff;
}

.bgi {
    width: 40%;
    height: 70%;
    /* background-color: #fff; */
    background-image: url(../images/banner_home2.483edd9e.png);
    background-repeat: no-repeat;
    background-size: contain;
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