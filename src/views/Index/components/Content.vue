<template>
  <div class="content-wrap">
    <div class="content" />
  </div>
</template>

<script>
export default {
  name: 'Content',

};
</script>

<style lang="less" scoped>
.content-wrap {
  flex: 1;
  width: 100%;
  overflow-y: scroll;

  .content {
    margin-bottom: 100px;
  }
}
</style>
