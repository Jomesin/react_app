import { Select } from "antd";
import React from "react";


class CustomSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectArray: props.selectArray,
            defaultValue: props.defaultValue
        };
    }

    render () {
        return (
            <Select
                defaultValue={this.state.defaultValue}
                onChange={this.props.onChange}>
                {
                    this.state.selectArray.map((item, index) => {
                        return (<Select.Option key={index} value={item.value}>{item.name}</Select.Option>);
                    })
                }
            </Select>
        );
    }
}


function noop () {  // 空函数默认值
    console.log();
}


function className () {
    return {};
}


CustomSelect.defaultProps = {
    defaultValue: "+86",
    onChange: noop,
    className: className
};


export default CustomSelect;
