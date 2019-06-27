/*
 * Copyright 2016 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the terms of the LICENSE file distributed with this project.
 */
import * as tslib_1 from "tslib";
import * as classNames from "classnames";
import * as React from "react";
import * as Classes from "../../common/classes";
// import * to avoid "cannot be named" error on factory
import * as spinner from "./spinner";
var SVGSpinner = (function (_super) {
    tslib_1.__extends(SVGSpinner, _super);
    function SVGSpinner() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SVGSpinner.prototype.renderContainer = function (classes, content) {
        return (React.createElement("g", { className: classNames(Classes.SVG_SPINNER, classes) },
            React.createElement("g", { className: "pt-svg-spinner-transform-group" }, content)));
    };
    return SVGSpinner;
}(spinner.Spinner));
export { SVGSpinner };
export var SVGSpinnerFactory = React.createFactory(SVGSpinner);
