import React from "react";
import { Layout } from "antd";
import "./layout.less";


class AdminSider extends React.Component {
    // 左边菜单栏
    render () {
        return (
            <Layout.Sider className="custom-sider">
                <div className="logo">
                    {/* 菜单部Logo图标 */}
                    <img src={require("@images/login_tray.png").default}
                        alt="图标" />
                </div>
                {/* 动态渲染菜单 */}
                { this.props.children }
            </Layout.Sider>
        );
    }
}


class AdminHeader extends React.Component {
    // 头部标题栏
    render () {
        return (
            <Layout.Header
                className="custom-header">
                {/* 渲染Header部分的自定义头部,传入判断用户是否登录状态标记 */}
                { this.props.children }
            </Layout.Header>
        );
    }
}


class AdminContent extends React.Component {
    // 中部内容部分
    render () {
        return (
            <Layout.Content
                className="custom-content">
                {/* 动态渲染路由 */}
                { this.props.children }
            </Layout.Content>
        );
    }
}


class AdminFooter extends React.Component {
    // 尾部尾角
    render () {
        return (
            <Layout.Footer className="custom-footer">
                {/* @copyright Wilson 2021  */}
                { this.props.children }
            </Layout.Footer>
        );
    }
}


export {
    AdminSider,
    AdminHeader,
    AdminContent,
    AdminFooter
};
