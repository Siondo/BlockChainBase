<template>
    <div class="pool_data" >
        <div class="title" id="lang_team_data">Team data</div>
        <div class="list">
            <div class="item">
                <div class="name" id="lang_team_total_output">Team output</div>
                <div class="value blue">
                    <span id="team_output">434841.659933</span> USDT
                </div>
            </div>

            <div class="item">
                <div class="name" id="lang_team_user_revenue">User Count</div>
                <div class="value">
                    <span id="team_revenue">2975992400.24</span> USDT
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {

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