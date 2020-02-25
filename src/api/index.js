import axios from "axios";

//为了使用token 导入封装好的token文件
import {getToken} from "../utilis/token.js";
// 为了封装index.js里面的axios代码
// 克隆一份axios
let axiosClone = axios.create({
    method:'get',
    baseURL:process.env.VUE_APP_BASE_URL,
    // headers:{
    //     token:getToken(),
    // }
})

// 请求拦截 
axiosClone.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    config.headers.token = getToken();
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

let getInfo = function() {
    return axiosClone({
        url:'/info',
    })
}

let userLogin = function() {
    return axiosClone({
        url:'/logout',
    })
}

export {getInfo,userLogin};