<template>
  <div class="wrap">
    <div class="login-container">
      <div>
        <Label label="账户" />
        <Input v-model="value.account" class="account" />
        <div class="blank" />
      </div>

      <div>
        <Label label="密码" />
        <Input v-model="value.password" class="password" navi-type="password" @enter="handleClick" />
        <div class="blank" />
      </div>

      <div v-if="isRegist">
        <Label label="确认密码" />
        <Input v-model="checkPassword" :check-value="value.password" navi-type="password" check-val />
        <div class="blank" />
      </div>

      <div v-if="isRegist">
        <Label label="用户名" />
        <Input v-model="value.name" />
        <div class="blank" />
      </div>

      <div v-if="isRegist">
        <Label label="邀请码" />
        <Input v-model="value.code" />
        <div class="blank" />
      </div>

      <el-button type="primary" class="login" @click="handleClick">
        {{ isRegist ? i18n.btnRegist : i18n.btnLogin }}
      </el-button>
      <p class="text-link">
        <span @click="isRegist = !isRegist">{{ isRegist ? i18n.textLogin : i18n.textRegist }}</span>
      </p>
    </div>
  </div>
</template>

<script>
import Input from '../../components/Input.vue';
import Label from '../../components/Label.vue';
import SYU from '../../../engine';

export default {
  name: 'Login',
  components: {
    Input,
    Label,
  },
  data() {
    return {
      textLink: '🤪点击注册',
      isRegist: false,
      checkPassword: '',
      value: {
        account: '',
        password: '',
        name: '',
        code: '',
      },
      i18n: {
        btnLogin: '😃登录',
        btnRegist: '😆注册',
        textLogin: '🤪点击登录',
        textRegist: '😳点击注册',
      },
    };
  },
  async mounted() {
    // if (this.$cookies.isKey('chatroomToken')) {
    //   const { data } = await SYU.checkUserToken(this.$cookies.get('chatroomToken'));
    //   if (data.status === 0) {
    //     const cookie = {
    //       _id: data._id,
    //       token: data.token,
    //     };
    //     this.$cookies.set('chatroomToken', cookie, 60 * 60 * 24 * 3);
    //     this.$root.isLogin = true;
    //     this.$message.success(data.errMsg);
    //     this.$router.replace({ name: 'Index' });
    //   } else {
    //     this.$message.error(data.errMsg);
    //     this.$cookies.remove('chatroomToken');
    //   }
    // } else {
    //   this.$cookies.remove('chatroomToken');
    // }
    if (this.$cookies.isKey('chatroomToken')) {
      SYU.checkUserToken(this, this.$cookies.get('chatroomToken'));
    } else {
      this.$cookies.remove('chatroomToken');
    }
  },
  methods: {
    handleClick() {
      if (this.isRegist) {
        this.handleRegist();
      } else {
        this.handleLogin();
      }
    },
    // Todo
    async handleRegist() {
      const { account, password, name, code } = this.value;
      if (account.trim() && password.trim() && name.trim() && code.trim()) {
        if (password !== this.checkPassword) {
          this.$message.error('两次密码不相同');
          return;
        }
        const params = {
          account: account.trim(),
          password: this.$md5(password.trim()),
          name: name.trim(),
          code: code.trim(),
        };
        const { data } = await SYU.register(params);
        this.$$message.success(data.errMsg);
      } else {
        this.$message.error('邮箱，密码，用户名为必填项');
      }
    },
    async handleLogin() {
      const { account, password } = this.value;
      if (account.trim() && password.trim()) {
        const params = {
          account: account.trim(),
          password: this.$md5(password.trim()),
        };
        const { data } = await SYU.login(params);
        if (data.status === 0) {
          const cookie = {
            _id: data._id,
            token: data.token,
          };
          this.$cookies.set('chatroomToken', cookie, 60 * 60 * 24 * 3);
          this.$root.isLogin = true;
          this.$root._id = data._id;
          this.$message.success(data.errMsg);
          this.$router.replace({ name: 'Index' });
        } else {
          this.$message.error(data.errMsg);
        }
      } else {
        this.$message.error('请输入账户及密码');
      }
    },
  },
};
</script>

<style lang="less" scoped>
.wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  letter-spacing: 1px;
}

.login-container {
  width: 440px;
  padding: 30px 40px;
}

.blank {
  width: 100%;
  height: 1px;
  margin: 15px;
}

.login {
  width: 100%;
}

.text-link {
  margin-top: 15px;
  margin-right: 5px;
  font-size: 14px;
  text-align: right;

  span {
    color: #409eff;
    cursor: pointer;
    transition: 0.2s linear;

    &:hover {
      color: #faa;
    }
  }
}

</style>
