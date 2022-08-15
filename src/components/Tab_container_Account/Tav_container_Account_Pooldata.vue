<template>
    <div style="padding: 0 3%;">
        <div class="pool_data">
            <div id="lang_my_account" class="title">My account</div>
            <div class="list">
                <div class="item">
                    <div id="lang_total_output" class="name"> Total output</div>
                    <div class="value">
                        <span class="total"></span> {{ this.defaultObj.chainType }}
                    </div>
                </div>
                <div class="item">
                    <div id="lang_wallet_balance" class="name">Wallet balance</div>
                    <div class="value">
                        <span id="wallet"></span> USDT
                    </div>
                </div>
                <div class="item">
                    <div id="lang_withdrawable" class="name">Withdrawable</div>
                    <div class="value">
                        <span class="total"></span> USDT
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Home_tab_container',
    components: {
    },
    data() {
        return {
            defaultObj:{}
        };
    },
    methods: {

    },
    created(){
        let defaultObj=JSON.parse(sessionStorage.getItem('defaultObj'))
        this.defaultObj=defaultObj;
    }
};
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

.pool_data .list .item .value {
    font-family: DINMittelschrift;
    font-weight: 700;
}

.pool_data .list .item .value {
    font-family: DINMittelschrift;
    font-weight: 700;
}
</style>