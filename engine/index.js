import { v4 as uuidv4 } from 'uuid';

import compress from '../utils/compress';
import API from '../api';
import { userInfo, contact, chatroomInfo } from '../Mock/index';

const DOMAIN = 'https://upload-z2.qiniup.com';
const SUB_DOMAIN = 'quxf545jx.hn-bkt.clouddn.com';

export default class SYU {
  static getToken = async () => {
    const { data } = await API.fetchToken();
    return data;
  };

  // static uploadPic = async (url: string, data: FormData): Promise<string> => {
  //   const link: any = await API.uploadPic(url, data);
  //   return `http://${SUB_DOMAIN}/${link.data.key}`;
  // };

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

  // static getChatRoomMember = (id) => {
  //   const data = chatroomInfo[id];
  //   return data;
  // };

  static fetchContact = () => contact;
}
