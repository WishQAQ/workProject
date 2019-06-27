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
export { Tab };
export var TabFactory = React.createFactory(Tab);
