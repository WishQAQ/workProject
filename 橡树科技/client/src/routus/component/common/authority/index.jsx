import React from "react";
import {User} from "core";
class Authority extends React.Component {
    constructor() {
        super();
        this.state = {
            baseName: '',//基础名
            lastName: '',//末名
            isAnd: '',//是否取并集判断
            back: false,//判断返回值
            lock: false,
        }
    }

    componentWillMount() {
        let next = this.props;
        if (next.isAnd !== undefined && next.baseName !== undefined
            && next.lastName !== undefined) {
            this.setState({
                baseName: next.baseName,
                lastName: next.lastName,
                isAnd: next.isAnd,
            }, () => {
                let back = this.judge(this.state.baseName, this.state.lastName, this.state.isAnd);
                this.setState({
                    back: back
                })
            })
        }
    }

    componentWillReceiveProps(next) {
        if (next.isAnd !== undefined && next.baseName !== undefined
            && next.lastName !== undefined) {
            this.setState({
                baseName: next.baseName,
                lastName: next.lastName,
                isAnd: next.isAnd,
            }, () => {
                let back = this.judge(this.state.baseName, this.state.lastName, this.state.isAnd);
                this.setState({
                    back: back
                })
            })
        }
    }

    judge = (base, last, isAnd) => {
        let data = JSON.parse(User.getGrant());
        const res = [];
        for (let i = 0; i < data.length; i++) {   //该用户所有的权限
            const datas = data[i];
            if (datas.code.startsWith(base)) {
                if (!Array.isArray(last)) last = [last];
                for (let j = 0; j < last.length; j++) {
                    const lastName = last[j];
                    if (datas.code.length === base.length + lastName.length && datas.code.endsWith(lastName)) {
                        res[j] = true;
                    }
                }
            }
        }

        //判断一真显示或一假显示
        if (isAnd) {
            let leng = 0;
            res.find(x => {
                if (x === true) leng++;
            });
            return leng >= last.length
        } else if (!isAnd || isAnd === '') {
            return res.indexOf(true) >= 0
        }
    };


    render() {
        return this.state.back ? this.props.children : false;
    }
}


export default Authority;