import * as React from 'react'
import { render } from 'react-dom'
import { HintInput } from 'pkg/common/input'
import 'antd/dist/antd.less'

export class TriageScore extends React.Component<any, any> {
    constructor(props) {
        super(props)
        this.state = {
            value: ''
        }
    }

    render(): JSX.Element {
        return (
            <div>
                <HintInput
                    // placeholder="hint inpi search"

                    defaultValue={'1'}
                    value={this.state.value}
                    style={{ width: 200, margin: 50 }}
                    onChange={this.onChange}
                />
            </div>
        )
    }

    private onChange = (e) => {
        this.setState({ value: e.target.value })
    }
}

render(<TriageScore/>, document.getElementById('root'))