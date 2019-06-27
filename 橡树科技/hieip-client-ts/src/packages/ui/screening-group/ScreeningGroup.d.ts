import React from 'react'

type currentPatientType = 'allPatient' | 'myPatient'
type patientInfoType = {
    key: string;
    name: string;
    count: number;
}

/**
 *
 * 筛选按钮组props接口
 *
 */
export interface ScreeningGroupProps {
    patientNum?: Array<patientInfoType>
    patientlevel?: Array<patientInfoType>
    patientPartition?: Array<patientInfoType>

    [propName: string]: any

    style?: React.CSSProperties
    className?: string
    onSearch: (v: string) => void
    methods: Methods
}

export interface Methods {
    patientNum: (v: any) => void
    patientLevel: (v: any) => void
    patientPartition: (v: any) => void
}

/**
 *
 * 筛选按钮组state接口
 *
 */
export interface ScreeningGroupState {
    currentPatient: currentPatientType

    [propName: string]: any
}
