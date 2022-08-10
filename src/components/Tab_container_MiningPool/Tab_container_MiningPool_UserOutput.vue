<template>
    <div style="padding:0 3%">
        <div class="mining">
            <div id="lang_user_output" class="title">User Output</div>
            <div class="content_title">
                <span id="lang_address">Address</span>
                <span id="lang_quantity">Quantity</span>
            </div>
            <div class="content" id="scontent">
                <div id="slist" class="list">
                    <div class="item" v-for="item in this.dataList" :key="item.id">
                        <div class="name">
                            {{ item.tempAddress }}
                        </div>
                        <div class="value blue">
                            {{ item.accountBalance }} ETH
                        </div>
                    </div>
                </div>
                <div id="slist2"></div>
            </div>
        </div>
    </div>
</template>
<script>
// 引用状态机
import { createNamespacedHelpers } from "vuex";
// 获取状态机内部封装的方法
const { mapState, mapMutations, mapActions } = createNamespacedHelpers("Home");
export default {
    name: 'TabContainerMiningPoolTabContainerMiningPoolPooldata',
    data() {
        return {
            user: {}
        }
    },
    methods: {
        ...mapActions(['FindLowerUser']),
        async finshdata() {
            const { id } = this.user
            await this.FindLowerUser(id)
            console.log(this.dataList);
        }
    },
    computed: {
        ...mapState(['dataList'])
    },
    created() {
        let user = JSON.parse(sessionStorage.getItem('user'))
        this.user = user
        this.finshdata()
    }
}
</script>
<style scoped>
.mining {
    margin-top: 8vw;
    padding: 2.13333333vw 4.26666667vw 5.86666667vw;
    box-shadow: 6px 12px 20px 0 rgb(0 0 0 / 5%);
    border-radius: 4vw;
    background: #fff;
}

.mining .title {
    position: relative;
    line-height: 6.66666667vw;
    font-size: 4.8vw;
    font-weight: 700;
    color: #282c3c;
}

.mining .title:after {
    content: "";
    position: absolute;
    top: 0;
    left: -4.26666667vw;
    bottom: 0;
    display: block;
    margin: auto;
    width: 1.06666667vw;
    height: 5.33333333vw;
    border-radius: 0.53333333vw;
    background: linear-gradient(1turn, rgba(248, 164, 164, .2), #e1506a);
}

.mining .content_title {
    margin-top: 4.26666667vw;
    display: flex;
    justify-content: space-between;
    line-height: 5.33333333vw;
    color: #a1a1b3;
}

.mining .content_title {
    margin-top: 4.26666667vw;
    display: flex;
    justify-content: space-between;
    line-height: 5.33333333vw;
    color: #a1a1b3;
}

.mining .content {
    overflow: hidden;
    margin-top: 4.8vw;
}

.mining .list .item {
    display: flex;
    justify-content: space-between;
    line-height: 4.53333333vw;
    margin-bottom: 3.2vw;
    font-size: 3.2vw;
}

.mining .list .item .name {
    color: #4676f3;
}

.mining .list .item .value {
    font-family: DINMittelschrift;
    font-weight: 700;
    color: #060606;
}
</style>