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
var TabPanel = (function (_super) {
    tslib_1.__extends(TabPanel, _super);
    function TabPanel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TabPanel.prototype.render = function () {
        return (React.createElement("div", { "aria-labelledby": this.props._tabId, className: classNames(Classes.TAB_PANEL, this.props.className), id: this.props._id, role: "tabpanel" }, this.props.children));
    };
    TabPanel.displayName = "Blueprint.TabPanel";
    TabPanel = tslib_1.__decorate([
        PureRender
    ], TabPanel);
    return TabPanel;
}(React.Component));
exports.TabPanel = TabPanel;
exports.TabPanelFactory = React.createFactory(TabPanel);
