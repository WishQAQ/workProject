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
import { Icon } from "../icon/icon";
var NonIdealState = (function (_super) {
    tslib_1.__extends(NonIdealState, _super);
    function NonIdealState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NonIdealState.prototype.render = function () {
        return (React.createElement("div", { className: classNames(Classes.NON_IDEAL_STATE, this.props.className) },
            this.maybeRenderVisual(),
            this.maybeRenderTitle(),
            this.maybeRenderDescription(),
            this.maybeRenderAction()));
    };
    NonIdealState.prototype.maybeRenderAction = function () {
        if (this.props.action == null) {
            return undefined;
        }
        return React.createElement("div", { className: Classes.NON_IDEAL_STATE_ACTION }, this.props.action);
    };
    NonIdealState.prototype.maybeRenderDescription = function () {
        if (this.props.description == null) {
            return undefined;
        }
        return React.createElement("div", { className: Classes.NON_IDEAL_STATE_DESCRIPTION }, this.props.description);
    };
    NonIdealState.prototype.maybeRenderTitle = function () {
        if (this.props.title == null) {
            return undefined;
        }
        return React.createElement("h4", { className: Classes.NON_IDEAL_STATE_TITLE }, this.props.title);
    };
    NonIdealState.prototype.maybeRenderVisual = function () {
        var visual = this.props.visual;
        if (visual == null) {
            return undefined;
        }
        else if (typeof visual === "string") {
            return (React.createElement("div", { className: classNames(Classes.NON_IDEAL_STATE_VISUAL, Classes.NON_IDEAL_STATE_ICON) },
                React.createElement(Icon, { iconName: visual, iconSize: "inherit" })));
        }
        else {
            return React.createElement("div", { className: Classes.NON_IDEAL_STATE_VISUAL }, visual);
        }
    };
    NonIdealState = tslib_1.__decorate([
        PureRender
    ], NonIdealState);
    return NonIdealState;
}(React.Component));
export { NonIdealState };
export var NonIdealStateFactory = React.createFactory(NonIdealState);
