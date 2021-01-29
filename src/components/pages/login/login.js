import React from "react";
import { Form, Input, Button, Checkbox, message } from "antd";
import { LoginOutlined, UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./login.less";
import { $post, $path } from "@/api/http.js";

// 导入自定义缓存包
import Storage from "@/utils/storage.js";


class Login extends React.Component {
    // 登录组件页面
    constructor(props) {
        super(props);
        this.handleSubmitSucess = this.handleSubmitSucess.bind(this);
        this.handleSubmitError = this.handleSubmitError.bind(this);
        this.state = {
            loadingArray: [],
            formData: {  // 表单数据
                username: "",  // 用户名
                password: ""  // 密码
            }
        };
    }

    async handleSubmitSucess (values) {
        // 提交表单且数据验证成功后的回调事件
        // 准备调用后台接口进行用户登录
        await $post($path + "/users/login", {
            username: values.username,
            password: values.password
        }).then((res) => {
            switch (res.status_code) {
                case 200:
                    let listData = res.data_info.list_data;  // 获取后台返回信息数据
                    let storage = new Storage();
                    storage.setItem({
                        name: "token",
                        value: listData.access_token,
                        expires: 1000 * 60 * 60 * 4  // 4小时失效期
                    });
                    storage.setItem({
                        name: "user",
                        value: listData,
                        expires: 1000 * 60 * 60 * 4  // 4小时失效期
                    });
                    message.success("登录成功!");
                    this.props.history.push("/home");
                    break;

                default:
                    break;
            }
        });
    }

    handleSubmitError () {
        // 提交表单且数据验证失败后回调事件
        console.log("验证失败");
    }

    render() {
        return (
            <section className="login_frame">
                <h1>登&ensp;录</h1>
                <p className="image_logo"><img src={require("@images/login_tray.png").default} alt="Logo图片" /></p>

                <Form
                    form={this.state.form}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={this.handleSubmitSucess}
                    onFinishFailed={this.handleSubmitError}
                    size="large">
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: "请输入用户名!" },]} >
                        <Input placeholder="请输入用户名" allowClear={ true } prefix={ <UserOutlined /> } />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: "请输入密码!" },]} >
                        <Input.Password placeholder="请输入密码" allowClear={ true } prefix={ <LockOutlined /> } />
                    </Form.Item>

                    <Form.Item
                        valuePropName="checked">
                        <Checkbox style={{ float: "left" }}>记住我</Checkbox>
                        <Button danger type="text" size="small" style={{ float: "right" }}>忘记密码?</Button>
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            shape="round"
                            htmlType="submit"
                            icon={<LoginOutlined />}
                            className="login-form-submit">Log in</Button>
                        Or <Link to="/register">立即注册!</Link>
                    </Form.Item>
                </Form>
            </section>
        );
    }
}

export default Login;
