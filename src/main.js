import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from '@/plugins/vuetify' // path to vuetify export


import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

import 'vuetify/dist/vuetify.min.css'


Vue.config.productionTip = false;
Vue.prototype.$baseUrl = process.env.VUE_APP_BASE_URL;
Vue.prototype.$rateUrl = process.env.VUE_APP_RATE_URL;

const options = {
    transition: "Vue-Toastification__bounce",
    maxToasts: 20,
    newestOnTop: true
};

Vue.use(Toast, options);
Vue.use(require('vue-moment'));
 

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
