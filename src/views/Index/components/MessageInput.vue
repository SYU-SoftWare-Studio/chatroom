<template>
  <div class="message-input">
    <el-popover placement="top" width="327" trigger="click">
      <VEmojiPicker @select="selectEmoji" />
      <p slot="reference" class="emoji-picker-wrap">😃</p>
    </el-popover>
    <input v-model="value" class="input">
    <el-popover class="function-wrapper" width="100" placement="top" trigger="click">
      <div class="fuction-container">
        <el-icon class="el-icon-picture-outline" />
        <span class="desc">发送图片</span>
      </div>
      <el-icon slot="reference" class="el-icon-more-outline icon" />
    </el-popover>
  </div>
</template>

<script>
export default {
  name: 'Content',
  data() {
    return {
      value: '',
    };
  },
  methods: {
    selectEmoji(emoji) {
      this.value += emoji.data;
    },
  },
};
</script>

<style lang="less" scoped>
.message-input {
  position: absolute;
  right: 40px;
  bottom: 0;
  left: 40px;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 15px 40px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

  .emoji-picker-wrap {
    margin-right: 30px;
    font-size: 20px;
    cursor: pointer;
  }

  .input {
    flex: 1;
    padding: 10px 15px;
    background-color: rgb(247, 247, 247);
    border: 0;
    border-radius: 5px;
    outline: none;
  }

  .icon {
    margin-left: 30px;
    color: rgb(95, 170, 255);
    font-size: 20px;
    cursor: pointer;
    transition: 0.3s color ease-in-out;

    &:hover {
      color: #faa;
    }
  }
}

.fuction-container {
  width: 100%;
  text-align: center;
  cursor: pointer;
  transition: 0.3s color ease-in-out;

  .desc {
    display: inline-block;
    margin-left: 8px;
  }

  &:hover {
    color: #faa;
  }
}
</style>
