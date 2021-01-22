import React from "react";
import { Menu } from "antd";
import { Link, Switch, Route } from "react-router-dom";

class CustomMenu extends React.Component {
    // 动态渲染菜单组件
    constructor(props) {
        super(props);
        this.state = {
            menuData: [
                {
                    title: "用户列表", // 标题
                    icon: "apple-out-lined", // 图标
                    id: 1, // 菜单数据表主键
                    isExistenceChildren: true, // 是否存在子菜单
                    childrenList: []
                }
            ]
        };
    }

    render() {
        // 渲染菜单栏,遍历菜单项,如果存在子菜单项渲染,没有就不渲染
        return (
            <Menu theme="dark" style={{ width: 200 }} mode="inline">
                {this.state.menuData.map((item) => {
                    return (
                        <Menu.SubMenu key={item.id} title={item.title}>
                            {item.isExistenceChildren
                                ? item.childrenList.map((chilrenItem) => {
                                      return (
                                          <Menu.Item key={chilrenItem.id}>
                                              {chilrenItem.title}
                                              <Link to={chilrenItem.path} />
                                          </Menu.Item>
                                      );
                                  })
                                : ""}
                        </Menu.SubMenu>
                    );
                })}
            </Menu>
        );
    }
}

class SwitchRoute extends React.Component {
    // 动态渲染路由组件
    constructor(props) {
        super(props);
        this.state = {
            routeData: [
                {
                    id: 2,
                    path: "/",
                    filePath: "home/home.js"
                }
            ]
        };
    }

    render() {
        return (
            <Switch>
                {this.state.routeData.map((item) => {
                    return (
                        <Route
                            exact
                            key={item.id}
                            path={item.path}
                            component={
                                require(`../components/pages/${item.filePath}`)
                                    .default
                            }
                        />
                    );
                })}
            </Switch>
        );
    }
}

export { CustomMenu, SwitchRoute };
