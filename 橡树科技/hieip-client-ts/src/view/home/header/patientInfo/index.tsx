import { Select } from 'antd'
import React from 'react'
import { IconFont } from 'pkg/common/icon'
import { Images } from 'pkg/common/image/image.tsx'
import { FluxComponent } from 'tools/flux/FluxComponent'
import { loginService, LoginState } from 'service/user/login/index'
import style from '../style/index.scss'

const Option = Select.Option
export default class PatientInfo extends FluxComponent<LoginState> {
    title: string = '菜单页面组件'
    loginService = loginService

    render() {
        const { loginSession } = this.state
        // console.log(loginSession,'loginSession')
        return (
            <div className={style.patientInfo}>
                <Images name={'male'} className={style.userImg}/>
                <Select className={style.roleList}>
                    {loginSession.roleList.map(data => {
                        return <Option key={data.name} value={data.id}>{data.name}</Option>
                    })}
                </Select>
                <div>
                    <IconFont iconClass={style.fontIcon} iconName={'icon-zuixiaohua'}/>
                    <IconFont iconClass={style.fontIcon} iconName={'icon-90'}/>
                </div>
            </div>
        )
    }
}