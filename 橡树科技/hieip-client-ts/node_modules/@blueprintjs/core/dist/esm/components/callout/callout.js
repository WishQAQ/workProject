/*
 * Copyright 2017 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the terms of the LICENSE file distributed with this project.
 */
import * as tslib_1 from "tslib";
import * as classNames from "classnames";
import * as PureRender from "pure-render-decorator";
import * as React from "react";
import { Classes } from "../../common";
var Callout = (function (_super) {
    tslib_1.__extends(Callout, _super);
    function Callout() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Callout.prototype.render = function () {
        var _a = this.props, className = _a.className, children = _a.children, iconName = _a.iconName, intent = _a.intent, title = _a.title, htmlProps = tslib_1.__rest(_a, ["className", "children", "iconName", "intent", "title"]);
        var classes = classNames(Classes.CALLOUT, Classes.intentClass(intent), Classes.iconClass(iconName), className);
        var maybeTitle = title === undefined ? undefined : React.createElement("h5", { className: Classes.CALLOUT_TITLE }, title);
        return (React.createElement("div", tslib_1.__assign({ className: classes }, htmlProps),
            maybeTitle,
            children));
    };
    Callout = tslib_1.__decorate([
        PureRender
    ], Callout);
    return Callout;
}(React.Component));
export { Callout };
