"use strict";
/*
 * Copyright 2015 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the terms of the LICENSE file distributed with this project.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var classNames = require("classnames");
var PureRender = require("pure-render-decorator");
var React = require("react");
var Classes = require("../../common/classes");
var Tab = (function (_super) {
    tslib_1.__extends(Tab, _super);
    function Tab() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Tab.prototype.render = function () {
        return (React.createElement("li", { "aria-controls": this.props.panelId, "aria-disabled": this.props.isDisabled, "aria-expanded": this.props.isSelected, "aria-selected": this.props.isSelected, className: classNames(Classes.TAB, this.props.className), id: this.props.id, role: "tab", tabIndex: this.props.isDisabled ? null : 0 }, this.props.children));
    };
    Tab.defaultProps = {
        isDisabled: false,
        isSelected: false,
    };
    Tab.displayName = "Blueprint.Tab";
    Tab = tslib_1.__decorate([
        PureRender
    ], Tab);
    return Tab;
}(React.Component));
exports.Tab = Tab;
exports.TabFactory = React.createFactory(Tab);
