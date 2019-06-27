import * as React from 'react'
import * as css from './style/soceitem.scss'
import { ScorePage } from './socre/scorepage'
import { Drawer } from '../common/Drawer'

export class TriageScore extends React.Component<any, any> {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,
            active: 1
        }
    }

    /**
     * @returns {any}
     */
    render(): JSX.Element {
        return (
            <div className={css.score_trem}>
                <Drawer
                    open={this.state.isOpen}
                    position="right"
                >
                    <ScorePage/>
                </Drawer>
                <button onClick={() => this.onSetSidebarOpen(true)}>open</button>
            </div>
        )
    }

    private onSetSidebarOpen = (open) => {
        this.setState({ isOpen: open })
    }
}