/*
 * Copyright 2015 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the terms of the LICENSE file distributed with this project.
 */
import * as tslib_1 from "tslib";
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Classes from "../../common/classes";
import * as Errors from "../../common/errors";
import { removeNonHTMLProps } from "../../common/props";
import { safeInvoke } from "../../common/utils";
var REACT_CONTEXT_TYPES = {
    blueprintPortalClassName: function (obj, key) {
        if (obj[key] != null && typeof obj[key] !== "string") {
            return new Error(Errors.PORTAL_CONTEXT_CLASS_NAME_STRING);
        }
        return undefined;
    },
};
/**
 * This component detaches its contents and re-attaches them to document.body.
 * Use it when you need to circumvent DOM z-stacking (for dialogs, popovers, etc.).
 * Any class names passed to this element will be propagated to the new container element on document.body.
 */
var Portal = (function (_super) {
    tslib_1.__extends(Portal, _super);
    function Portal() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Portal.prototype.render = function () {
        return null;
    };
    Portal.prototype.componentDidMount = function () {
        var targetElement = document.createElement("div");
        targetElement.classList.add(Classes.PORTAL);
        if (this.context.blueprintPortalClassName != null) {
            targetElement.classList.add(this.context.blueprintPortalClassName);
        }
        document.body.appendChild(targetElement);
        this.targetElement = targetElement;
        this.componentDidUpdate();
    };
    Portal.prototype.componentDidUpdate = function () {
        var _this = this;
        // use special render function to preserve React context, in case children need it
        ReactDOM.unstable_renderSubtreeIntoContainer(
        /* parentComponent */ this, React.createElement("div", tslib_1.__assign({}, removeNonHTMLProps(this.props), { ref: this.props.containerRef }), this.props.children), this.targetElement, function () { return safeInvoke(_this.props.onChildrenMount); });
    };
    Portal.prototype.componentWillUnmount = function () {
        ReactDOM.unmountComponentAtNode(this.targetElement);
        this.targetElement.remove();
    };
    Portal.displayName = "Blueprint.Portal";
    Portal.contextTypes = REACT_CONTEXT_TYPES;
    return Portal;
}(React.Component));
export { Portal };
