// 错误页面组件
import React from "react";


class Error403 extends React.Component {
    // 用户无权限
    render () {
        return (
            <div>403</div>
        );
    }
}


class Error404 extends React.Component {
    // 找不到该页面
    render () {
        return (
            <div>404</div>
        );
    }
}


class Error405 extends React.Component {
    // 请求方法不允许
    render () {
        return (
            <div>405</div>
        );
    }
}

export {
    Error403,
    Error404,
    Error405
};
