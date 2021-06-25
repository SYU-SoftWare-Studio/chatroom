<template>
  <div :class="['avatar-wrap', type]">
    <div class="avatar" :style="color" @click="handleClick">
      <img v-if="value.avatar" :src="value.avatar">
      <p v-else>{{ value.name[0].toUpperCase() }}</p>
    </div>
    <div class="status-wrap">
      <div class="name">{{ value.name }}</div>
      <div class="status-container">
        <div :class="['status-icon', value.isOnline ? 'online' : 'outline']" />
        <span v-if="isShowText" class="status">
          <span v-if="value.isOnline">{{ value.onlineStatus || 'Online' }}</span>
          <span v-else>Offline</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import SYU from '../../engine/index';

export default {
  name: 'Avatar',
  props: {
    id: {
      type: String,
      required: true,
    },
    showStatusText: {
      type: Boolean,
      default: false,
    },
    clickable: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'contact',
    },
    classify: {
      type: String,
      default: 'user',
    },
    isUser: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      color: { backgroundColor: SYU.randomColor(), cursor: this.clickable ? 'pointer' : 'default' },
      value: {
        avatar: '',
        name: '',
      },
    };
  },
  computed: {
    isShowText() {
      return this.type !== 'contact' && this.showStatusText;
    },
  },
  watch: {
    id: {
      immediate: true,
      handler() {
        this.value = SYU.getInfo(this.id, this.classify);
      },
    },
  },
  methods: {
    handleClick() {
      if (!this.clickable) {
        return;
      }
      if (this.isUser) {
        this.$router.push({ path: `/user/${this.id}` });
        return;
      }
      this.$emit('click', this.id);
    },
  },
};
</script>

<style lang="less" scoped>
.avatar-wrap {
  display: flex;
  align-items: center;
  height: 100%;

  .avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    overflow: hidden;
    color: #fff;
    font-size: 22px;
    background-color: #68d18b;
    border-radius: 5px;
    user-select: none;
  }

  .status-wrap {
    .status-container {
      display: flex;
      align-items: center;
      margin-top: 2px;
    }

    .status-icon {
      display: inline-block;
      width: 8px;
      height: 8px;
      margin-right: 5px;
      margin-left: 15px;
      border-radius: 50%;
    }

    .online {
      background-color: #68d18b;
    }

    .outline {
      background-color: #808080;
    }

    .status {
      font-size: 14px;
      letter-spacing: 0;
    }
  }

  .name {
    margin-left: 15px;
    font-weight: lighter;
    font-size: 18px;
  }
}

.contact {
  color: #fff;

  .status-wrap {
    display: flex;
    flex-direction: row-reverse;

    .name {
      margin-left: 8px;
      font-size: 16px;
    }

  }
}

.user {
  color: #fff;

  .avatar {
    width: 70px;
    height: 70px;
    font-size: 28px;
  }

  .status-wrap {
    .status {
      font-size: 14px;
    }

    .status-container {
      margin-top: 8px;
    }
  }

  .name {
    margin-left: 15px;
    font-weight: lighter;
    font-size: 28px;
  }
}

.search {
  color: #303133;

  .avatar {
    width: 40px;
    height: 40px;
    font-size: 14px;
  }

  .status-wrap {
    display: flex;
    flex-direction: row-reverse;
  }
}
// .avatar-wrap {
//   display: flex;
//   align-items: center;
//   height: 100%;

//   .avatar {
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     width: 40px;
//     height: 40px;
//     overflow: hidden;
//     color: #fff;
//     font-size: 22px;
//     background-color: #68d18b;
//     border-radius: 5px;
//     user-select: none;
//   }

//   .user {
//     width: 70px;
//     height: 70px;
//     font-size: 30px;
//   }

//   .bar {
//     flex-direction: column-reverse;
//   }

//   .status-wrap {
//     display: flex;

//     .status-icon {
//       display: inline-block;
//       width: 8px;
//       height: 8px;
//       margin-right: 5px;
//       margin-left: 15px;
//       background-color: #68d18b;
//       border-radius: 50%;
//     }

//     .status {
//       font-size: 14px;
//     }
//   }

//   .name {
//     margin-left: 15px;
//     font-weight: lighter;
//     font-size: 18px;
//   }
// }
</style>
