/**
 * Created by liulingli on 2017/5/22.
 */
import React, {Component} from 'react';
import classNames from 'classnames';

export class EchartHeader extends Component{

    render(){
        const {title,buttons,children,...other} = this.props;
        return(
            <div className="card-header">
                <h2>{title}</h2>
                <div className="card-header-buttons">
                    {children}
                </div>
            </div>
        )
    }
}