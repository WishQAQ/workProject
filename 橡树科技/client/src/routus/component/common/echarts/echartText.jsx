/**
 * Created by liulingli on 2017/5/22.
 */
import React, {Component} from 'react';
import classNames from 'classnames';

export class EchartText extends Component{
    render(){
        return(
            <div className="card-text">
                {this.props.children}
            </div>
        )

    }
}