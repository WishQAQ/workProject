/**
 * description: ag表格筛选排序
 * author: mou
 * time:  2017-11-7
 */
import React from "react"

function MyHeaderComponent() {

}

MyHeaderComponent.prototype.init = function (agParams) {
    this.agParams = agParams;
    this.eGui = document.createElement('div');
    this.eGui.className = agParams.id;
    let htmlE = '' + '<div class="customHeaderMenuButton"><i class="icon iconfont size">&#xe605;</i></div>' +
        '<div class="customHeaderLabel">' + this.agParams.displayName + '</div>' +
        '<div class="sortSty"><div class="customSortDownLabel inactive"><i class="icon iconfont size">↓</i></div>' +
        '<div class="customSortUpLabel inactive"><i class="icon iconfont size">↑</i></div>' +
        '<div class="customSortRemoveLabel inactive"></div>' +
        '</div><div class="hidden drop"></div><div class="mask"></div>';
    this.eGui.innerHTML = htmlE;
    this.eMenuButton = this.eGui.querySelector(".customHeaderMenuButton");
    this.eSortDownButton = this.eGui.querySelector(".customSortUpLabel");
    this.eSortUpButton = this.eGui.querySelector(".customSortDownLabel");
    this.eSortRemoveButton = this.eGui.querySelector(".customSortRemoveLabel");
    this.checkBox = this.eGui.querySelector('.hidden');
    this.mask = this.eGui.querySelector('.mask');
    let html = '';
    let myType = agParams.myType;
    this.home = this.eGui.ownerDocument.children[0].children[1].children[1].children[0];//找到home
    if (agParams.data) {
        for (let i = 0; i < agParams.data.length; i++) {
          //  html += '<p><input name="' + myType + '" type="checkbox" id="' + agParams.id + agParams.data[i] + '" class="checkbox" value="' + agParams.data[i] + '"><label for="' + agParams.id + agParams.data[i] + '">' + agParams.data[i] + '</label></p>';
           html += '<label><input name="' + myType + '" type="checkbox" id="' + agParams.id + agParams.data[i] + '" class="checkbox" value="' + agParams.data[i] + '"><span></span>' + agParams.data[i] + '</label>';
        }
    }
    this.checkBox.innerHTML = html;
    this.homeClick = this.maskClick.bind(this);
    this.mask.addEventListener('click', this.homeClick);//整个页面点击事件
    if (this.agParams.enableMenu) {
        this.onMenuClickListener = this.onMenuClick.bind(this, this.eGui.className);
        this.eMenuButton.addEventListener('click', this.onMenuClickListener);
    } else {
        this.eGui.removeChild(this.eMenuButton);
    }

    if (this.agParams.enableSorting) {
        this.onSortAscRequestedListener = this.onSortRequested.bind(this, 'asc');
        this.eSortDownButton.addEventListener('click', this.onSortAscRequestedListener);
        this.onSortDescRequestedListener = this.onSortRequested.bind(this, 'desc');
        this.eSortUpButton.addEventListener('click', this.onSortDescRequestedListener);
        this.onRemoveSortListener = this.onSortRequested.bind(this, '');
        this.eSortRemoveButton.addEventListener('click', this.onRemoveSortListener);


        this.onSortChangedListener = this.onSortChanged.bind(this);
        this.agParams.column.addEventListener('sortChanged', this.onSortChangedListener);
        this.onSortChanged();
    } else {
        this.eGui.removeChild(this.eSortDownButton);
        this.eGui.removeChild(this.eSortUpButton);
        this.eGui.removeChild(this.eSortRemoveButton);
    }
};
MyHeaderComponent.prototype.maskClick = function () {
    this.mask.className = 'mask';
    this.checkBox.className = 'hidden'
};
MyHeaderComponent.prototype.checkboxnum = function (className) {
    //单选
    /*  let value;
     if (e.target.checked) {
     value = e.target.value
     } else {
     value = ''
     }
     this.agParams.api.setQuickFilter(value);*/
    //多选
    let classN = document.querySelectorAll('.' + className);
    let agParams = this.agParams;
    let c = agParams.cheNum;
    let inputCheck = [];
    for (let x = 0; x < classN.length; x++) {
        let qsa = classN[x].querySelectorAll('.checkbox');
        Object.keys(qsa).map(x => {
            inputCheck.push(qsa[x]);
        })
    }
    for (let k = 0; k < inputCheck.length; k++) {
        inputCheck[k].onclick = function (e) {
            let checked = e.target.checked;
            //判断是否选中
            if (checked) {
                c++;//有几个被选中
                agParams.cheNum = c;
              this.parentNode.className='labelActive'
            } else {
                c--;
                agParams.cheNum = c;
              this.parentNode.className=''
            }

            let type = agParams.type;//filed
            let name = [], nameLg = 0;
            for (let y in type) {//遍历type类
                let xy = type[y];
                for (let p in inputCheck) {//遍历选中的
                    if (inputCheck[p].name === xy && inputCheck[p].checked) {//name与类相同并且选中
                        if (name[xy]) {
                            name[xy].push(inputCheck[p].value)
                        } else {
                            name[xy] = [];
                            name[xy].push(inputCheck[p].value);
                            nameLg++
                        }
                    }
                }
            }
            if (nameLg === 0) {
                agParams.api.setRowData(agParams.rowData);
                return
            }

            let data = [];
            for (let i = 0; i < agParams.rowData.length; i++) {//遍历表数据
                let val = agParams.rowData[i];//当前行
                let sz = null, lex = 0;
                for (let t in type) {//遍历列名
                    let lx = type[t];//列名
                    for (let n in name[lx]) {//遍历类型数组所有的值
                        if (val[lx] === name[lx][n]) {//当前行列的值与选中的对应列数组的值相等
                            lex++;
                            sz = val;
                            break
                        }
                    }
                }
                if (lex === nameLg) {
                    data.push(sz)
                }
            }
            agParams.api.setRowData(data);
        }
    }
};
MyHeaderComponent.prototype.onGridReady = function (params) {
    this.gridApi = params.api;
};
MyHeaderComponent.prototype.onSortChanged = function () {
    function deactivate(toDeactivateItems) {
        toDeactivateItems.forEach(function (toDeactivate) {
            toDeactivate.className = toDeactivate.className.split(' ')[0]
        });
    }

    function activate(toActivate) {
        toActivate.className = toActivate.className + " active";
    }

    if (this.agParams.column.isSortAscending()) {
        deactivate([this.eSortUpButton, this.eSortRemoveButton]);
        activate(this.eSortDownButton)
    } else if (this.agParams.column.isSortDescending()) {
        deactivate([this.eSortDownButton, this.eSortRemoveButton]);
        activate(this.eSortUpButton)
    } else {
        deactivate([this.eSortUpButton, this.eSortDownButton]);
        activate(this.eSortRemoveButton)
    }
};

MyHeaderComponent.prototype.getGui = function () {
    return this.eGui;
};

MyHeaderComponent.prototype.onMenuClick = function (className) {
    let show = document.querySelector('.show');
    if (show)
        show.className = 'hidden';
    if (this.checkBox.className === 'show') {
        this.checkBox.className = 'hidden'
    } else {
        this.checkBox.className = 'show';
        this.mask.className = 'maskShow'
    }
    this.checkboxnum(className);
    //   this.agParams.showColumnMenu(this.eMenuButton);
};
MyHeaderComponent.prototype.onChange = function () {
    //  this.agParams.showColumnMenu(this.eMenuButton);
};
MyHeaderComponent.prototype.onSortRequested = function (order, event) {
    this.agParams.setSort(order, event.shiftKey);
};

MyHeaderComponent.prototype.destroy = function () {
    if (this.onMenuClickListener) {
        this.eMenuButton.removeEventListener('click', this.onMenuClickListener)
    }
    this.eSortDownButton.removeEventListener('click', this.onSortRequestedListener);
    this.eSortUpButton.removeEventListener('click', this.onSortRequestedListener);
    this.eSortRemoveButton.removeEventListener('click', this.onSortRequestedListener);
    this.agParams.column.removeEventListener('sortChanged', this.onSortChangedListener);
};

export default MyHeaderComponent;
