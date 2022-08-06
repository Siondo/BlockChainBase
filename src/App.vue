<template>
  <div id="app">
    <!-- 一级路由渲染出口 -->
    <router-view v-show="!isLoading"></router-view>
    <Loading v-show="isLoading"></Loading>
  </div>
</template>


<script>
import { mapState } from "vuex";

import Loading from "./components/Loding.vue";
export default {
  computed: {
    ...mapState(["isLoading"])
  },
  components: {
    Loading
  },
}
</script>
<style>
* {
  margin: 0;
  padding: 0;
  list-style: none;
  text-decoration: none;
}

#app {
  /* height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center; */
}
</style>
