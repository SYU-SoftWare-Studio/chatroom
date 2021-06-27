<template>
  <div class="wrap">
    <div class="container">
      <Label label="头像" />
      <div class="avatar-wrap">
        <div class="current-avatar-container" :style="color">
          <img v-if="value.avatar" class="avatar" :src="value.avatar">
          <p v-else class="text-avatar">{{ (value.name[0] || ' ').toUpperCase() }}</p>
        </div>
        <div class="select-avatar">
          <div class="avatar-preview-container">
            <img v-if="previewAvatar" class="avatar">
            <p v-else class="text-avatar-preview">{{ (value.name[0] || ' ').toUpperCase() }}</p>
          </div>
          <div class="avatar-button">
            <el-button type="primary">上传图片</el-button>
            <el-button>使用文字头像</el-button>
          </div>
        </div>
      </div>

      <div class="block" />

      <div class="half-wrap">
        <div>
          <Label label="昵称" />
          <Input v-model="value.name" limit="10" is-show-limit no-empty />
        </div>
        <div>
          <Label label="真实姓名" />
          <Input v-model="value.realName" limit="10" is-show-limit />
        </div>
      </div>

      <div class="block" />

      <div class="half-wrap">
        <div>
          <Label label="年级" />
          <Input v-model="value.grade" limit="10" />
        </div>
        <div>
          <Label label="学号" />
          <Input v-model="value.studentId" limit="8" is-show-limit />
        </div>
      </div>

      <div class="block" />

      <div class="online-status-wrap">
        <Label label="自定义在线状态" />
        <Input v-model="value.onlineStatus" limit="20" is-show-limit />
      </div>

      <div class="block" />

      <div class="online-status-wrap">
        <Label label="所在学院" />
        <Input v-model="value.college" limit="20" is-show-limit />
      </div>

      <div class="block" />

      <div class="online-status-wrap">
        <Label label="所在专业及班级" />
        <Input v-model="value.major" limit="20" is-show-limit />
      </div>
      <div class="block" />
    </div>
  </div>
</template>

<script>
import SYU from '../../../engine';
import Input from '../../components/Input.vue';
import Label from '../../components/Label.vue';

export default {
  name: 'User',
  components: {
    Input,
    Label,
  },
  data() {
    return {
      id: this.$route.params.id,
      value: {
        avatar: '',
        name: ' ',
      },
      previewAvatar: '',
      color: { backgroundColor: SYU.randomColor() },
    };
  },
  mounted() {
    this.value = SYU.getInfo(this.id, 'user');
    this.previewAvatar = this.value.avatar;
  },
};
</script>

<style lang="less" scoped>
.wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 0 20px;
  background-color: rgb(250, 250, 250);

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 500px;

    .avatar-wrap {
      display: flex;
      width: 100%;

      .current-avatar-container {
        width: 120px;
        height: 120px;
        color: #fff;
        font-size: 46px;
        background-color: #68d18b;
        border-radius: 5px;

        .text-avatar {
          width: 100%;
          line-height: 120px;
        }
      }

      .select-avatar {
        margin-left: 15px;

        .avatar-preview-container {
          width: 70px;
          height: 70px;
          margin-bottom: 10px;
          color: #fff;
          font-size: 26px;
          background-color: #68d18b;
          border-radius: 5px;

          .text-avatar-preview {
            width: 100%;
            line-height: 70px;
          }
        }
      }
    }

    .half-wrap {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 30px;
      width: 100%;
    }

    .online-status-wrap {
      width: 100%;
    }
  }

  .avatar {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .input {
    box-sizing: border-box;
    width: 100%;
    padding: 8px 10px;
    font-size: 14px;
    border: 1px solid #e4e7ed;
    border-radius: 5px;
    outline: none;
    transition: 0.4s ease-in-out;

    &:focus {
      border: 1px solid #faa;
    }
  }

  .block {
    width: 100%;
    height: 10px;
    margin: 10px 0;
  }
}
</style>
