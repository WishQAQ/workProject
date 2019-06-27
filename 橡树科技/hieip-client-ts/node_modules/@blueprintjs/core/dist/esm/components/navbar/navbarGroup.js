/**
 * Copyright 2017 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the terms of the LICENSE file distributed with this project.
 */
import * as tslib_1 from "tslib";
import * as classNames from "classnames";
import * as PureRender from "pure-render-decorator";
import * as React from "react";
import * as Classes from "../../common/classes";
// this component is simple enough that tests would be purely tautological.
/* istanbul ignore next */
var NavbarGroup = (function (_super) {
    tslib_1.__extends(NavbarGroup, _super);
    function NavbarGroup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NavbarGroup.prototype.render = function () {
        var _a = this.props, align = _a.align, children = _a.children, propsClassName = _a.className, htmlProps = tslib_1.__rest(_a, ["align", "children", "className"]);
        var className = classNames(Classes.NAVBAR_GROUP, (_b = {},
            _b[Classes.ALIGN_LEFT] = align === "left",
            _b[Classes.ALIGN_RIGHT] = align === "right",
            _b), propsClassName);
        return (React.createElement("div", tslib_1.__assign({ className: className }, htmlProps), children));
        var _b;
    };
    NavbarGroup.displayName = "Blueprint.NavbarGroup";
    NavbarGroup.defaultProps = {
        align: "left",
    };
    NavbarGroup = tslib_1.__decorate([
        PureRender
    ], NavbarGroup);
    return NavbarGroup;
}(React.Component));
export { NavbarGroup };
