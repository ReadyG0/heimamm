// 定义一个token常量
const TOKENYEY = 'mmToken';

// 存储token
let setToken = function(key) {
    window.localStorage.setItem(TOKENYEY,key);
}

// 获取token
let getToken = function() {
    // 这里一定要return出去 因为要使用过去的token
    return window.localStorage.getItem(TOKENYEY);
}

// 删除token
let moveToken = function() {
    window.localStorage.removeItem(TOKENYEY);
}

export {setToken,getToken,moveToken};