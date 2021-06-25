<template>
  <button class="ss" @click="test">login</button>
</template>

<script>
export default {
  name: 'Login',
  methods: {
    test() {
      this.$router.push({ name: 'Index' });
    },
  },
};
</script>

<style lang="less" scoped>
.ss {
  height: 200px;
}
</style>
