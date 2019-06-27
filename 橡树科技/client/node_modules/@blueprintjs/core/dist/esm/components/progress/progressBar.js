/*
 * Copyright 2016 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the terms of the LICENSE file distributed with this project.
 */
import * as tslib_1 from "tslib";
import * as classNames from "classnames";
import * as PureRender from "pure-render-decorator";
import * as React from "react";
import * as Classes from "../../common/classes";
import { clamp } from "../../common/utils";
var ProgressBar = (function (_super) {
    tslib_1.__extends(ProgressBar, _super);
    function ProgressBar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ProgressBar.prototype.render = function () {
        var _a = this.props, className = _a.className, intent = _a.intent, value = _a.value;
        var classes = classNames("pt-progress-bar", Classes.intentClass(intent), className);
        // don't set width if value is null (rely on default CSS value)
        var width = value == null ? null : 100 * clamp(value, 0, 1) + "%";
        return (React.createElement("div", { className: classes },
            React.createElement("div", { className: "pt-progress-meter", style: { width: width } })));
    };
    ProgressBar.displayName = "Blueprint.ProgressBar";
    ProgressBar = tslib_1.__decorate([
        PureRender
    ], ProgressBar);
    return ProgressBar;
}(React.Component));
export { ProgressBar };
export var ProgressBarFactory = React.createFactory(ProgressBar);
