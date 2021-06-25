<template>
  <div :class="['star-wrap', value ? 'on' : 'off']" @click="handleStar">
    <el-icon :class="`el-icon-star-${value ? 'on' : 'off'}`" />
  </div>
</template>

<script>
export default {
  name: 'Slider',
  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    handleStar() {
      const data = !this.value;
      this.$emit('input', data);
    },
  },
};
</script>

<style lang="less" scoped>
.star-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
}

.on {
  font-size: 30px;
}

.off {
  font-size: 26px;
}
</style>
