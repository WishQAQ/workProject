"use strict";
/*
 * Copyright 2017 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the terms of the LICENSE file distributed with this project.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var classNames = require("classnames");
var PureRender = require("pure-render-decorator");
var React = require("react");
var common_1 = require("../../common");
var Callout = (function (_super) {
    tslib_1.__extends(Callout, _super);
    function Callout() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Callout.prototype.render = function () {
        var _a = this.props, className = _a.className, children = _a.children, iconName = _a.iconName, intent = _a.intent, title = _a.title, htmlProps = tslib_1.__rest(_a, ["className", "children", "iconName", "intent", "title"]);
        var classes = classNames(common_1.Classes.CALLOUT, common_1.Classes.intentClass(intent), common_1.Classes.iconClass(iconName), className);
        var maybeTitle = title === undefined ? undefined : React.createElement("h5", { className: common_1.Classes.CALLOUT_TITLE }, title);
        return (React.createElement("div", tslib_1.__assign({ className: classes }, htmlProps),
            maybeTitle,
            children));
    };
    Callout = tslib_1.__decorate([
        PureRender
    ], Callout);
    return Callout;
}(React.Component));
exports.Callout = Callout;
