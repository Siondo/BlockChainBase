<template>
    <div style="padding:0 3%">
        <div class="section_title">
            <div id="lang_help_center" class="title">Help center</div>
            <div id="lang_help_center_sub" class="sub_title"> Hope it helps you</div>
        </div>
        <!-- <div class="list" id="ditem"> -->
        <el-collapse v-model="activeNames" @change="handleChange" class="list" id="ditem">
            <el-collapse-item title="How do i need to join？" name="1" class="title item">
                <div class="content" id="content_1 content"> To participate in non-destructive and
                    non-guaranteed liquidity mining, you need to pay an {{this.defaultObj.chainType}} miner's fee to receive the voucher, and
                    an
                    {{this.defaultObj.chainType}} wallet address only needs to be claimed once. Automatically open mining permissions after
                    success
                </div>
            </el-collapse-item>
            <el-collapse-item title="How do i withdraw money？" name="2" class="title item">
                <div id="content_2 content" class="content">You can convert the coins produced daily into
                    USDT, and then initiate a withdrawal. The USDT withdrawal will be automatically sent to the wallet
                    address you added to the node, and other addresses are not supported.</div>
            </el-collapse-item>
            <el-collapse-item title="How to calculate income？" name="3" class="title item">
                <div id="content_3 content" class="content">The yield of 10USDT-500USDT is about 0.5%<br>The
                    yield of 500USDT-10000USDT is about 1.5%<br>The yield of 10000USDT-50000USDT is about 2%<br>The
                    yield of 50000USDT-100000USDT About 2.5%<br>The yield of 100000USDT-200000USDT is about 3%<br>The
                    yield of more than 200,000USDT is about 4.5%</div>
            </el-collapse-item>
            <!-- </div> -->
        </el-collapse>
    </div>
</template>
<script>
export default {
    name: 'Tab_container_MiningPool',
    data() {
        return {
            activeNames: ['1'],
            defaultObj:{}
        };
    },
    methods: {
        handleChange(val) {
            console.log(val);
        }
    },
    created(){
        let defaultObj=JSON.parse(sessionStorage.getItem('defaultObj'));
        console.log(defaultObj);
        this.defaultObj=defaultObj;
    }
}
</script>
<style scoped>
/deep/ .el-collapse-item__header{
    font-size: 4.8vw !important;
}
/deep/ .el-collapse-item__content{
    margin-top: 1.86666667vw;
    font-size: 2.46666667vw;
    color: #a1a1b3;
}
.section_title {
    margin: 8vw 0;
    text-align: center;
    font-weight: 700;
}

.section_title .title {
    font-size: 4.8vw !important;
}

.section_title .sub_title {
    font-size: 3.2vw !important;
    color: #a1a1b3;
}

.list>>>.item {
    margin-bottom: 2.13333333vw;
    padding: 3.46666667vw 4.26666667vw;
    border-radius: 2.13333333vw;
    background: #fff;
    box-shadow: 0 4px 40px 1px rgb(0 0 0 / 3%);
}

.list>>>.item>>>.title {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 4.8vw !important;
    font-weight: 700 !important;
    color: #081724;
}

.list>>>.item .title .icon {
    width: 3.2vw;
    height: 3.2vw;
    background: #1652f0;
    transform: rotate(180deg);
    mask-image: url(@/images/icon_arrow_up.3291555f.svg);
    -webkit-mask-image: url(@/images/icon_arrow_up.3291555f.svg);
    -moz-mask-image: url(@/images/icon_arrow_up.3291555f.svg);
    mask-repeat: no-repeat;
    -webkit-mask-repeat: no-repeat;
    -moz-mask-repeat: no-repeat;
    mask-size: contain;
    -webkit-mask-size: contain;
    -moz-mask-size: contain;
}

#content {
    display: none;
    margin-top: 1.86666667vw;
    font-size: 3.46666667vw;
    color: #a1a1b3;
}

.el-collapse-item__header {
    font-size: 4.8vw !important;
}
</style>