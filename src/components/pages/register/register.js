import React from "react";
import CustomStep from "@view/others/step.js";
import CustomSelect from "@view/others/select.js";
import "./register.less";
import { Form, Input, message, Radio } from "antd";
// 导入定时器按钮组件
import { ButtonTimer } from "@view/others/timer.js";
// 导入REST API动作方法
import { $fetch, $path } from "@/api/http.js";


class PhoneVerify extends React.Component {
    // 手机验证码表单组件

    constructor(props) {
        super(props);
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
        const vm = this;
        // 获取手机验证码
        let phoneCode = await vm.registerForm.current.getFieldsValue("phone_code");
        // 调用后台手机验证码接口
        await $fetch($path + "/users/get_phone_code", {
            "phone_number": phoneCode.phone_code
        }).then((res) => {
            switch (res.status_code) {
                case 200:
                    message.success("发送成功,请查收");
                    break;

                case 102:
                    message.error("请检查一下手机号是否正确!");
                    break;
            }
        });
        // 调用子组件定时器动画函数
        await vm.registerTimer.current.intervalVerified(event);
    }

    render () {
        return (
            <Form
                labelCol={{span: 6}}
                wrapperCol={{span: 15}}
                ref={this.registerForm}
                className="phone_code_frame"
                name="phone_code">

                <Form.Item
                    name="phone_code"
                    label="手机号"
                    rules={[
                        { required: true, message: "请输入手机号!" },
                        { pattern: /^1[35678]\d{9}$/, message: "手机号错误!" }
                    ]}
                    className="form-phone-code"
                    hasFeedback>
                    <Input
                        type="number"
                        autoFocus={true}
                        addonBefore={<CustomSelect
                            onChange={this.handleCountryChange}
                            selectArray={this.state.selectArray}
                            defaultValue={this.state.defaultValue} />}
                        allowClear maxLength={11} placeholder="请输入手机号" />
                </Form.Item>

                <Form.Item label="验证码">

                    <Form.Item name="verification_code" rules={[
                        { required: true, message: "请输入验证码!" }]} noStyle>
                        <Input allowClear type="number" style={{ width: "10rem" }} maxLength={6} placeholder="请输入验证码" />
                    </Form.Item>

                    {/* 定时器按钮组件 */}
                    <ButtonTimer ref={this.registerTimer} onClick={ this.handleSendPhone } />
                </Form.Item>
            </Form>
        );
    }
}


class BasicInformation extends React.Component {
    // 基本信息组件页面

    constructor(props) {
        super(props);
        this.basicInfoForm = React.createRef();  // 创建ref属性
    }

    render() {
        return (
            <Form
                className="phone_code_frame"
                ref={this.basicInfoForm}
                name="basic_info"
                labelCol={{span: 6}}
                wrapperCol={{span: 15}}>
                <Form.Item
                    name="email"
                    label="邮箱"
                    rules={[
                        { required: true, message: "邮箱不能为空!" },
                        { pattern: /^[a-zA-Z0-9_.+-]+@huawei|h-partners\.com$/, message: "邮箱输入错误!" }
                        ]}
                    hasFeedback>
                    <Input autoFocus={true} placeholder="请输入邮箱" allowClear />
                </Form.Item>

                <Form.Item
                    name="sex"
                    label="性别"
                    required={true}>
                    <Radio.Group>
                        <Radio value="其他">其他</Radio>
                        <Radio value="男">男</Radio>
                        <Radio value="女">女</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item
                    name="name"
                    label="昵称/姓名">
                    <Input placeholder="请输入昵称/姓名" allowClear />
                </Form.Item>
            </Form>
        );
    }

}


class EndCompleted extends React.Component {
    // 最后注册完成页面组件
    constructor(props) {
        super(props);
        this.endCompletedForm = React.createRef();  // 创建ref属性
    }

    render() {
        return (
            <Form
                className="phone_code_frame"
                ref={this.endCompletedForm}
                name="end_completed"
                labelCol={{span: 6}}
                wrapperCol={{span: 15}}>
                <Form.Item
                    name="username"
                    label="用户名"
                    rules={[
                        { required: true, message: "用户名不能为空!" },
                        { pattern: /^([A-Z]+)(?=.*[a-z])(?=.*\d)[a-zA-Z\d]{7,}$/,
                            message: "用户名必须大写字母开头、小写字母、数字,最少8位!" }
                    ]}
                    hasFeedback>
                    <Input autoFocus={true} placeholder="请输入用户名" allowClear />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="密码"
                    rules={[
                        { required: true, message: "密码不能为空!" },
                        { pattern: /^([A-Z]+)(?=.*[a-z])(?=.*\d)[a-zA-Z\d]{7,}$/,
                            message: "密码必须大写字母开头、小写字母、数字,最少8位!" }
                    ]}
                    hasFeedback>
                    <Input.Password  placeholder="请输入密码" allowClear />
                </Form.Item>

                <Form.Item
                    name="confirm_password"
                    label="确认密码"
                    dependencies={["password"]}
                    rules={[
                        { required: true, message: "密码不能为空!" },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue("password") === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject("两个密码不相同,请再次检查一下!");
                            },
                        }),
                    ]}
                    hasFeedback>
                    <Input.Password  placeholder="再次输入密码" allowClear />
                </Form.Item>
            </Form>
        );
    }
}


class Register extends React.Component {
    // 注册页面组件

    constructor(props) {
        super(props);
        this.handleNext = this.handleNext.bind(this);
        this.handlePerv = this.handlePerv.bind(this);
        this.handleDone = this.handleDone.bind(this);
        this.stepRef = React.createRef();
        this.phoneVerifyRef = React.createRef();  // 手机号验证码页面组件
        this.basicInfoRef = React.createRef();  // 基本信息页面组件
        this.endCompletedRef = React.createRef();  // 注册最后页面组件
        this.state = {
            current: 0,
            steps: [
                {
                    id: 1,
                    title: "手机验证",
                    content: <PhoneVerify ref={this.phoneVerifyRef} />
                },
                {
                    id: 2,
                    title: "基本信息",
                    content: <BasicInformation ref={this.basicInfoRef} />
                },
                {
                    id: 3,
                    title: "注册完成",
                    content: <EndCompleted ref={this.endCompletedRef} />
                }
            ],
            formData: {},
            handoverStatus: false
        };
    }

    async handleNext () {
        // 下一步点击函数
        const vm = this;

        if (vm.state.current === 0) {
            // 手机验证页面
            // 获取手机验证页面表单数据
            await vm.phoneVerifyRef.current.registerForm.current.validateFields().then((values) => {
                // 校验成功后的操作
                vm.setState({
                    formData: {
                        "phone_code": values.phone_code,
                        "verification_code": values.verification_code
                    },
                    handoverStatus: true  // 改变页面切换状态
                });
            }).catch(() => {
                vm.setState({
                    handoverStatus: false  // 表单校验错误,不切换页面
                });
                return false;
            });
        } else if (vm.state.current === 1) {
            // 基本信息组件页面
            await vm.basicInfoRef.current.basicInfoForm.current.validateFields().then((values) => {
                vm.setState((state) => {
                    state.formData["email"] = values.email;  // 邮箱
                    state.formData["sex"] = values.sex;  // 性别
                    state.formData["name"] = values.name;  // 昵称/姓名
                    state.handoverStatus = true;
                });
                // 校验成功后的操作
            }).catch(() => {
                // 校验失败后的操作
                vm.setState({
                    handoverStatus: false  // 表单校验错误,不切换页面
                });
            });
        } else if (vm.state.current === 2) {
            // 最后注册完成页面组件
            await vm.endCompletedRef.current.endCompletedForm.current.validateFields().then((values) => {
                vm.setState((state) => {
                    state.formData["username"] = values.username;  // 用户名
                    state.formData["password"] = values.password;  // 密码
                    state.formData["confirm_password"] = values.confirm_password;  // 确认密码
                    // state.handoverStatus = true;
                });
            }).catch(() => {
                // 校验失败后的操作
                vm.setState({
                    handoverStatus: false  // 表单校验错误,不切换页面
                });
            });
        }

        // 允许切换下一页
        if (vm.state.handoverStatus) {
            await vm.setState((state) => ({
                current: state.current + 1
            }));
            // 调用步骤条变更步骤函数
            await vm.stepRef.current.handleChangeCurrent(vm.state.current);
            vm.setState({
                handoverStatus: false
            });
        }
    }

    async handlePerv () {
        // 上一步点击函数
        const vm = this;

        await vm.setState((state) => ({
            current: state.current - 1
        }));

        // 调用步骤条变更步骤函数
        await vm.stepRef.current.handleChangeCurrent(vm.state.current);
    }

    async handleDone () {
        console.log("结束");
        message.success("完成了");
    }

    render () {
        return (
            <section className="register_frame">
                <h1 className="frame_title">注&ensp;册</h1>
                <p className="image_logo"><img src={require("@images/login_tray.png").default} alt="Logo图片" /></p>
                <CustomStep
                    ref={ this.stepRef }
                    handleNext={ this.handleNext }
                    handlePerv={ this.handlePerv }
                    handleDone={ this.handleDone }
                    steps={this.state.steps}
                    current={this.state.current} />
            </section>
        );
    }
}

export {
    Register
};
