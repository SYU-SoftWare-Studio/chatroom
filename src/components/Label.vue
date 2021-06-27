<template>
  <div class="label-wrap">{{ label }}</div>
</template>

<script>
export default {
  name: 'Label',
  props: {
    label: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="less" scoped>
.label-wrap {
  width: 100%;
  margin-bottom: 8px;
  font-size: 14px;
  text-align: left;
}
</style>
