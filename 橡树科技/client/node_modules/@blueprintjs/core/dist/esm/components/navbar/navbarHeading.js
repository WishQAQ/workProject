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
var NavbarHeading = (function (_super) {
    tslib_1.__extends(NavbarHeading, _super);
    function NavbarHeading() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NavbarHeading.prototype.render = function () {
        var _a = this.props, children = _a.children, className = _a.className, htmlProps = tslib_1.__rest(_a, ["children", "className"]);
        return (React.createElement("div", tslib_1.__assign({ className: classNames(Classes.NAVBAR_HEADING, className) }, htmlProps), children));
    };
    NavbarHeading.displayName = "Blueprint.NavbarHeading";
    NavbarHeading = tslib_1.__decorate([
        PureRender
    ], NavbarHeading);
    return NavbarHeading;
}(React.Component));
export { NavbarHeading };
