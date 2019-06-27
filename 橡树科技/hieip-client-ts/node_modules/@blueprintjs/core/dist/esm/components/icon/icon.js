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
var Icon = (function (_super) {
    tslib_1.__extends(Icon, _super);
    function Icon() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Icon_1 = Icon;
    Icon.prototype.render = function () {
        if (this.props.iconName == null) {
            return null;
        }
        var _a = this.props, className = _a.className, iconName = _a.iconName, intent = _a.intent, _b = _a.iconSize, iconSize = _b === void 0 ? Icon_1.SIZE_STANDARD : _b, restProps = tslib_1.__rest(_a, ["className", "iconName", "intent", "iconSize"]);
        var classes = classNames(getSizeClass(iconSize), Classes.iconClass(iconName), Classes.intentClass(intent), className);
        return React.createElement("span", tslib_1.__assign({ className: classes }, restProps));
    };
    Icon.displayName = "Blueprint.Icon";
    Icon.SIZE_STANDARD = 16;
    Icon.SIZE_LARGE = 20;
    Icon.SIZE_INHERIT = "inherit";
    Icon = Icon_1 = tslib_1.__decorate([
        PureRender
    ], Icon);
    return Icon;
    var Icon_1;
}(React.Component));
export { Icon };
// NOTE: not using a type alias here so the full union will appear in the interface docs
function getSizeClass(size) {
    switch (size) {
        case Icon.SIZE_STANDARD:
            return Classes.ICON_STANDARD;
        case Icon.SIZE_LARGE:
            return Classes.ICON_LARGE;
        default:
            return Classes.ICON;
    }
}
