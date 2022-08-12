<template>
    <div class="mining">
        <div class="title" id="lang_user_reffer">User Reffer</div>
        <div class="content_title">
            <span id="lang_address">Address</span>
            <span id="lang_profit">profit</span>
        </div>
        <div class="content" id="scontent">
            <div id="slist" class="list">
            </div>
            <div id="slist2"></div>
        </div>
    </div>
</template>
<script>
export default {

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

.mining .content {
    overflow: hidden;
    height: 53.33333333vw;
    margin-top: 4.8vw;
}
</style>