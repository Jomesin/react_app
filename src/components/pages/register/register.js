import React from "react";
import CustomStep from "@view/others/step.js";
import CustomSelect from "@view/others/select.js";
import "./register.less";
import { Form, Input, Button } from "antd";


class PhoneVerify extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleCountryChange = this.handleCountryChange.bind(this);
        this.intervalVerified = this.intervalVerified.bind(this);
        this.state = {
            selectArray: [
                {name: "+86", value: "+86"},
                {name: "+1", value: "+1"}
            ],
            defaultValue: "+86",
            btnClickStatus: true,
            desTime: 60,  // 倒计时变量
            loading: false
        };
    }

    handleClick () {
        console.log("点击");
    }

    handleCountryChange (value) {
        // 国家电话代码选择框
        console.log(value, "------");
    }

    async intervalVerified (event) {
        // 发送验证码点击事件
        await this.setState({
            loading: true
        });
        event.preventDefault();  // 禁止事件冒泡
    }

    // 手机验证码表单组件
    render () {
        return (
            <Form className="phone_code_frame" name="phone_code" onFinish={this.handleClick}>
                <Form.Item name="phone_code" label="手机号" rules={[{ required: true }]} className="form-phone-code">
                    <Input
                        addonBefore={<CustomSelect
                            onChange={this.handleCountryChange}
                            selectArray={this.state.selectArray}
                            defaultValue={this.state.defaultValue} />}
                        allowClear placeholder="请输入手机号" />
                </Form.Item>

                <Form.Item label="验证码">
                    <Form.Item name="verification_code" rules={[{ required: true }]} noStyle>
                        <Input style={{ width: "10rem" }} placeholder="请输入手机号" />
                    </Form.Item>
                    <Button
                        loading={this.state.loading}
                        shape="round"
                        disabled={this.state.btnClickStatus ? false : true}
                        onClick={ this.intervalVerified }>
                        {
                            this.state.btnClickStatus ? "发送验证码" : this.state.desTime + "秒"
                        }</Button>
                </Form.Item>
            </Form>
        );
    }
}


class Register extends React.Component {
    constructor(porps) {
        super(porps);
        this.state = {
            current: 0,
            steps: [
                {
                    id: 1,
                    title: "手机验证",
                    content: <PhoneVerify />
                },
                {
                    id: 2,
                    title: "基本信息",
                    content: <div>基本信息填写表单组件</div>
                },
                {
                    id: 3,
                    title: "注册完成",
                    content: <div>注册完成倒计时提示页面组件</div>
                }
            ]
        };
    }

    render () {
        return (
            <section className="register_frame">
                <h1>注&ensp;册</h1>
                <p className="image_logo"><img src={require("@images/login_tray.png").default} alt="Logo图片" /></p>
                <CustomStep steps={this.state.steps} />
            </section>
        );
    }
}

export {
    Register
};
