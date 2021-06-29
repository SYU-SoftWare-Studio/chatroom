import { v4 as uuidv4 } from 'uuid';
import Vue from 'vue';
import compress from '../utils/compress';
import API from '../api';
import { userInfo, contact, chatroomInfo } from '../Mock/index';

const DOMAIN = 'https://upload-z2.qiniup.com';
const SUB_DOMAIN = 'quxf545jx.hn-bkt.clouddn.com';

export default class SYU {
  // get QiNiu token
  static getToken = async () => {
    const { data } = await API.fetchToken();
    return data;
  };

  static uploadPic = async (req) => {
    const token = await SYU.getToken();
    let fileType = req.file.type.split('/')[1];
    if (fileType === 'jpeg') {
      fileType = 'jpg';
    }
    const key = `${uuidv4().replace(/-/g, '')}${new Date().valueOf()}.${fileType}`;
    const file = await compress(req.file);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('token', token);
    formData.append('key', key);
    const link = await API.uploadPic(DOMAIN, formData);
    return `http://${SUB_DOMAIN}/${link.data.key}`;
  };

  static randomColor = () => {
    const color = ['#79e5e8', '#7de879', '#ffaaaa', '#66b1ff', '#b672d6', '#f13f7c', '#0accc8'];
    return color[Math.ceil(Math.random() * color.length)];
  };

  static getInfo = (id, classify) => {
    if (classify === 'user') {
      return userInfo[id];
    }
    return chatroomInfo[id];
  };

  static fetchContact = () => contact;

  static register = (data) => {
    const status = API.register(data);
    return status;
  };

  static login = (data) => {
    const status = API.login(data);
    return status;
  };

  static checkUserToken = async (that, params) => {
    const { data } = await API.checkUserToken(params);
    if (data.status === 0) {
      const cookie = {
        _id: data._id,
        token: data.token,
      };
      that.$cookies.set('chatroomToken', cookie, 60 * 60 * 24 * 3);
      Vue.prototype.$isLogin = true;
      Vue.prototype.$_id = data._id;
      Vue.prototype.$canLogin = false; // 防止再次跳转到登陆页面
      that.$message.success(data.errMsg);
      return true;
    }
    that.$message.error(data.errMsg);
    that.$cookies.remove('chatroomToken');
    Vue.prototype.isLogin = false;
    Vue.prototype.$canLogin = true;
    return false;
    // if (that.$route.name !== 'Login') {
    //   that.$router.replace({ name: 'Login' });
    // }
  };

  static fetchUserInfo = async (params) => {
    const { data } = await API.fetchUserInfo(params);
    return data;
  }

  static fetchOthersInfo = async (params) => {
    const { data } = await API.fetchOthersInfo(params);
    if (data.status === 0) {
      return data.value;
    }
    Vue.prototype.$message.error(data.errMsg);
    return false;
  }

  static fetchTalkList = async (params) => {
    const { data } = await API.fetchTalkList(params);
    return data;
  }

  static searchUserAndRoom = async (params) => {
    const { data } = await API.searchUserAndRoom(params);
    return data;
  }

  static addNewChat = async (params) => {
    const { data } = await API.addNewChat(params);
    if (data.status === 0) {
      return true;
    }
    Vue.prototype.$message.error(data.errMsg);
    return false;
  }

  static fetchInvitationCode = async (params) => {
    const { data } = await API.fetchInvitationCode(params);
    if (data.status === 0) {
      return data.code;
    }
    Vue.prototype.$message.error(data.errMsg);
    return null;
  }

  static regenerateInvitationCode = async (params) => {
    const { data } = await API.regenerateInvitationCode(params);
    if (data.status === 0) {
      return data.code;
    }
    Vue.prototype.$message.error(data.errMsg);
    return null;
  }

  static saveUserProfile = async (that, params) => {
    const { data } = await API.saveUserProfile(params);
    if (data.status === 0) {
      Vue.prototype.$message.success(data.errMsg);
      return true;
    } if (data.status === 2) {
      that.$cookies.remove('chatroomToken');
    }
    Vue.prototype.$message.success(data.errMsg);
    return false;
  }

  // static identifyUser =

  // static tokenErr = (that) => {
  //   that.$message.error('身份认证已过期，请重新登录');
  //   that.$root.isLogin = false;
  //   Vue.prototype.$canLogin = true;
  //   that.$router.push({ name: 'Login' });
  // };
}
