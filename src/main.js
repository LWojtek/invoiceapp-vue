import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import VueFbCustomerChat from 'vue-fb-customer-chat';


Vue.use(VueFbCustomerChat, {
	page_id: "100819355676998", //  change 'null' to your Facebook Page ID,
	theme_color: '#333333', // theme color in HEX
	locale: 'en_US', // default 'en_US'
  });


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
