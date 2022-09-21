import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

Vue.config.productionTip = false;
Vue.prototype.$baseUrl = process.env.VUE_APP_API_BASE_URL;

const options = {
    transition: "Vue-Toastification__bounce",
    maxToasts: 20,
    newestOnTop: true
};

Vue.use(Toast, options);
Vue.use(require('vue-moment'));



new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
