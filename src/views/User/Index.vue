<template>
  <div class="wrap">
    <div class="container">
      <div class="block" />

      <Label label="头像" />
      <div class="avatar-wrap">
        <div class="current-avatar-container" :style="color">
          <img v-if="value.avatar" class="avatar" :src="value.avatar">
          <p v-else class="text-avatar">{{ (value.name[0] || ' ').toUpperCase() }}</p>
        </div>
        <div class="select-avatar">
          <div class="avatar-preview-container">
            <img v-if="previewAvatar" class="avatar" :src="previewAvatar">
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
        <Input v-model="value.onlineStatus" limit="10" is-show-limit />
      </div>

      <div class="block" />

      <div class="online-status-wrap">
        <Label label="所在学院" />
        <Input v-model="value.collage" limit="10" is-show-limit />
      </div>

      <div class="block" />

      <div class="online-status-wrap">
        <Label label="所在专业及班级" />
        <Input v-model="value.major" limit="10" is-show-limit />
      </div>
      <div class="block" />

      <div v-if="value.role === 'Administrator'" class="online-status-wrap">
        <Label label="邀请码" />
        <div class="triple-wrap">
          <div class="invitation-code">
            <span style="cursor: pointer;" @click="onCodeCopy">
              {{ haveCode ? invitation.code : invitation.encryp }}
            </span>
          </div>
          <div class="half-wrap">
            <el-button type="primary" class="show-code" @click="showCodeBefore">显示邀请码</el-button>
            <el-button type="success" class="regenerate" @click="onRegenerateBefore">重新生成</el-button>
          </div>
        </div>
      </div>

      <div class="block" />

      <div class="half-wrap" style="gap: 15px;">
        <el-button type="primary" @click="onSave">保存修改</el-button>
        <el-button type="danger" style="margin-left: 0;" @click="onCancel">取消修改</el-button>
      </div>
      <div class="block" />
    </div>
    <el-dialog
      title="身份验证"
      :visible.sync="centerDialogVisible"
      width="30%"
    >
      <Input v-model="invitation.password" navi-type="password" @enter="enterPassword" />
    </el-dialog>
  </div>
</template>

<script>
import Vue from 'vue';
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
      invitation: {
        password: '',
        encryp: '******',
        code: '',
      },
      haveCode: false,
      centerDialogVisible: false,
      option: '',
    };
  },
  async mounted() {
    if (!Vue.prototype.$isLogin) {
      this.$message.error('身份失效，请勿刷新此页面');
      this.$router.replace({ name: 'Index' });
      return;
    }
    this.value = await SYU.fetchUserInfo({ _id: this.id });
    this.previewAvatar = this.value.avatar;
  },
  methods: {
    onCodeCopy() {
      if (this.haveCode) {
        this.$copyText(this.invitation.code).then(() => {
          this.$message.success('邀请码已复制');
        });
      }
    },
    showCodeBefore() {
      this.option = 'show';
      this.centerDialogVisible = true;
    },
    onRegenerateBefore() {
      this.option = 'regenerate';
      this.centerDialogVisible = true;
    },

    enterPassword() {
      this.centerDialogVisible = false;
      if (this.option === 'show') {
        this.showCode();
      }
      if (this.option === 'regenerate') {
        this.onRegenerate();
      }
    },

    async showCode() {
      clearTimeout(this.timmer);
      const params = {
        _id: this.id,
        password: this.$md5(this.invitation.password),
      };
      const code = await SYU.fetchInvitationCode(params);
      this.haveCode = true;
      this.invitation.code = code;
      this.invitation.password = '';
      this.timmer = this.timmer();
      this.$message.success('已重新生成邀请码');
    },
    async onRegenerate() {
      clearTimeout(this.timmer);
      const params = {
        _id: this.id,
        password: this.$md5(this.invitation.password),
      };
      const newCode = await SYU.regenerateInvitationCode(params);
      this.haveCode = true;
      this.invitation.code = newCode;
      this.invitation.password = '';
      this.timmer = this.timmer();
    },
    timmer() {
      return setTimeout(() => {
        this.haveCode = false;
        this.invitation.code = 'code';
      }, 10000);
    },
    async onSave() {
      const params = this.value;
      params.avatar = this.previewAvatar;
      params._id = this.id;
      params.token = this.$cookies.get('chatroomToken').token;
      const check = await SYU.saveUserProfile(this, params);
      if (check) {
        this.$router.replace({ name: 'Index' });
      }
    },

    onCancel() {
      this.$router.replace({ name: 'Index' });
    },
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
  min-height: 100%;
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

    .triple-wrap {
      display: flex;

      .invitation-code {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 200px;
        height: 40px;
        font-size: 22px;
        background-color: #fff;
        border: 1px solid #e4e7ed;
        border-radius: 5px;
      }

      .half-wrap {
        flex: 1;
        gap: 10px;
        margin-left: 15px;

        .show-code,
        .regenerate {
          width: 100%;
          margin-left: 0;
        }
      }
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
