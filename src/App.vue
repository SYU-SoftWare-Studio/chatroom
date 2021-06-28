<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
.fade-enter-active,
.fade-leave-active {
  opacity: 1;
  transition: 0.2s ease-out;
}

.fade-enter,
.fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

* {
  box-sizing: border-box;
  margin: 0;
}

#app {
  width: 100vw;
  height: 100vh;
  color: #303133;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
