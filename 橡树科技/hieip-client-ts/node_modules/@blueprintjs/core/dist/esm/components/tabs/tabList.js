/*
 * Copyright 2015 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the terms of the LICENSE file distributed with this project.
 */
import * as tslib_1 from "tslib";
import * as classNames from "classnames";
import * as PureRender from "pure-render-decorator";
import * as React from "react";
import { AbstractComponent } from "../../common/abstractComponent";
import * as Classes from "../../common/classes";
var TabList = (function (_super) {
    tslib_1.__extends(TabList, _super);
    function TabList() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            shouldAnimate: false,
        };
        return _this;
    }
    TabList.prototype.render = function () {
        return (React.createElement("ul", { className: classNames(Classes.TAB_LIST, this.props.className), role: "tablist" },
            React.createElement("div", { className: classNames("pt-tab-indicator-wrapper", { "pt-no-animation": !this.state.shouldAnimate }), style: this.props.indicatorWrapperStyle },
                React.createElement("div", { className: "pt-tab-indicator" })),
            this.props.children));
    };
    TabList.prototype.componentDidUpdate = function (prevProps) {
        var _this = this;
        if (prevProps.indicatorWrapperStyle == null) {
            this.setTimeout(function () { return _this.setState({ shouldAnimate: true }); });
        }
    };
    TabList.displayName = "Blueprint.TabList";
    TabList = tslib_1.__decorate([
        PureRender
    ], TabList);
    return TabList;
}(AbstractComponent));
export { TabList };
export var TabListFactory = React.createFactory(TabList);
