import Vue from "vue";
import App from "./App.vue";

module.exports = function createApp() {
  return new Vue({
    render: (h) => h(App),
  });
};
