import Vue from 'vue';
import VEmojiPicker from 'v-emoji-picker';
import ElementUI from 'element-ui';
import App from './App.vue';
import router from './router';

import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(VEmojiPicker);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
