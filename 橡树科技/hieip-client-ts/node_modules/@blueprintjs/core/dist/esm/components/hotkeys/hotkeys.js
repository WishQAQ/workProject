/*
 * Copyright 2016 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the terms of the LICENSE file distributed with this project.
 */
import * as tslib_1 from "tslib";
import * as React from "react";
import { AbstractComponent } from "../../common";
import { HOTKEYS_HOTKEY_CHILDREN } from "../../common/errors";
import { Hotkey } from "./hotkey";
export { Hotkey } from "./hotkey";
export { KeyCombo } from "./keyCombo";
export { HotkeysTarget } from "./hotkeysTarget";
export { comboMatches, getKeyCombo, getKeyComboString, parseKeyCombo } from "./hotkeyParser";
export { hideHotkeysDialog, setHotkeysDialogProps } from "./hotkeysDialog";
var Hotkeys = (function (_super) {
    tslib_1.__extends(Hotkeys, _super);
    function Hotkeys() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Hotkeys.prototype.render = function () {
        var hotkeys = React.Children.map(this.props.children, function (child) { return child.props; });
        // sort by group label alphabetically, globals first
        hotkeys.sort(function (a, b) {
            if (a.global) {
                return b.global ? 0 : -1;
            }
            if (b.global) {
                return 1;
            }
            return a.group.localeCompare(b.group);
        });
        var lastGroup = null;
        var elems = [];
        for (var _i = 0, hotkeys_1 = hotkeys; _i < hotkeys_1.length; _i++) {
            var hotkey = hotkeys_1[_i];
            var groupLabel = hotkey.group;
            if (groupLabel !== lastGroup) {
                elems.push(React.createElement("h4", { key: "group-" + elems.length, className: "pt-hotkey-group" }, groupLabel));
                lastGroup = groupLabel;
            }
            elems.push(React.createElement(Hotkey, tslib_1.__assign({ key: elems.length }, hotkey)));
        }
        return React.createElement("div", { className: "pt-hotkey-column" }, elems);
    };
    Hotkeys.prototype.validateProps = function (props) {
        React.Children.forEach(props.children, function (child) {
            if (!Hotkey.isInstance(child)) {
                throw new Error(HOTKEYS_HOTKEY_CHILDREN);
            }
        });
    };
    Hotkeys.defaultProps = {
        tabIndex: 0,
    };
    return Hotkeys;
}(AbstractComponent));
export { Hotkeys };
