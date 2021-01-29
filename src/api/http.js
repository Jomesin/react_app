import Axios from "axios";
// 导入history包
import { createBrowserHistory } from "history";

import { message } from "antd";

// 导入自定义缓存包
import Storage from "@/utils/storage.js";


Axios.defaults.timeout = 50 * 1000;  // 设置请求超时限度范围50S


const $path = "http://10.70.6.188:8001";  // 后台接口请求地址
const $history = createBrowserHistory();  // 获取history,用户路由跳转


// http request 拦截器
Axios.interceptors.request.use(
    (config) => {
        console.log(config, "request这是配置config");
        let storage = new Storage();
        const token = storage.getItem("token");
        const locale = storage.getItem("locale");
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
Axios.interceptors.response.use(
    (response) => {
        console.log(response, "response这是响应");
        return response;
    },
    (error) => {
        console.log(error, "response这是错误");
        if (error.response) {
            switch (error.response.status) {
                case 400:  // 一个错误的请求
                    message.error("请求没有进入到后台服务器");
                    break;

                case 401:  // 登录信息失效
                    $history.push("/login");  // 跳转路由
                    break;

                case 403:  // 用户无权限
                    message.error("用户无权限");
                    break;

                case 404:  // 请求资源不存在
                    message.error("请求资源不存在");
                    break;

                case 405:  // 请求方法不被允许
                    message.error("请求动作不被允许");
                    break;

                case 500:  // 服务器发生错误，请检查服务器。
                    message.error("服务器发生错误,请检查服务器!");
                    break;

                case 502:  // 网关错误
                    message.error("网关错误,服务器异常中断!");
                    break;

                default:  // 其它未被匹配的错误
                    message.error(error.response.request.response);
                    break;
            }
        } else {  // 请求失败的情况
            message.error("请求失败!");
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
function $fetch (url, params = {}) {
    return new Promise((resolve, reject) => {
        Axios.get(url, {
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
function $post (url, data = {}) {
    return new Promise((resolve, reject) => {
        Axios.post(url, data).then((response) => {
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
function $put (url, data = {}) {
    return new Promise((resolve, reject) => {
        Axios.put(url, data).then((response) => {
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
function $del (url, data = {}){
    return new Promise((resolve, reject) => {
        Axios.delete(url, data).then((response) => {
            resolve(response.data);
        }), (error) => {
            reject(error);
        };
    });
}


export {
    $fetch,
    $post,
    $put,
    $del,
    $path,
    $history
};
