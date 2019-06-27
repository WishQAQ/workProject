//单选组件
import React from "react";
import SelectField from "material-oak/SelectField";
import MenuItem from "material-oak/MenuItem";


export class SinSelect extends React.Component {
    state = {};


    componentWillMount() {
        this.setState({item: this.props.item, values: this.props.oValue})
    }

    componentWillReceiveProps(data) {
        if (data) {
            this.setState({item: data.item, values: data.oValue});
        }
    }

    select = (event, index, values) => {
        this.props.select(event,'',values)
    };

    render() {
        let {selectMultiple, multiple} = this.props;
        return (
            <SelectField
                multiple={multiple}
                hintText=" "
                value={this.state.values}
                onChange={this.select}
                style={selectMultiple && selectMultiple[0].style}
                labelStyle={selectMultiple && selectMultiple[0].labelStyle}
                iconStyle={selectMultiple && selectMultiple[0].iconStyle}
                underlineStyle={selectMultiple && selectMultiple[0].underlineStyle}
                hintStyle={selectMultiple && selectMultiple[0].hintStyle}
                autoWidth={false}
            >
                {this.state.item.map((row, index) =>
                    <MenuItem
                        key={row.No}
                        value={row.No}
                        primaryText={row.text}
                    />
                )}
            </SelectField>
        )
    }
}