/*
 * Copyright 2015 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the terms of the LICENSE file distributed with this project.
 */
import * as tslib_1 from "tslib";
import * as classNames from "classnames";
import * as PureRender from "pure-render-decorator";
import * as React from "react";
import * as Classes from "../../common/classes";
import { Position } from "../../common/position";
import { Popover, PopoverInteractionKind } from "../popover/popover";
var Tooltip = (function (_super) {
    tslib_1.__extends(Tooltip, _super);
    function Tooltip() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Tooltip.prototype.render = function () {
        var _a = this.props, children = _a.children, intent = _a.intent, openOnTargetFocus = _a.openOnTargetFocus, tooltipClassName = _a.tooltipClassName;
        var classes = classNames(Classes.TOOLTIP, Classes.intentClass(intent), tooltipClassName);
        return (React.createElement(Popover, tslib_1.__assign({}, this.props, { arrowSize: 22, autoFocus: false, canEscapeKeyClose: false, enforceFocus: false, interactionKind: PopoverInteractionKind.HOVER_TARGET_ONLY, lazy: true, openOnTargetFocus: openOnTargetFocus, popoverClassName: classes }), children));
    };
    Tooltip.defaultProps = {
        hoverCloseDelay: 0,
        hoverOpenDelay: 100,
        isDisabled: false,
        openOnTargetFocus: true,
        position: Position.TOP,
        rootElementTag: "span",
        transitionDuration: 100,
        useSmartArrowPositioning: true,
        useSmartPositioning: false,
    };
    Tooltip.displayName = "Blueprint.Tooltip";
    Tooltip = tslib_1.__decorate([
        PureRender
    ], Tooltip);
    return Tooltip;
}(React.Component));
export { Tooltip };
export var TooltipFactory = React.createFactory(Tooltip);
