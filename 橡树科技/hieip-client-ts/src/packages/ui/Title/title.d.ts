import React from 'react'

interface IconLabelType {
    values?: string,
    iconName?: string
    key?: string
}

export interface ItitleProps {
    cardTitle?: string | React.ReactNode
    btnGroup?: IconLabelType[],

    [propName: string]: any
}
