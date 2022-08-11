<template>
    <div class="tab_container">
        <el-tabs v-model="activeName" @tab-click="handleClick" :stretch='true' style="font-size: 4.8vw;">
            <el-tab-pane label="Mining Pool" name="MiningPool">
                <TabContainerMiningPoolTabContainerMiningPool />
            </el-tab-pane>
            <el-tab-pane label="Account" name="Account">
                <TabContainerAccountTabContainerAccount />
            </el-tab-pane>
            <el-tab-pane label="Team" name="Team">Team</el-tab-pane>
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
</style>