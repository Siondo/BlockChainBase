<template>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick" :stretch='true' style="padding: 0 3%;">
        <el-tab-pane label="Withdraw" name="first">
            <div class="withdraw tab" style="display: block;">
                <div class="title" id="lang_withdraw2">Withdraw</div>
                <div class="content">
                    <div class="input_content">
                        <input type="number" placeholder="0.0" id="amount" class="input">
                        <span class="divider"></span>
                        <div class="usdt">
                            <img src="@/images/icon_usdt.d030a407.png">
                            <span>USDT</span>
                        </div>
                    </div>
                    <span class="all" id="lang_total_balance">Total balance</span>
                </div>
                <div class="button" id="ConfirmBtn">Confirm</div>
                <div class="tips" id="lang_tips">Your withdrawal will be sent to your USDT wallet
                    address within 24 hours in the future</div>
            </div>
            <div style="min-height: 5vw;"></div>
        </el-tab-pane>
        <el-tab-pane label="Record" name="second">
            <div data-v-11de778f="" class="withdraw tab" style="display: block;">
                <div class="title" id="lang_record3">Record</div>
                <el-tabs v-model="activeName2" type="card" @tab-click="handleClick2" :stretch='true'>
                    <el-tab-pane label="withdraw" name="first">
                        <div class="content" id="Record_content">1</div>
                    </el-tab-pane>
                    <el-tab-pane label="Interest" name="second">
                        <div class="content" id="Record_content">2</div>
                    </el-tab-pane>
                    <el-tab-pane label="Reward" name="third">
                        <div class="content" id="Record_content">3</div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </el-tab-pane>
    </el-tabs>
</template>
<script>
export default {
    name: 'Home_tab_container',
    components: {
    },
    data() {
        return {
            activeName: 'first',
            activeName2: 'first',
        };
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        },
        handleClick2(tab, event) {
            console.log(tab, event);
        },
    }
};
</script>
<style scoped>
.el-tabs__item {
    width: 48.8vw;
    line-height: 10.66666667vw !important;
    margin: 6.66666667vw auto 0;
    text-align: center;
    font-size: 4.26666667vw !important;
    font-weight: 700;
    color: #fff;
    border-radius: 2.4vw 2.4vw 0 0 !important;
}


.withdraw {
    padding: 4.26666667vw 4.26666667vw 5.86666667vw;
    border-radius: 0 0 4vw 4vw;
    background: #fff;
    box-shadow: 6px 12px 20px 0 rgb(0 0 0 / 5%);
}

.withdraw .title {
    position: relative;
    line-height: 6.66666667vw;
    font-size: 4.8vw;
    font-weight: 700;
    color: #282c3c;
}

.withdraw .title:after {
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

.withdraw .content {
    position: relative;
    margin-top: 3.2vw;
    padding: 4.26666667vw 4.26666667vw 5.6vw;
    border-radius: 4vw;
    border: 1px solid #ebedf3;
}

.withdraw .content .input_content {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.withdraw .content .input_content .input {
    width: 31.2vw;
    padding: 0;
    font-family: DINMittelschrift;
    font-size: 7.46666667vw;
    border: none;
    outline: none;
}

.withdraw .content .input_content .divider {
    width: 1px;
    height: 11.73333333vw;
    background: #ebedf3;
}

.withdraw .content .input_content .usdt {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30.93333333vw;
}

.withdraw .content .input_content .usdt img {
    width: 5.86666667vw;
    height: 5.86666667vw;
    margin-right: 3.2vw;
}

.withdraw .content .all {
    position: absolute;
    left: 4.26666667vw;
    bottom: 1.6vw;
    font-size: 3.2vw;
    color: #4676f3;
}

.withdraw .button {
    width: 48.8vw;
    line-height: 10.66666667vw;
    margin: 6.66666667vw auto 0;
    text-align: center;
    font-size: 4.26666667vw;
    font-weight: 700;
    color: #fff;
    border-radius: 1.33333333vw;
    background: #1652f0;
}

.withdraw .tips {
    margin-top: 5.33333333vw;
    padding-top: 3.2vw;
    font-size: 3.2vw;
    color: #a1a1b3;
    border-top: 1px solid rgba(235, 237, 243, .4);
}


/* 右 */
.record_ul {
    width: 100%;
    display: flex;
    margin-left: -43px;
}

.record_ul li {


    list-style: none;

    width: 30%;
    margin-left: 5px;
    line-height: 9.06666667vw;
    text-align: center;
    border-radius: 2.4vw 2.4vw 0 0;
    background: rgba(22, 82, 240, .06);
}

.record_ul li.active {

    color: #fff;
    background: #1652f0;
}
</style>