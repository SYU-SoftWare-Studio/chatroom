<template>
  <div class="wrapper">
    <div class="left-bar">
      <div class="user-avatar-wrap">
        <Avatar
          :data="userData"
          type="user"
          show-status-text
          is-user
          clickable
        />
      </div>
      <div class="user-func-wrap">
        <el-icon class="el-icon-edit user-func" @click="alert(123123)" />
        <span @click="loginOut">
          <el-icon class="el-icon-search user-func" />
        </span>
        <span class="search-wrap">
          <input
            v-model="searchKey"
            class="user-search"
            @keypress.enter="handleSearch"
            @blur="showRes = false"
          >
          <transition name="slide">
            <div v-if="showRes" class="search-result">
              <div v-for="(item, index) in searchResult" :key="index" class="result" @click="addNewChat(item._id)">
                <Avatar :data="item" type="search" />
              </div>
            </div>
          </transition>
        </span>
      </div>
      <div class="contact-wrap">
        <div class="public-contact">
          <div class="contact-header">公共频道</div>
          <div
            v-for="(item, index) of talkList.public"
            :key="index"
            :class="['contact-container', currentRoom.data._id === item._id ? 'select' : '']"
            @click="onRoomSelect(item, 'chatroom')"
          >
            <Avatar :data="item" classify="chatroom" class="contact" />
          </div>
        </div>
        <div class="private-contact">
          <div class="contact-header">私有频道</div>
          <div
            v-for="(item, index) of talkList.private"
            :key="index"
            :class="['contact-container', currentRoom.data._id === item._id ? 'select' : '']"
            @click="onRoomSelect(item, 'chatroom')"
          >
            <Avatar :data="item" classify="chatroom" class="contact" />
          </div>
        </div>
        <div class="private-contact">
          <div class="contact-header">私聊</div>
          <div
            v-for="(item, index) of talkList.chat"
            :key="index"
            :class="['contact-container', currentRoom.data._id === item._id ? 'select' : '']"
            @click="onRoomSelect(item,index, 'user')"
          >
            <Avatar :data="item" class="contact" classify="user" />
          </div>
        </div>
      </div>
    </div>
    <div class="right-bar">
      <MessageInput />
      <Content />
      <TopBar :is-slider-show="showSlider" :room="currentRoom" @member="handleMember" />
    </div>
    <Slider v-model="showSlider" :data="slider" :info="currentRoom.data" />
  </div>
</template>

<script>
import Vue from 'vue';
import Slider from '@/components/Slider.vue';
import Avatar from '@/components/Avatar.vue';
import MessageInput from './components/MessageInput.vue';
import TopBar from './components/TopBar.vue';
import Content from './components/Content.vue';
import SYU from '../../../engine';

export default {
  name: 'Index',
  components: {
    MessageInput,
    TopBar,
    Content,
    Avatar,
    Slider,
  },
  data() {
    return {
      color: { backgroundColor: SYU.randomColor() },
      searchKey: '',
      searchResult: [],
      userData: {},
      currentRoom: {
        data: {},
        classify: 'user',
      },
      showSlider: false,
      slider: {
        type: 'list',
        classify: 'chatroom',
      },
      talkList: {
        chat: [],
        private: [],
        public: [],
      },
      showRes: false,
      timmer: '',
    };
  },
  async created() {
    if (Vue.prototype.$isLogin === false) {
      if (this.$cookies.isKey('chatroomToken')) {
        const check = await SYU.checkUserToken(this, this.$cookies.get('chatroomToken'));
        if (!check) {
          this.$router.replace({ name: 'Login' });
          return;
        }
      } else {
        Vue.prototype.$canLogin = true;
        this.$router.replace({ name: 'Login' });
        return;
      }
    }
    this.fetchData(Vue.prototype.$_id);
    this.timmer = setInterval(() => {
    }, 1000);
  },
  beforeDestroy() {
    clearInterval(this.timmer);
  },
  methods: {
    handleMember(type) {
      this.showSlider = true;
      this.slider.type = type;
    },
    async onRoomSelect(data, index, classify) {
      if (classify === 'user') {
        const res = await SYU.fetchUserInfo({ _id: data._id });
        this.setObjVal(this.talkList.chat[index], res);
        this.setObjVal(this.currentRoom.data, res);
      } else {
        this.setObjVal(this.currentRoom.data, data);
      }
      this.currentRoom.classify = classify;
      this.slider.classify = classify;
      this.showSlider = false;
    },
    async fetchData(_id) {
      const data = await SYU.fetchTalkList({ _id });
      this.talkList.chat = data;
      this.setObjVal(this.userData, data[0]);
      this.setObjVal(this.currentRoom.data, data[0]);
    },
    setObjVal(target, source) {
      Object.keys(source).forEach((key) => {
        this.$set(target, key, source[key]);
      });
    },
    async handleSearch() {
      if (!this.searchKey.trim()) {
        this.$message.error('搜索内容不能为空');
        return;
      }
      this.searchResult = await SYU.searchUserAndRoom({ key: this.searchKey });
      this.showRes = true;
    },
    async addNewChat(targetId) {
      const params = {
        _id: Vue.prototype.$_id,
        targetId,
      };
      const check = await SYU.addNewChat(params);
      if (check) {
        const data = await SYU.fetchTalkList({ _id: Vue.prototype.$_id });
        this.talkList.chat = data;
        this.setObjVal(this.currentRoom.data, data[data.length - 1]);
      }
    },
    loginOut() {
      this.$cookies.remove('chatroomToken');
      this.$message.info('退出登录');
      Vue.prototype.$isLogin = false;
      this.$router.replace({ name: 'Login' });
    },
  },
};
</script>

<style lang="less" scoped>
fade-enter-active,
.slide-enter-active,
.slide-leave-active {
  height: 250px !important;
  transition: 0.4s ease-out;
}

.slide-enter,
.slide-leave-to /* .fade-leave-active below version 2.1.8 */ {
  height: 0 !important;
}

.wrapper {
  display: flex;
  width: 100%;
  height: 100%;

  .left-bar {
    display: flex;
    flex-direction: column;
    width: 280px;
    height: 100%;
    background-color: #525252;
    transition: 0.2s all ease-in-out;

    .user-avatar-wrap {
      margin: 30px 0 0 30px;

      .user-avatar {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 70px;
        height: 70px;
        color: #fff;
        font-size: 30px;
        border-radius: 5px;
      }
    }

    .user-func-wrap {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin: 20px 10px 0 30px;
      color: #fff;
      font-size: 18px;
      text-align: right;

      .search-wrap {
        position: relative;

        .user-search {
          box-sizing: border-box;
          width: 155px;
          padding: 6px 8px;
          color: #fff;
          background-color: #80808080;
          border: 0;
          border-radius: 5px;
          outline: none;
        }

        .search-result {
          position: absolute;
          display: flex;
          flex-direction: column;
          width: 155px;
          height: 250px;
          margin-top: 5px;
          padding: 10px 0;
          overflow-y: scroll;
          background-color: #fffffff0;
          border-radius: 5px;

          &::-webkit-scrollbar {
            width: 8px;
            background: #3a3a3a4d;
          }

          &::-webkit-scrollbar-thumb {
            width: 10px;
            background-color: #faa;
            border-radius: 4px;
          }

          .result {
            padding: 5px 0 5px 5px;
            cursor: pointer;
            transition: 0.3s ease-in;

            &:hover {
              background-color: #9494944d;
            }
          }
        }
      }

      .user-func {
        margin-right: 20px;
        cursor: pointer;
        transition: 0.3s ease-in-out;

        &:hover {
          color: #faa;
        }
      }
    }

    .contact-wrap {
      flex: 1;
      margin-top: 20px;
      overflow-y: scroll;
      text-align: left;

      &::-webkit-scrollbar {
        width: 8px;
        background: #9494944d;
      }

      &::-webkit-scrollbar-thumb {
        width: 10px;
        background-color: #ffffff50;
        border-radius: 4px;
      }

      .public-contact,
      .private-contact {
        .contact-header {
          margin: 30px 0 20px 30px;
          color: #fff;
          font-size: 14px;
        }

        .select {
          background-color: #a9a9a950;
        }

        .contact-container {
          margin: 10px 0;
          padding: 3px 30px;
          cursor: pointer;
          transition: 0.3s ease-in-out;

          &:hover {
            background-color: #a9a9a91c;
          }
        }
      }
    }
  }

  .right-bar {
    position: relative;
    display: flex;
    flex: 1;
    flex-direction: column-reverse;
    height: 100%;
    background-color: rgb(250, 250, 250);
  }
}

@media screen and (max-width: 800px) {
  .wrapper {
    .left-bar {
      width: 0;
    }
  }
}
</style>
