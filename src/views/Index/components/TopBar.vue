<template>
  <div class="top-bar-wrap">
    <Star v-model="isStar" class="star" />
    <Avatar
      :id="room.id"
      class="avatar"
      type="bar"
      :classify="room.classify"
      show-status-text
    />
    <div class="func-icon-wrap">
      <el-tooltip :content="room.classify === 'user' ? '成员信息' : '个人信息'" placement="bottom">
        <span
          :class="(currentSelect === 'user' || currentSelect === 'list' )? 'select' : ''"
          @click="handleClick(room.classify === 'user' ? 'user' : 'list')"
        >
          <el-icon :class="['el-icon-user','func-icon']" />
        </span>
      </el-tooltip>
      <el-tooltip v-if="room.classify === 'chatroom'" content="聊天室信息" placement="bottom">
        <span :class="currentSelect === 'info' ? 'select' : ''" @click="handleClick('info')">
          <el-icon class="el-icon-warning-outline func-icon" />
        </span>
      </el-tooltip>
      <el-tooltip content="更多" placement="bottom">
        <el-icon class="el-icon-more-outline func-icon" />
      </el-tooltip>
    </div>
  </div>
</template>

<script>
import Avatar from '@/components/Avatar.vue';
import Star from '@/components/Star.vue';

export default {
  name: 'TopBar',
  components: {
    Avatar,
    Star,
  },
  props: {
    isSliderShow: {
      type: Boolean,
      require: true,
    },
    isInfo: {
      type: Boolean,
    },
    // eslint-disable-next-line
    room: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      value: '',
      isStar: false,
      sliderClassify: '',
    };
  },
  computed: {
    currentSelect() {
      if (!this.isSliderShow) {
        return '';
      }
      return this.sliderClassify;
    },
  },
  methods: {
    handleClick(type) {
      this.sliderClassify = type;
      this.$emit('member', type);
    },
  },
};
</script>

<style lang="less" scoped>
.top-bar-wrap {
  position: relative;
  top: 0;
  display: flex;
  align-items: center;
  width: 100%;
  height: 80px;
  text-align: left;
  background-color: #fff;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.05);

  .star {
    margin-left: 30px;
    color: #5faaff;
    cursor: pointer;
    transition: 0.2s ease-in-out;

    &:hover {
      color: #faa;
    }
  }

  .avatar {
    margin-left: 30px;
  }

  .func-icon-wrap {
    position: absolute;
    right: 50px;
    font-size: 22px;

    .select {
      color: #faa;
    }

    .func-icon {
      margin: 0 14px;
      cursor: pointer;
      transition: 0.3s ease-in-out;

      &:hover {
        color: #faa;
      }
    }
  }
}
</style>
