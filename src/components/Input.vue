<template>
  <div class="input-wrap">
    <input
      ref="input"
      :value="value"
      class="input"
      :maxlength="maxLen"
      @input="handleInput"
    >
    <span v-if="showLimit" class="limit center">{{ curentLen }}/{{ maxLen }}</span>
    <span v-if="!curentLen && noEmpty" class="empty center">该字段不能为空</span>
  </div>
</template>

<script>
export default {
  name: 'Input',
  props: {
    // eslint-disable-next-line
    value: {
      type: [String, Number],
      require: true,
    },
    // eslint-disable-next-line
    limit: {
      type: String,
      require: false,
    },
    isShowLimit: {
      type: Boolean,
      default: false,
    },
    noEmpty: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    maxLen() {
      return parseInt(this.limit, 10);
    },
    showLimit() {
      return Boolean(this.maxLen) && this.isShowLimit;
    },
    curentLen() {
      return (this.value || '').length;
    },
  },
  methods: {
    handleInput() {
      const data = this.$refs.input.value;
      this.$emit('input', data);
    },
  },
};
</script>

<style lang="less" scoped>
.input-wrap {
  position: relative;

  .input {
    box-sizing: border-box;
    width: 100%;
    padding: 8px 18px 8px 10px;
    font-size: 14px;
    border: 1px solid #e4e7ed;
    border-radius: 5px;
    outline: none;
    transition: 0.4s ease-in-out;

    &:focus {
      border: 1px solid #faa;
    }

  }

  .limit {
    position: absolute;
    right: 10px;
    color: #909399;
    font-size: 12px;
  }

  .center {
    top: 50%;
    transform: translateY(-50%);
  }

  .empty {
    position: absolute;
    left: 10px;
    color: rgb(255, 122, 122);
    font-size: 12px;
  }
}
</style>
