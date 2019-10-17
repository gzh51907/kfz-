<template>
  <div id="app">
      <router-view />
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      // menus: [
      //   {
      //     name: "home",
      //     path: "/home",
      //     text: "首页",
      //     icon: "el-icon-house"
      //   },
      //   {
      //     name: "goods",
      //     path: "/goods",
      //     text: "书店",
      //     icon: "el-icon-notebook-2"
      //   }
      // ]
    };
  },
  components: {}
};
</script>

<style >
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
html,body{
  width: 100%;height: 100%;
}
a {
  text-decoration: none;
}
#app{width:100%;height:100%;background-repeat: no-repeat;background-size:100% 100%;}

</style>

