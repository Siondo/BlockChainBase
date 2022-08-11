<template>
    <div style="padding:0 3%">
        <div class="pool_data">
            <div id="lang_pool_data" class="title"> Pool data</div>
            <div class="list">
                <div class="item">
                    <div id="lang_total_output" class="name">Total output</div>
                    <div class="value blue">
                        <span id="output">8485173.378107</span> {{ this.defaultObj.chainType }}
                    </div>
                </div>
                <div class="item">
                    <div id="lang_valid_node" class="name">Valid node</div>
                    <div class="value blue">
                        <span id="node">589536</span>
                    </div>
                </div>
                <div class="item">
                    <div id="lang_participant" class="name">Participant</div>
                    <div class="value">
                        <span id="participant">9858855</span>
                    </div>
                </div>
                <div class="item">
                    <div id="lang_user_revenue" class="name">User Revenue</div>
                    <div class="value">
                        <span id="revenue">7894028570.31</span> {{ this.defaultObj.chainType }}
                    </div>
                </div>
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
    name: 'TabContainerMiningPoolTabContainerMiningPoolUserOutput',
    props: ['defaultObj'],
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
        }
    },
    computed: {
        ...mapState(['dataList'])
    },
    created() {
        let user = JSON.parse(sessionStorage.getItem('user'))
        this.user = user
        // this.finshdata()
    }
}
</script>
<style scoped>
.pool_data {
    margin-top: 8vw;
    padding: 2.13333333vw 4.26666667vw 5.86666667vw;
    box-shadow: 6px 12px 20px 0 rgb(0 0 0 / 5%);
    border-radius: 4vw;
    background: #fff;
}

.pool_data .title {
    position: relative;
    line-height: 6.66666667vw;
    font-size: 4.8vw;
    font-weight: 700;
    color: #282c3c;
}

.pool_data .title:after {
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
    background: linear-gradient(1turn, rgba(90, 71, 217, .09), rgba(22, 82, 240, .6));
}

.pool_data .list .item {
    display: flex;
    justify-content: space-between;
    margin-top: 4.26666667vw;
}

.pool_data .list .item .name {
    color: #a1a1b3;
}

.pool_data .list .item .blue {
    color: #4676f3;
}

.pool_data .list .item .value {
    font-family: DINMittelschrift;
    font-weight: 700;
}
</style>