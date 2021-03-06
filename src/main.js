import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false

// 把router文件夹的路由文件导入进来
import router from "./router/index"

// 导入和使用element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

// 导入基础css
import "./style/base.css"

new Vue({
  // 4. 路由注入
  router,
  render: h => h(App),
}).$mount('#app')
