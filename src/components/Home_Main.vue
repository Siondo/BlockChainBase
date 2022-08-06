<template>
    <div class="main">
        <div class="meShore" ref="mydiv">
             <!-- 图表节点 -->
        </div>
    </div>
</template>
<script>

export default {
    name: "IsMain",
    mounted() {
        this.setCharts();
    },
    methods: {
        setCharts() {
            let myChart = this.$echarts.init(this.$refs.mydiv);
            let base = +new Date(1988, 9, 3);
            let oneDay = 24 * 3600 * 1000;
            let data = [[base, Math.random() * 300]];
            for (let i = 1; i < 20000; i++) {
                let now = new Date((base += oneDay));
                data.push([+now, Math.round((Math.random() - 0.5) * 20 + data[i - 1][1])]);
            }
            let option = {
                tooltip: {
                    trigger: 'axis',
                    position: function (pt) {
                        return [pt[0], '10%'];
                    }
                },
                title: {
                    left: 'center',
                    text: 'Large Ara Chart'
                },
                toolbox: {
                    feature: {
                        dataZoom: {
                            yAxisIndex: 'none'
                        },
                        restore: {},
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'time',
                    boundaryGap: false
                },
                yAxis: {
                    type: 'value',
                    boundaryGap: [0, '100%']
                },
                dataZoom: [
                    {
                        type: 'inside',
                        start: 0,
                        end: 20
                    },
                    {
                        start: 0,
                        end: 20
                    }
                ],
                series: [
                    {
                        name: 'Fake Data',
                        type: 'line',
                        smooth: true,
                        symbol: 'none',
                        areaStyle: {},
                        data: data
                    }
                ]
            }
            myChart.setOption(option);
        }

    },
}
</script>
<style scoped>
.main {
    flex-grow: 1;
    /* background-image: url(../images/14-登录.jpg);
    background-repeat: no-repeat;
    background-size: 100% 100%; */
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: right;
}

.meShore {
    width: 35%;
    height: 600px;
    padding: 30px;
    background-color: #fff;
    border-radius: 10px;
    margin-right: 5%;
}
</style>