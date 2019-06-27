"use strict";
/**
 * Copyright 2017 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the terms of the LICENSE file distributed with this project.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var classNames = require("classnames");
var PureRender = require("pure-render-decorator");
var React = require("react");
var Classes = require("../../common/classes");
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
exports.NavbarHeading = NavbarHeading;
