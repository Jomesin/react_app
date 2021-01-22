import axios from "axios";
axios.defaults.timeout = 50 * 1000;  // 设置请求超时限度范围50S


// http request 拦截器
axios.interceptors.request.use(
    (config) => {
        console.log(config, "request这是配置config");
        const token = localStorage.getItem("token");
        const locale = localStorage.getItem("locale");
        config.headers = {
            "Content-type": "application/json",
            "Authorization": token ? "JWT " + token : null,
            "Accept-Language": locale
        };
        return config;
    },
    (error) => {
        console.log("request这是错误", error);
        return Promise.reject(error);
    }
);


// http response 拦截器
axios.interceptors.response.use(
    (response) => {
        console.log(response, "response这是响应");
        return response;
    },
    (error) => {
        console.log(error, "response这是错误");
        if (error.response) {
            console.log(error.response, "这是错误响应");
        }
        return Promise.reject(error);
    }
);


/**
 * 封装GET方法(获取数据)
 * @param url
 * @param data
 * @returns {Promise}
 */
function fetch (url, params = {}) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        }).then((response) => {
            resolve(response.data);
        }).catch((error) => {
            reject(error);
        });
    });
}


/**
 * 封装POST方法(提交存储数据)
 * @param url
 * @param data
 * @returns {Promise}
 */
function post (url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.post(url, data).then((response) => {
            resolve(response.data);
        }, (error) => {
            reject(error);
        });
    });
}


/**
 * 封装put方法(修改数据)
 * @param url
 * @param data
 * @returns {Promise}
 */
function put (url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.put(url, data).then((response) => {
            resolve(response.data);
        }, (error) => {
            reject(error);
        });
    });
}


/**
 * 封装delete请求(删除相关数据)
 * @param url
 * @param data
 * @returns {Promise}
 */
function del (url, data = {}){
    return new Promise((resolve, reject) => {
        axios.delete(url, data).then((response) => {
            resolve(response.data);
        }), (error) => {
            reject(error);
        };
    });
}

export {
    fetch,
    post,
    put,
    del
};
