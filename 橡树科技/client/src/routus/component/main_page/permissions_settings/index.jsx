/**
 * description:权限设置
 * author: mou
 * time:2018-1-6
 */
import React from 'react'
import {PeopleHospitalInfo} from './content/people_hospital_info2'
import {RoleInfo} from './content/roleInfo'
import {MenuDict} from './content/menu_dict'
import {PermissionPoint} from './content/per_point'
import css from './style/content/permissions_settings.scss'
export class PermissionsSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (<div className={css.permissions}>
      <div>
        <PeopleHospitalInfo/>
      </div>
      <div>
        <RoleInfo/>
        <div className={css.menuAndPermission}>
          <MenuDict/>
          <PermissionPoint/>
        </div>
      </div>
    </div>)
  }

}
 
 
 