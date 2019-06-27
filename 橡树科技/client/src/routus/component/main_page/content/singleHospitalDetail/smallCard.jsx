import  React from "react";
import classNames from "classnames";
import {OakIcon} from '../../../common/counterWidget/oakIcon';
export  class SmallCard  extends React.Component{
    render(){
        let {title,imgClassName,value,className}=this.props;
        return (
            <div className={classNames("small-card", className)}>
                <div className={classNames("card-img iconfont", imgClassName)}/>
                <div className="card-content">
                    <span className="card-title">
                        {title}
                    </span>
                    <span className="card-value">
                        {value}
                    </span>
                </div>
            </div>
        )
    }
}
