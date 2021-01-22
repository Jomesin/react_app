import React from "react";
import { Row, Col, Image, Button, Avatar } from "antd";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import "./body.less";


class CustomHeader extends React.Component {
    constructor(props) {
        super(props);
        // 自定义函数需要在初始化函数中绑定this对象,否则无法访问state
        this.handleUserLogout = this.handleUserLogout.bind(this);

        this.state = {
            userName: "JISO",
            userImg: "http://image.hw3static.com/tiny-lts/v1/images/38cd024e68ab5f49d0e8_145x145.jpg"
        };
    }

    async handleUserLogout () {
        console.log("用户登出成功!");
        let isLoginStatus = this.props.isLoginStatus;

        // 如果用户已经登录了
        if (isLoginStatus) {
            // 设置登出状态,方法是异步方法,所以需要使用await阻塞
            await this.props.changeLoginStatus(isLoginStatus);
            // 跳转路由
            this.props.history.push("/login");
        }
    }

    render () {
        return (
            <div className="header_login">
                <Row className="header_top">
                    <Col span={4} className="header_top_title">
                        <span>XXX测试系统</span>
                    </Col>
                    <Col span={16} className="header_top_middle">

                    </Col>
                    <Col span={4} className="header_top_user">
                        <Avatar src={<Image src={this.state.userImg} alt="头像"/>}></Avatar>
                        <span>欢迎回来，{this.state.userName}</span>
                        &nbsp;&nbsp;
                        <Button type="primary" shape="round" onClick={this.handleUserLogout} size="small">退出</Button>
                    </Col>
                </Row>
                <Row className="header_bottom" wrap={false}>

                </Row>
            </div>
        );
    }
}

CustomHeader.propTypes = {
    isLoginStatus: PropTypes.bool  // 限制父组件传入的值必须要为布尔值
};

// 因为该组件不在Route组件包裹,所以无法读取this.props.history的值,必须要使用withRouter
export default withRouter(CustomHeader);
