//多选组件
import React from "react";
import SelectField from "material-oak/SelectField";
import MenuItem from "material-oak/MenuItem";


let value;
export class MulSelect extends React.Component {
    state = {
        event: {},
        index: null,
        values: [],
        id: [],
        item: [],
    };

    menuItems(values) {
        return this.state.item.map((name, key) => (
            <MenuItem
                key={name.hospitalNo}
                insetChildren={true}
                checked={values && values.indexOf(name.abbreviation) > -1}
                value={name.abbreviation}
                primaryText={name.abbreviation}
                onClick={this.changeValue.bind(this, name.abbreviation, name.hospitalNo)}
            />
        ));
    }

    componentWillMount() {
        this.setState({item: this.props.item, values: this.props.oValue})
    }

    componentWillReceiveProps(data) {
        if (data) {
            this.setState({item: data.item, values: data.oValue});
        }
    }

    changeValue = (name, id) => {
        value = name;
        let {event, index, values} = this.state;
        let isC = false;
        this.state.id.map((x, k) => {
            if (x === id) {
                this.state.id.splice(k, 1);
                isC = true;
                return true
            }
        });
        if (!isC) {
            this.state.id.push(id);
            this.state.id = Array.from(new Set(this.state.id))
        }
        this.props.select(event, index, values, value, this.state.id)
    };
    select = (event, index, values) => {
        this.setState({event: event.target.innerText, index: index, values: values})
    };

    render() {
        let {selectMultiple,multiple} = this.props;
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
                {this.menuItems(this.state.values)}
            </SelectField>
        )
    }
}