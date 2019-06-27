/*
 * Copyright 2017 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the terms of the LICENSE file distributed with this project.
 */
import * as tslib_1 from "tslib";
import * as classNames from "classnames";
import * as PureRender from "pure-render-decorator";
import * as React from "react";
import * as Classes from "../../common/classes";
var Tab2 = (function (_super) {
    tslib_1.__extends(Tab2, _super);
    function Tab2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // this component is never rendered directly; see Tabs2#renderTabPanel()
    /* istanbul ignore next */
    Tab2.prototype.render = function () {
        var _a = this.props, className = _a.className, panel = _a.panel;
        return (React.createElement("div", { className: classNames(Classes.TAB_PANEL, className), role: "tablist" }, panel));
    };
    Tab2.defaultProps = {
        disabled: false,
        id: undefined,
    };
    Tab2.displayName = "Blueprint.Tab2";
    Tab2 = tslib_1.__decorate([
        PureRender
    ], Tab2);
    return Tab2;
}(React.Component));
export { Tab2 };
export var Tab2Factory = React.createFactory(Tab2);
