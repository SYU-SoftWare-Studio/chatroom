<template>
  <div v-if="value" class="silder-wrap" @click.self="handleClose">
    <div v-if="data.type === 'list'" class="slider slide-in">
      <Avatar id="2345" type="contact" clickable @click="getUserInfo" />
    </div>
    <div v-if="data.type === 'user'" class="slider slide-in">123123123</div>
    <div v-if="data.type === 'info'" class="slider slide-in">123123123</div>
    <div v-if="data.type === 'list' && isShow" :class="['data-display', style]">
      <div class="header">
        <span @click="handleHidden">
          <el-icon class="el-icon-arrow-left header-icon" />
        </span>
        <el-icon class="el-icon-user" />
        <p class="header-text">用户信息</p>
        <span @click="handleClose">
          <el-icon class="el-icon-close header-icon" />
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import Avatar from './Avatar.vue';

export default {
  name: 'Slider',
  components: {
    Avatar,
  },
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    // eslint-disable-next-line
    data: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      isShow: false,
      style: 'slide-out',
    };
  },
  watch: {
    value: {
      immediate: false,
      handler() {
        this.isShow = false;
        this.style = 'slide-out';
      },
    },
    data: {
      deep: true,
      handler() {
      },
    },
  },
  mounted() {},
  methods: {
    handleHidden() {
      this.style = 'slide-out';
    },
    handleClose() {
      this.$emit('input', !this.value);
    },
    getUserInfo() {
      this.style = 'slide-in';
      this.isShow = true;
    },
  },
};
</script>

<style lang="less" scoped>
@keyframes slide-in {
  0% {
    width: 0;
  }

  100% {
    width: 350px;
  }
}

@keyframes slide-out {
  0% {
    width: 350px;
  }

  100% {
    width: 0;
  }
}

.slide-out {
  width: 0;
  animation: slide-out 0.4s ease-out;
}

.slide-in {
  width: 350px;
  animation: slide-in 0.4s ease-out;
}

.silder-wrap {
  position: fixed;
  top: 80px;
  right: 0;
  bottom: 0;
  left: 280px;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.1);
  transition: 0.2s all ease-in-out;

  .slider,
  .data-display {
    position: fixed;
    top: 80px;
    right: 0;
    bottom: 0;
    z-index: 10;
    background-color: #fff;
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.05);
  }

  .data-display {
    .header {
      display: flex;
      align-items: center;
      width: 100%;
      height: 80px;
      color: #fff;
      font-size: 18px;
      text-align: left;
      background-color: #525252;

      .header-text {
        flex: 1;
        margin-left: 10px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      .header-icon {
        margin: 0 25px;
        cursor: pointer;
        transition: 0.3s ease-in-out;

        &:hover {
          color: #faa;
        }
      }
    }
  }
}

@media screen and (max-width: 800px) {
  .silder-wrap {
    left: 0;
  }
}
</style>
