/*
 * Copyright 2016 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the terms of the LICENSE file distributed with this project.
 */
import * as tslib_1 from "tslib";
import * as React from "react";
import { AbstractComponent } from "../../common";
import { KeyCombo } from "./keyCombo";
var Hotkey = (function (_super) {
    tslib_1.__extends(Hotkey, _super);
    function Hotkey() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Hotkey.isInstance = function (element) {
        return element != null && element.type === Hotkey;
    };
    Hotkey.prototype.render = function () {
        var _a = this.props, label = _a.label, spreadableProps = tslib_1.__rest(_a, ["label"]);
        return (React.createElement("div", { className: "pt-hotkey" },
            React.createElement("div", { className: "pt-hotkey-label" }, label),
            React.createElement(KeyCombo, tslib_1.__assign({}, spreadableProps))));
    };
    Hotkey.prototype.validateProps = function (props) {
        if (props.global !== true && props.group == null) {
            throw new Error("non-global <Hotkey>s must define a group");
        }
    };
    Hotkey.defaultProps = {
        allowInInput: false,
        disabled: false,
        global: false,
        preventDefault: false,
        stopPropagation: false,
    };
    return Hotkey;
}(AbstractComponent));
export { Hotkey };
