import React, { Component } from "react";
import ReactDOM from "react-dom";

// 日历、日期语言--中文
import zhCN from "antd/lib/locale/zh_CN";
import { ConfigProvider, Layout } from "antd";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

// 导入动态渲染路由和菜单Link
import { CustomMenu, SwitchRoute } from "./router/router.js";
// 导入Header部分组件
import CustomHeader from "@view/pages/header/header.js";

// 导入Login页面组件
import Login from "@view/pages/login/login.js";

// 导入REST API方法
import { fetch, post, put, del } from "@/api/http.js";


class Container extends Component {
    constructor(props) {
        super(props);
        this.changeLoginStatus = this.changeLoginStatus.bind(this);
        this.state = {
            isLoginStatus: true
        };
        this.$fetch = fetch.bind(this);  // get请求
        this.$post = post.bind(this);  // post请求
        this.$put = put;  // put请求
        this.$del = del;  // delete请求
        this.$path = "http://10.70.6.188:8001";  // 后台接口请求地址
    }

    async changeLoginStatus (loginStatus) {
        await this.setState({
            isLoginStatus: false
        });
        console.log(loginStatus, "这是登录状态");
    }

    render() {
        return (
            <ConfigProvider locale={zhCN}>
                <BrowserRouter>
                    {this.state.isLoginStatus ?
                    <Layout style={{ height: "100%" }}>
                    <Layout.Sider
                        style={{
                            overflow: "auto",
                            height: "100vh",
                            position: "fixed",
                            left: 0
                        }}>
                        <div className="logo">
                            <img
                                src={ require("./static/images/login_tray.png").default }
                                alt="图标"/>
                        </div>
                        {/* 动态渲染菜单 */}
                        <CustomMenu />
                    </Layout.Sider>

                    <Layout
                        className="site-layout"
                        style={{ marginLeft: 200 }}>
                        <Layout.Header
                            className="site-layout-background"
                            style={{ paddingLeft: "16px", height: "110px" }}>
                            {/* 渲染Header部分的自定义头部,传入判断用户是否登录状态标记 */}
                            <CustomHeader isLoginStatus={this.state.isLoginStatus} changeLoginStatus={this.changeLoginStatus} />
                        </Layout.Header>
                        <Layout.Content
                            className="site-layout-background"
                            style={{
                                margin: "24px 16px 0",
                                overflow: "auto"
                            }}>
                            {/* 动态渲染路由 */}
                            <SwitchRoute />
                        </Layout.Content>
                        <Layout.Footer
                            className="footer"
                            style={{ textAlign: "center" }}>
                            @copyright Wilson 2021
                        </Layout.Footer>
                    </Layout>
                </Layout>
                    : <Login />   // 条件判断渲染Login页面组件
                    }
                </BrowserRouter>
            </ConfigProvider>
        );
    }
}

ReactDOM.render(<Container />, document.getElementById("root"));
