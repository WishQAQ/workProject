import React from 'react'
import styles from './style/index.scss'

interface CardItemProps {
    title: string
    value?: string | number
}

const CardItem = function (props) {
    return (
        <span className={styles.itemTitle}>
      {props.title}: <span className={styles.itemVal}>{props.value}</span>
    </span>
    )
}

export default CardItem
