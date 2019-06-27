/**
 * 新分诊多选按钮
 */
import React from 'react'
import { Tag } from 'antd'
import styles from './style/index.scss'

const CheckableTag = Tag.CheckableTag

type itemTag = {
    key?: string;
    value?: string;
}

export interface TagGroupProps {
    selectedTags?: Array<string>,
    allItems?: Array<itemTag>,
    onChange?: (e: any) => any
}

export interface TagGroupState {
    selectedTags?: Array<string>
}

export default class CustomTagGroup extends React.Component<TagGroupProps, TagGroupState> {
    constructor(props) {
        super(props)
        this.state = {
            selectedTags: []
        }
    }

    componentWillMount() {
        const { selectedTags } = this.props
        if (selectedTags) {
            this.setState({ selectedTags })
        }
    }

    componentWillReceiveProps(nextProps) {
        const { selectedTags } = nextProps
        if (selectedTags) {
            this.setState({ selectedTags })
        }
    }

    render() {
        const { allItems } = this.props
        const { selectedTags } = this.state
        return (
            <div className={styles.tagGroup}>
                {
                    allItems.map(item => {
                        return (<CheckableTag
                            key={item.key}
                            checked={selectedTags.indexOf(item.key) !== -1}
                            onChange={(checked) => this.onHandleChange(item.key, checked)}
                        >
                            {item.value}
                        </CheckableTag>)
                    })
                }
            </div>
        )
    }

    private onHandleChange = (tag, checked) => {
        const { selectedTags } = this.state
        const newSelectTags = checked ?
            [...selectedTags, tag]
            :
            selectedTags.filter(item => item !== tag)
        this.setState({ selectedTags: newSelectTags })
        this.props.onChange(newSelectTags)
    }
}