/*
 * Copyright 2016 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the terms of the LICENSE file distributed with this project.
 */
import * as tslib_1 from "tslib";
import * as classNames from "classnames";
import * as PureRender from "pure-render-decorator";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { AbstractComponent } from "../../common/abstractComponent";
import * as Classes from "../../common/classes";
import { TOASTER_WARN_INLINE, TOASTER_WARN_LEFT_RIGHT } from "../../common/errors";
import { ESCAPE } from "../../common/keys";
import { Position } from "../../common/position";
import { isNodeEnv, safeInvoke } from "../../common/utils";
import { Overlay } from "../overlay/overlay";
import { Toast } from "./toast";
var Toaster = (function (_super) {
    tslib_1.__extends(Toaster, _super);
    function Toaster() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            toasts: [],
        };
        // auto-incrementing identifier for un-keyed toasts
        _this.toastId = 0;
        _this.getDismissHandler = function (toast) { return function (timeoutExpired) {
            _this.dismiss(toast.key, timeoutExpired);
        }; };
        _this.handleClose = function (e) {
            // NOTE that `e` isn't always a KeyboardEvent but that's the only type we care about
            if (e.which === ESCAPE) {
                _this.clear();
            }
        };
        return _this;
    }
    Toaster_1 = Toaster;
    /**
     * Create a new `Toaster` instance that can be shared around your application.
     * The `Toaster` will be rendered into a new element appended to the given container.
     */
    Toaster.create = function (props, container) {
        if (container === void 0) { container = document.body; }
        if (props != null && props.inline != null && !isNodeEnv("production")) {
            console.warn(TOASTER_WARN_INLINE);
        }
        var containerElement = document.createElement("div");
        container.appendChild(containerElement);
        return ReactDOM.render(React.createElement(Toaster_1, tslib_1.__assign({}, props, { inline: true })), containerElement);
    };
    Toaster.prototype.show = function (props) {
        var options = this.createToastOptions(props);
        this.setState(function (prevState) { return ({
            toasts: [options].concat(prevState.toasts),
        }); });
        return options.key;
    };
    Toaster.prototype.update = function (key, props) {
        var options = this.createToastOptions(props, key);
        this.setState(function (prevState) { return ({
            toasts: prevState.toasts.map(function (t) { return (t.key === key ? options : t); }),
        }); });
    };
    Toaster.prototype.dismiss = function (key, timeoutExpired) {
        if (timeoutExpired === void 0) { timeoutExpired = false; }
        this.setState(function (_a) {
            var toasts = _a.toasts;
            return ({
                toasts: toasts.filter(function (t) {
                    var matchesKey = t.key === key;
                    if (matchesKey) {
                        safeInvoke(t.onDismiss, timeoutExpired);
                    }
                    return !matchesKey;
                }),
            });
        });
    };
    Toaster.prototype.clear = function () {
        this.state.toasts.map(function (t) { return safeInvoke(t.onDismiss, false); });
        this.setState({ toasts: [] });
    };
    Toaster.prototype.getToasts = function () {
        return this.state.toasts;
    };
    Toaster.prototype.render = function () {
        // $pt-transition-duration * 3 + $pt-transition-duration / 2
        var classes = classNames(Classes.TOAST_CONTAINER, this.getPositionClasses(), this.props.className);
        return (React.createElement(Overlay, { autoFocus: this.props.autoFocus, canEscapeKeyClose: this.props.canEscapeKeyClear, canOutsideClickClose: false, className: classes, enforceFocus: false, hasBackdrop: false, inline: this.props.inline, isOpen: this.state.toasts.length > 0, onClose: this.handleClose, transitionDuration: 350, transitionName: "pt-toast" }, this.state.toasts.map(this.renderToast, this)));
    };
    Toaster.prototype.validateProps = function (props) {
        if (props.position === Position.LEFT || props.position === Position.RIGHT) {
            console.warn(TOASTER_WARN_LEFT_RIGHT);
        }
    };
    Toaster.prototype.renderToast = function (toast) {
        return React.createElement(Toast, tslib_1.__assign({}, toast, { onDismiss: this.getDismissHandler(toast) }));
    };
    Toaster.prototype.createToastOptions = function (props, key) {
        if (key === void 0) { key = "toast-" + this.toastId++; }
        // clone the object before adding the key prop to avoid leaking the mutation
        return tslib_1.__assign({}, props, { key: key });
    };
    Toaster.prototype.getPositionClasses = function () {
        var positions = Position[this.props.position].split("_");
        // NOTE that there is no -center class because that's the default style
        return positions.map(function (p) { return Classes.TOAST_CONTAINER + "-" + p.toLowerCase(); });
    };
    Toaster.defaultProps = {
        autoFocus: false,
        canEscapeKeyClear: true,
        inline: false,
        position: Position.TOP,
    };
    Toaster = Toaster_1 = tslib_1.__decorate([
        PureRender
    ], Toaster);
    return Toaster;
    var Toaster_1;
}(AbstractComponent));
export { Toaster };
