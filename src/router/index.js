import Vue from "vue";

// 1. 导入路由组件
import VueRouter from "vue-router";

// 导入子页面
import login from "../views/login";
// 导入主页
import index from "../views/index/index.vue"

// 导入NProgress进度条
import NProgress from "nprogress";
import "nprogress/nprogress.css"

// 导入mian里面的子路由
import user from "../views/index/user/user.vue"
import chart from "../views/index/chart/chart.vue"
import question from "../views/index/question/question.vue"
import subject from "../views/index/subject/subject.vue"
import business from "../views/index/business/business.vue"

// 导入api主页的用户信息获取组件
import {getInfo} from "../api/index.js";

import {moveToken} from "../utilis/token.js";

import { Message } from 'element-ui';

// 2. 注册路由
Vue.use(VueRouter);

// 3. 实例化路由
const router = new VueRouter({
    routes: [
        {
            path: '/login',
            component: login,
            
        },
        {
            path: '/',
            // component: login,
            redirect:"/login", 
        },
        {
            path: '/index',
            component: index,
            children: [
                {
                    path: 'user',
                    component: user,
                    meta:'用户列表'
                },
                {
                    path: 'chart',
                    component: chart,
                    meta:'数据概览'
                },
                {
                    path: 'business',
                    component: business,
                    meta:'企业列表'
                },
                {
                    path: 'subject',
                    component: subject,
                    meta:'学课列表'
                },
                {
                    path: 'question',
                    component: question,
                    meta:'题库列表'
                },
            ]
        }
    ]
});
let wihteList = ["/login","/index/question"];
// 路由导航守卫
router.beforeEach((to, from, next) => {
    // to and from are both route objects. must call `next`.
    NProgress.start();
    if(wihteList.includes(to.path)) {
        next();
        return
    }
    
    if (to.path == "/login") {
        next();
    } else {
        getInfo().then(res => {
            window.console.log(res);
            if (res.data.code == 200) {
                next();
            } else {
                Message.error("登录异常");
                moveToken();
                // this.$router.push("/login");
                NProgress.done();
                next("/login");
            }
        })
    }
})

router.afterEach((to) => {
    // to and from are both route objects.
    document.title = to.meta;
    NProgress.done();
})

export default router;