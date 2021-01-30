import React from "react";
import CustomStep from "@view/others/step.js";
import CustomSelect from "@view/others/select.js";
import "./register.less";
import { Form, Input } from "antd";
// 导入定时器按钮组件
import { ButtonTimer } from "@view/others/timer.js";
// 导入REST API动作方法
import { $fetch, $path } from "@/api/http.js";


class PhoneVerify extends React.Component {
    constructor(props) {
        super(props);
        // this.handleClick = this.handleClick.bind(this);
        this.handleCountryChange = this.handleCountryChange.bind(this);
        this.handleSendPhone = this.handleSendPhone.bind(this);
        this.registerTimer = React.createRef();  // 创建ref属性
        this.registerForm = React.createRef();  // 创建ref属性
        this.state = {
            selectArray: [
                {name: "+86", value: "+86"},
                {name: "+1", value: "+1"}
            ],
            defaultValue: "+86"
        };
    }

    handleCountryChange (value) {
        // 国家电话代码选择框
        console.log(value, "------");
    }

    async handleSendPhone (event) {
        let vm = this;
        // 获取手机验证码
        let phoneCode = await vm.registerForm.current.getFieldsValue("phone_code");
        // 调用后台手机验证码接口
        await $fetch($path + "/users/get_phone_code", {
            phone_number: phoneCode.phone_code
        }).then((res) => {
            console.log(res, "------");
        });

        // 调用子组件定时器动画函数
        await vm.registerTimer.current.intervalVerified(event);


    }

    // 手机验证码表单组件
    render () {
        return (
            <Form
                ref={this.registerForm}
                className="phone_code_frame"
                name="phone_code">

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

                    {/* 定时器按钮组件 */}
                    <ButtonTimer ref={this.registerTimer} onClick={ this.handleSendPhone } />
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
                <h1 className="frame_title">注&ensp;册</h1>
                <p className="image_logo"><img src={require("@images/login_tray.png").default} alt="Logo图片" /></p>
                <CustomStep steps={this.state.steps} />
            </section>
        );
    }
}

export {
    Register
};
