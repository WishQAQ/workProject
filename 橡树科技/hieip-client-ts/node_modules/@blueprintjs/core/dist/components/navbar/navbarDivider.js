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
var NavbarDivider = (function (_super) {
    tslib_1.__extends(NavbarDivider, _super);
    function NavbarDivider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NavbarDivider.prototype.render = function () {
        var _a = this.props, className = _a.className, htmlProps = tslib_1.__rest(_a, ["className"]);
        return React.createElement("div", tslib_1.__assign({ className: classNames(Classes.NAVBAR_DIVIDER, className) }, htmlProps));
    };
    NavbarDivider.displayName = "Blueprint.NavbarDivider";
    NavbarDivider = tslib_1.__decorate([
        PureRender
    ], NavbarDivider);
    return NavbarDivider;
}(React.Component));
exports.NavbarDivider = NavbarDivider;
