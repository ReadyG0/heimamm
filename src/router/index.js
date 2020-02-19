import Vue from "vue";

// 1. 导入路由组件
import VueRouter from "vue-router";

// 导入子页面
import login from "../views/login";

// 2. 注册路由
Vue.use(VueRouter);

// 3. 实例化路由
const router = new VueRouter({
    routes: [
        {
            path: '/login',
            component: login,
        }
    ]
});

export default router;