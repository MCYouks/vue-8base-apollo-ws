// Install Vue 3 composition API
import "./installCompositionApi.js";

import Vue from "vue";

import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";

import { provide } from "@vue/composition-api";
import { DefaultApolloClient } from "@vue/apollo-composable";
import apolloClient from "./apollo-client.js";

Vue.config.productionTip = false;

/**
 * Initialize the vue app and mount to the
 * root component id.
 */
new Vue({
  router,
  store,
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },
  render: h => h(App)
}).$mount("#app");
