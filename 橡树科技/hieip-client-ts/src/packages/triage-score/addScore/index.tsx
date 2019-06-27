import React from 'react'
import styles from './style/index.scss'

export interface AddScoreOptionProps {
    data: any
    dataOption: any
    tags: Array<object>
    tagsOption: object
    methods: any
    judgStyle?: React.CSSProperties
    open?: boolean
    openMethod?: (v: boolean) => void
    classifyStyle?: React.CSSProperties
}

export interface AddScoreOptionState {
    ev: object
}

export class AddScoreOption extends React.Component<AddScoreOptionProps, AddScoreOptionState> {
    constructor(addScoreOptionProps) {
        super(addScoreOptionProps)
        this.state = {
            ev: { X: null, Y: null }
        }
    }

    classifyMethod = (x, v) => {
        let classifyMethod = this.props.methods.classifyMethod
        this.setState({ ev: { X: x.clientX, Y: x.clientY } })
        classifyMethod(v)
    }

    componentWillReceiveProps(props) {
        if (!props.open) {
            this.setState({ ev: { X: null, Y: null } })
        }
    }

    render() {
        let { ev } = this.state
        let {
            data, dataOption, tags, tagsOption, methods, judgStyle, openMethod,
            open, classifyStyle
        } = this.props
        return (
            open ?
                <div>
                    <span className={styles.addScoreMask} onClick={() => openMethod(false)}/>
                    {/* <Classify
                        classify={data.classify}
                        classifyOption={dataOption ? dataOption.classify : []}
                        tags={tags}
                        tagsOption={tagsOption}
                        classifyMethod={this.classifyMethod}
                        onTagClose={methods.onTagClose}
                        onEenter={methods.onEnter}
                        style={classifyStyle}
                    />
                    <JudgmentBasis
                        chiefComplaint={data.chiefComplaint}
                        chiefComplaintOption={dataOption ? dataOption.chiefComplaint : []}
                        chiefComplaintMethod={methods.chiefComplaintMethod}
                        judgmentBasis={data.judgmentBasis}
                        judgmentBasisOption={dataOption ? dataOption.judgmentBasis : []}
                        judgmentBasisMethod={methods.judgmentBasisMethod}
                        onSearch={methods.onSearch}
                        judgStyle={judgStyle}
                        ev={ev}
                    /> */}
                </div> : null
        )
    }
}