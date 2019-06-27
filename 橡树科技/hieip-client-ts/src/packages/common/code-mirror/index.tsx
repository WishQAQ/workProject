import { Controlled as CodeMirror } from 'react-codemirror2'
import React from 'react'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import 'codemirror/theme/hopscotch.css'

require('codemirror/mode/sql/sql.js')

export class MyCodeMirror extends React.Component<any, any> {
    constructor(props) {
        super(props)
        this.state = {
            options: {
                lineNumbers: true,
                mode: 'text/x-sql',
                identUnit: 2,
                tabSize: 2,
                theme: 'hopscotch'
            }
        }
    }

    render() {
        const { onChange, fixedSql } = this.props
        return (
            <CodeMirror
                autoFocus={true}
                autoScroll={true}
                options={this.state.options}
                value={fixedSql}
                onBeforeChange={onChange}
            />
        )
    }
}