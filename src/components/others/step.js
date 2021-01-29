import React from "react";
import { Steps, Button, message } from "antd";
import PropTypes from "prop-types";


class CustomStep extends React.Component {
    constructor(props) {
        super(props);
        this.handleNext = this.handleNext.bind(this);
        this.handlePerv = this.handlePerv.bind(this);
        this.handleDone = this.handleDone.bind(this);
        this.state = {
            current: this.props.current
        };
    }

    handleNext () {
        this.setState((state) => ({
            current: state.current + 1
        }));
    }

    handlePerv () {
        this.setState((state) => ({
            current: state.current - 1
        }));
    }

    handleDone () {
        console.log("结束");
        message.success("完成了");
    }

    render () {
        let current = this.state.current;  // 当前步骤编号
        let steps = this.props.steps;  // 步骤信息数组
        return (
            <div>
                <Steps current={current} size="small">
                    {
                        steps.map((item) => (
                            <Steps.Step key={item.id} title={item.title} />
                        ))
                    }
                </Steps>

                {/* 步骤组件内容部分 */}
                <div>{ steps[current].content }</div>

                {/* 步骤组件按钮部分 */}
                <div>
                    {
                        current < steps.length - 1 && (
                            <Button type="primary" onClick={this.handleNext}>
                                下一步
                            </Button>
                        )
                    }

                    {
                        current === steps.length - 1 && (
                            <Button type="primary" onClick={this.handleDone}>
                                完成
                            </Button>
                        )
                    }

                    {
                        current > 0 && (
                            <Button type="primary" onClick={this.handlePerv}>
                                上一步
                            </Button>
                        )
                    }
                </div>
            </div>
        );
    }
}


// 步骤组件类型检查
CustomStep.propTypes = {
    // 步骤组件构成全部步骤的数组,必须且只能传入一个步骤数组对象,并且这个数组中至少有一个对象类型的元素构成
    steps: PropTypes.arrayOf(PropTypes.shape({  // 指定对象元素由哪些键名构成
        id: PropTypes.number.isRequired,  // 必须且只能有一个整数类型的id
        title: PropTypes.string.isRequired,  // 必须且只能有一个字符串类型的title
        // content: PropTypes.elementType.isRequired  // 必须且只能有一个ReactDOM类型的content
        content: PropTypes.isRequired  // 必须且只能有一个ReactDOM类型的content
    })).isRequired,
    // 表示当前步骤组件处于哪个节点, 必须且只能传入一个整数类型对象
    // current: PropTypes.element.isRequired
};


// 步骤组件默认值
CustomStep.defaultProps = {
    current: 0
};


export default CustomStep;
