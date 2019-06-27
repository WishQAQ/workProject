/*
 * Copyright 2015 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the terms of the LICENSE file distributed with this project.
 */
import * as tslib_1 from "tslib";
import * as classNames from "classnames";
import * as React from "react";
import { AbstractComponent, Classes, Intent } from "../../common";
import { ALERT_WARN_CANCEL_PROPS } from "../../common/errors";
import { Button } from "../button/buttons";
import { Dialog } from "../dialog/dialog";
import { Icon } from "../icon/icon";
var Alert = (function (_super) {
    tslib_1.__extends(Alert, _super);
    function Alert() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Alert.prototype.render = function () {
        var _a = this.props, children = _a.children, className = _a.className, iconName = _a.iconName, intent = _a.intent, isOpen = _a.isOpen, confirmButtonText = _a.confirmButtonText, onConfirm = _a.onConfirm, style = _a.style;
        return (React.createElement(Dialog, { className: classNames(Classes.ALERT, className), isOpen: isOpen, style: style },
            React.createElement("div", { className: Classes.ALERT_BODY },
                React.createElement(Icon, { iconName: iconName, iconSize: "inherit", intent: Intent.DANGER }),
                React.createElement("div", { className: Classes.ALERT_CONTENTS }, children)),
            React.createElement("div", { className: Classes.ALERT_FOOTER },
                React.createElement(Button, { intent: intent, text: confirmButtonText, onClick: onConfirm }),
                this.maybeRenderSecondaryAction())));
    };
    Alert.prototype.validateProps = function (props) {
        if ((props.cancelButtonText != null && props.onCancel == null) ||
            (props.cancelButtonText == null && props.onCancel != null)) {
            console.warn(ALERT_WARN_CANCEL_PROPS);
        }
    };
    Alert.prototype.maybeRenderSecondaryAction = function () {
        if (this.props.cancelButtonText != null) {
            return React.createElement(Button, { text: this.props.cancelButtonText, onClick: this.props.onCancel });
        }
        return undefined;
    };
    Alert.defaultProps = {
        confirmButtonText: "OK",
        isOpen: false,
        onConfirm: null,
    };
    Alert.displayName = "Blueprint.Alert";
    return Alert;
}(AbstractComponent));
export { Alert };
