import service from '../utils/request';

export default class API {
  static fetchToken = () => {
    return service.request({
      method: 'GET',
      url: 'token',
    });
  };

  static uploadPic = (url, data) => {
    return service.request({
      method: 'POST',
      headers: { 'Content-Type': 'multipart/form-data' },
      url,
      data,
    });
  };

  static register = (data) => {
    return service.request({
      method: 'POST',
      url: 'register',
      data,
    });
  };

  static login = (data) => {
    return service.request({
      method: 'POST',
      url: 'login',
      data,
    });
  };

  static checkUserToken = (data) => {
    return service.request({
      method: 'POST',
      url: 'checkUserToken',
      data,
    });
  };

  static searchUserAndRoom = (params) => {
    return service.request({
      method: 'GET',
      url: 'searchUserAndRoom',
      params,
    });
  }

  static fetchTalkList = (params) => {
    return service.request({
      method: 'GET',
      url: 'users/talkList',
      params,
    });
  };

  static fetchUserInfo = (params) => {
    return service.request({
      method: 'GET',
      url: 'users/fetchUserInfo',
      params,
    });
  };

  static addNewChat = (params) => {
    return service.request({
      method: 'GET',
      url: 'users/addNewChat',
      params,
    });
  }
}
