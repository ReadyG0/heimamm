import axios from "axios";

let getCode = function (data) {
    return axios({
        method: "post",
        url: process.env.VUE_APP_BASE_URL + "/sendsms",
        data,
        //可以携带cookie
        withCredentials: true,
    })
};
let postData = function(data) {
    return axios({
        method: "post",
        url: process.env.VUE_APP_BASE_URL + "/register",
        data,
        //可以携带cookie
        withCredentials: true,
    })
};

export  {getCode,postData};
// export  {};