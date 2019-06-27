/*
 * Copyright 2015 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the terms of the LICENSE file distributed with this project.
 */
import * as tslib_1 from "tslib";
import * as classNames from "classnames";
import * as React from "react";
import { AbstractComponent } from "../../common/abstractComponent";
import * as Classes from "../../common/classes";
import * as Errors from "../../common/errors";
import { safeInvoke } from "../../common/utils";
import { Icon } from "../icon/icon";
import { Overlay } from "../overlay/overlay";
var Dialog = (function (_super) {
    tslib_1.__extends(Dialog, _super);
    function Dialog() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleContainerMouseDown = function (evt) {
            // quick re-implementation of canOutsideClickClose because .pt-dialog-container covers the backdrop
            var isClickOutsideDialog = evt.target.closest("." + Classes.DIALOG) == null;
            if (isClickOutsideDialog && _this.props.canOutsideClickClose) {
                safeInvoke(_this.props.onClose, evt);
            }
        };
        return _this;
    }
    Dialog.prototype.render = function () {
        return (React.createElement(Overlay, tslib_1.__assign({}, this.props, { className: Classes.OVERLAY_SCROLL_CONTAINER, hasBackdrop: true }),
            React.createElement("div", { className: Classes.DIALOG_CONTAINER, onMouseDown: this.handleContainerMouseDown },
                React.createElement("div", { className: classNames(Classes.DIALOG, this.props.className), style: this.props.style },
                    this.maybeRenderHeader(),
                    this.props.children))));
    };
    Dialog.prototype.validateProps = function (props) {
        if (props.title == null) {
            if (props.iconName != null) {
                console.warn(Errors.DIALOG_WARN_NO_HEADER_ICON);
            }
            if (props.isCloseButtonShown != null) {
                console.warn(Errors.DIALOG_WARN_NO_HEADER_CLOSE_BUTTON);
            }
        }
    };
    Dialog.prototype.maybeRenderCloseButton = function () {
        // for now, show close button if prop is undefined or null
        // this gives us a behavior as if the default value were `true`
        if (this.props.isCloseButtonShown !== false) {
            var classes = classNames(Classes.DIALOG_CLOSE_BUTTON, Classes.iconClass("small-cross"));
            return React.createElement("button", { "aria-label": "Close", className: classes, onClick: this.props.onClose });
        }
        else {
            return undefined;
        }
    };
    Dialog.prototype.maybeRenderHeader = function () {
        var _a = this.props, iconName = _a.iconName, title = _a.title;
        if (title == null) {
            return undefined;
        }
        return (React.createElement("div", { className: Classes.DIALOG_HEADER },
            React.createElement(Icon, { iconName: iconName, iconSize: 20 }),
            React.createElement("h5", { className: Classes.DIALOG_HEADER_TITLE }, title),
            this.maybeRenderCloseButton()));
    };
    Dialog.defaultProps = {
        canOutsideClickClose: true,
        isOpen: false,
    };
    Dialog.displayName = "Blueprint.Dialog";
    return Dialog;
}(AbstractComponent));
export { Dialog };
export var DialogFactory = React.createFactory(Dialog);
