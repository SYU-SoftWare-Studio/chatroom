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
}
