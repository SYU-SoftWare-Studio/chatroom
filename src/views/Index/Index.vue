<template>
  <div class="wrapper">
    <div class="left-bar">
      <div class="user-avatar-wrap">
        <Avatar
          :id="userId"
          type="user"
          show-status-text
          is-user
          clickable
        />
      </div>
      <div class="user-func-wrap">
        <el-icon class="el-icon-edit user-func" @click="alert(123123)" />
        <span @click="showRes = true">
          <el-icon class="el-icon-search user-func" />
        </span>
        <span class="search-wrap">
          <input class="user-search" @keypress.enter="showRes = true" @blur="showRes = false">
          <transition name="slide">
            <div v-if="showRes" class="search-result">
              <Avatar :id="userId" type="search" />
              <Avatar :id="userId" type="search" />
              <Avatar :id="userId" type="search" />
              <Avatar :id="userId" type="search" />
              <Avatar :id="userId" type="search" />
              <Avatar :id="userId" type="search" />
              <Avatar :id="userId" type="search" />
              <Avatar :id="userId" type="search" />
              <Avatar :id="userId" type="search" />
              <Avatar :id="userId" type="search" />
              <Avatar :id="userId" type="search" />
              <Avatar :id="userId" type="search" />
              <Avatar :id="userId" type="search" />
              <Avatar :id="userId" type="search" />
              <Avatar :id="userId" type="search" />
              <Avatar :id="userId" type="search" />
              <Avatar :id="userId" type="search" />
              <Avatar :id="userId" type="search" />
              <Avatar :id="userId" type="search" />
              <Avatar :id="userId" type="search" />
              <Avatar :id="userId" type="search" />
              <Avatar :id="userId" type="search" />
              <Avatar :id="userId" type="search" />
              <Avatar :id="userId" type="search" />

            </div>
          </transition>
        </span>
      </div>
      <div class="contact-wrap">
        <div class="public-contact">
          <div class="contact-header">公共频道</div>
          <div
            v-for="(item, index) of contactData.public"
            :key="index"
            :class="['contact-container', currentRoom.id === item ? 'select' : '']"
            @click="onRoomSelect(item, 'chatroom')"
          >
            <Avatar :id="item" classify="chatroom" class="contact" />
          </div>
          <div class="private-contact">
            <div class="contact-header">私有频道</div>
            <div
              v-for="(item, index) of contactData.private"
              :key="index"
              :class="['contact-container', currentRoom.id === item ? 'select' : '']"
              @click="onRoomSelect(item, 'chatroom')"
            >
              <Avatar :id="item" classify="chatroom" class="contact" />
            </div>
          </div>
          <div class="private-contact">
            <div class="contact-header">私聊</div>
            <div
              v-for="(item, index) of contactData.chat"
              :key="index"
              :class="['contact-container', currentRoom.id === item ? 'select' : '']"
              @click="onRoomSelect(item, 'user')"
            >
              <Avatar :id="item" class="contact" classify="user" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="right-bar">
      <MessageInput />
      <Content />
      <TopBar :is-slider-show="showSlider" :room="currentRoom" @member="handleMember" />
    </div>
    <Slider v-model="showSlider" :data="slider" />
  </div>
</template>

<script>
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
      userId: '2345',
      currentRoom: {
        id: '2345',
        classify: 'user',
      },
      showSlider: false,
      slider: {
        type: 'list',
        classify: 'chatroom',
      },
      contactData: {},
      showRes: false,
    };
  },
  mounted() {
    this.contactData = SYU.fetchContact();
  },
  methods: {
    handleMember(type) {
      this.showSlider = true;
      this.slider.type = type;
    },
    onRoomSelect(id, classify) {
      this.currentRoom.id = id;
      this.currentRoom.classify = classify;
      this.slider.classify = classify;
      this.showSlider = false;
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
          width: 155px;
          height: 250px;
          margin-top: 5px;
          overflow-y: scroll;
          background-color: #fffffff0;
          border-radius: 5px;
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
      margin-top: 20px;
      text-align: left;

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
