<template>
    <div class="main">
        <div class="meShore">
            <div class="btn-title">Click minering</div>
            <div class="sub-title">Join a node to start mining</div>
            <div class="meShore-Btn">Join Now</div>
        </div>
        <div class="bgi"></div>
    </div>
</template>
<script>

export default {
    name: "IsMain",
    mounted() {
    },
    methods: {


    },
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
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 50%);
}
</style>