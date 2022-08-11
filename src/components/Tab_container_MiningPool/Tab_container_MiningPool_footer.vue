<template>
    <div style="padding:0 3%;margin-bottom: 3%;">
        <div class="section_title">
            <div id="lang_audit_report" class="title"> Audit report</div>
            <div id="lang_secure" class="sub_title">We have a secure audit report</div>
        </div>
        <div class="list">
            <div class="item">
                <img src="@/images/partner1.086ac37a.png">
            </div>
            <div class="item">
                <img src="@/images/partner2.8ca8e6bf.png">
            </div>
            <div class="item">
                <img src="@/images/partner3.080de4b3.png">
            </div>
        </div>
        <a href="https://ethereum.org" class="eth-website" id="eth_website" style="color:#000;text-decoration: none;">{{
                this.defaultObj.chainType
        }}-COINBASEMART
            website</a>
        <div class="section_title">
            <div id="lang_partner" class="title">Partner</div>
            <div id="lang_business" class="sub_title">our business partner</div>
        </div>
        <div class="list">
            <div class="item">
                <img src="@/images/partner4.93483f09.png">
            </div>
            <div class="item">
                <img src="@/images/partner5.f6b7dded.png">
            </div>
            <div class="item">
                <img src="@/images/partner6.5443829a.png">
            </div>
            <div class="item">
                <img src="@/images/partner7.b40be6ca.png">
            </div>
            <div class="item">
                <img src="@/images/partner8.f374cda8.png">
            </div>
            <div class="item">
                <img src="@/images/partner9.c2dde12b.png">
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "Tab_footer",
    props: ['defaultObj'],
    data() {
        return {
            url: ''
        }
    },
    created() {
        console.log(this.defaultObj.chainType);
        switch (this.defaultObj.chainType) {
            case 'BSC':
                this.url = 'https://bscscan.com/'
                break;
            case 'ETH':
                this.url = 'https://ethereum.org'
                break;
            case 'TRC':
                this.url = 'https://tronscan.org'
                break;
            default:
                this.url = 'https://ethereum.org'
                break;
        }
    }
}
</script>
<style scoped>
.section_title {
    margin: 8vw 0;
    text-align: center;
    font-weight: 700;
}

.section_title .title {
    font-size: 4.8vw;
}

.section_title .sub_title {
    font-size: 3.2vw;
    color: #a1a1b3;
}

.list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: -5.33333333vw;
}

.list .item {
    width: 26.66666667vw;
    height: 9.6vw;
    margin-top: 5.33333333vw;
    border-radius: 1.33333333vw;
    background: #d8d8d8;
}

.list .item img {
    width: 100%;
    height: 100%;
}

.eth-website {
    display: block;
    line-height: 10.66666667vw;
    margin-top: 4vw;
    text-align: center;
    text-decoration: none;
    font-weight: 700;
    color: inherit;
    border-radius: 2.13333333vw;
    background: #ececec url(@/images/icon_eth.f763823b.png) no-repeat 3.666667vw/4.8vw;
}

a {
    text-decoration: none;

}

a:-webkit-any-link {
    color: -webkit-link;
    cursor: pointer;
    text-decoration: underline;
}

.section_title .title {
    font-size: 4.8vw;
}

.section_title .sub_title {
    font-size: 3.2vw;
    color: #a1a1b3;
}
</style>