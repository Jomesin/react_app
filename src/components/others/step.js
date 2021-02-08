import React from "react";
import { Steps, Button } from "antd";
import PropTypes from "prop-types";


class CustomStep extends React.Component {
    constructor(props) {
        super(props);
        this.handleChangeCurrent = this.handleChangeCurrent.bind(this);
        this.state = {
            current: this.props.current
        };
    }

    async handleChangeCurrent (current) {
        // 变更步骤页当前页
        const vm = this;
        await vm.setState({
            current: current
        });
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
                <div style={{ padding: "2.5rem 1rem" }}>
                    {
                        current < steps.length - 1 && (
                            <Button type="primary" onClick={this.props.handleNext}>
                                下一步
                            </Button>
                        )
                    }

                    {
                        current === steps.length - 1 && (
                            <Button type="primary" onClick={this.props.handleDone}>
                                完成
                            </Button>
                        )
                    }

                    {
                        current > 0 && (
                            <Button type="primary" onClick={this.props.handlePerv}>
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


function noop () {
    console.log();
}


// 步骤组件默认值
CustomStep.defaultProps = {
    current: 0,
    handleNext: noop,
    handleDone: noop,
    handlePerv: noop
};


export default CustomStep;
