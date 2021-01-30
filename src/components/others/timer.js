import React from "react";
import { Button } from "antd";


class ButtonTimer extends React.Component {
    // 按钮定时器组件
    constructor (props) {
        super(props);
        this.intervalVerified = this.intervalVerified.bind(this);
        this.countdown = this.countdown.bind(this);

        this.state = {
            btnClickStatus: true,
            desTime: 59,  // 倒计时变量
            loading: false
        };
    }

    async intervalVerified (event) {
        let vm = this;
        // 发送验证码点击事件
        await vm.setState({
            loading: true,  // 按钮加载动画
            btnClickStatus: false  // 按钮是否被点击
        });

        event.preventDefault();  // 禁止事件冒泡
        if (vm.state.desTime !== 0) {
            await vm.countdown();
        }
    }

    async countdown () {
        // 定时器函数
        let vm = this;
        let { desTime } = vm.state;
        let timer = await setInterval(() => {
            // 修改倒计时变量
            vm.setState({
                desTime: desTime--
            }, () => {
                // 回调函数,判断倒计时变量,清除定时器
                if (desTime < 0) {
                    clearInterval(timer);  // 清除定时器
                    // 关闭loading加载动画,还原倒计时变量,还原按钮文字信息
                    vm.setState({
                        loading: false,
                        desTime: 59,
                        btnClickStatus: true
                    });
                }
            });
        }, 1000);
    }

    render () {
        return (
            <Button
                loading={ this.state.loading }
                shape="round"
                disabled={ !this.state.btnClickStatus }
                onClick={ this.props.onClick }>
                {
                    this.state.btnClickStatus ? "发送验证码" : this.state.desTime + "秒"
                }
            </Button>
        );
    }
}


function noop () {
    console.log();
}


ButtonTimer.defaultProps = {
    onClick: noop
};


export {
    ButtonTimer
};
