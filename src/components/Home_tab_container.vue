<template>
    <div class="tab_container">
        <el-tabs v-model="activeName" @tab-click="handleClick" :stretch='true' style="font-size: 4.8vw;">
            <el-tab-pane label="Mining Pool" name="MiningPool">
                <TabContainerMiningPoolTabContainerMiningPool />
            </el-tab-pane>
            <el-tab-pane label="Account" name="Account">
                <TabContainerAccountTabContainerAccount />
            </el-tab-pane>
            <el-tab-pane label="Team" name="Team">
                <TabContainerTeamTabContainerTeam />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
export default {
    name: 'Home_tab_container',
    components: {
    },
    data() {
        return {
            activeName: 'MiningPool'
        };
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        }
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
    color: #000;
    border-radius: 2.4vw 2.4vw 0 0 !important;
}
</style>>
