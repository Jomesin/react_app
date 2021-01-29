import React from "react";
import ReactDOM from "react-dom";

// 日历、日期语言--中文
import zhCN from "antd/lib/locale/zh_CN";
import { ConfigProvider, Layout } from "antd";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import "./index.css";

// 导入动态渲染路由和菜单Link
import { CustomMenu, SwitchRoute } from "./router/router.js";
// 导入Header部分组件
import CustomHeader from "@view/pages/header/header.js";

// 导入登录页面组件
import Login from "@view/pages/login/login.js";

// 导入布局容器组件
import { AdminSider, AdminHeader, AdminContent, AdminFooter } from "./layout.js";

// 导入各种错误页面组件
import { Error403, Error404, Error405 } from "@view/pages/error_pages.js";

// 导入注册页面
import { Register } from "@view/pages/register/register.js";


class Index extends React.Component {

    render () {
        return (
            <ConfigProvider locale={zhCN}>
                <BrowserRouter>
                    <Switch>
                        <Route path="/login" exact component={Login} />
                        <Route path="/403" exact component={Error403} />
                        <Route path="/404" exact component={Error404} />
                        <Route path="/405" exact component={Error405} />
                        <Route path="/register" exact component={Register} />
                        <Route path="/" render={() =>
                            <Layout style={{ height: "100%" }}>
                                <AdminSider>
                                    {/* 动态渲染菜单 */}
                                    <CustomMenu />
                                </AdminSider>

                                <Layout className="custom-layout">
                                    <AdminHeader>
                                        {/* 渲染Header部分的自定义头部,传入判断用户是否登录状态标记 */}
                                        <CustomHeader />
                                    </AdminHeader>

                                    <AdminContent>
                                        {/* 动态渲染路由 */}
                                        <SwitchRoute />
                                    </AdminContent>

                                    <AdminFooter>
                                        <p>@copyright Wilson 2021</p>
                                    </AdminFooter>
                                </Layout>
                            </Layout>
                        } />
                    </Switch>
                </BrowserRouter>
            </ConfigProvider>
        );
    }
}

ReactDOM.render(<Index />, document.getElementById("root"));
