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
}
