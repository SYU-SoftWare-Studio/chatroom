import Vue from 'vue';
import VEmojiPicker from 'v-emoji-picker';
import ElementUI from 'element-ui';
import md5 from 'js-md5';
import VueCookies from 'vue-cookies';
import App from './App.vue';
import router from './router';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(VueCookies);

Vue.config.productionTip = false;

Vue.prototype.$md5 = md5;

Vue.prototype.$canLogin = false;

Vue.use(ElementUI);
Vue.use(VEmojiPicker);

new Vue({
  router,
  data() {
    return {
      isLogin: false,
    };
  },
  render: (h) => h(App),
}).$mount('#app');
