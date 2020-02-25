import axios from "axios";

let getLoginCode = function(data) {
    return axios({
        method:'post',
        url:process.env.VUE_APP_BASE_URL + '/login',
        data,
        withCredentials:true,
    })
};

export {getLoginCode};