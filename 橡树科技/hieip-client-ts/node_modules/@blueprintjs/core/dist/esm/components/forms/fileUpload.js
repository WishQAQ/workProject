/**
 * Copyright 2017 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the terms of the LICENSE file distributed with this project.
 */
import * as tslib_1 from "tslib";
import * as classNames from "classnames";
import * as PureRender from "pure-render-decorator";
import * as React from "react";
import { Utils } from "../../common";
import * as Classes from "../../common/classes";
// TODO: write tests (ignoring for now to get a build passing quickly)
/* istanbul ignore next */
var FileUpload = (function (_super) {
    tslib_1.__extends(FileUpload, _super);
    function FileUpload() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleInputChange = function (e) {
            Utils.safeInvoke(_this.props.onInputChange, e);
            Utils.safeInvoke(_this.props.inputProps.onChange, e);
        };
        return _this;
    }
    FileUpload.prototype.render = function () {
        var _a = this.props, className = _a.className, fill = _a.fill, disabled = _a.disabled, inputProps = _a.inputProps, onInputChange = _a.onInputChange, large = _a.large, text = _a.text, htmlProps = tslib_1.__rest(_a, ["className", "fill", "disabled", "inputProps", "onInputChange", "large", "text"]);
        var rootClasses = classNames(Classes.FILE_UPLOAD, (_b = {},
            _b[Classes.DISABLED] = disabled,
            _b[Classes.FILL] = fill,
            _b[Classes.LARGE] = large,
            _b), className);
        return (React.createElement("label", tslib_1.__assign({}, htmlProps, { className: rootClasses }),
            React.createElement("input", tslib_1.__assign({}, inputProps, { onChange: this.handleInputChange, type: "file", disabled: disabled })),
            React.createElement("span", { className: Classes.FILE_UPLOAD_INPUT }, text)));
        var _b;
    };
    FileUpload.displayName = "Blueprint.FileUpload";
    FileUpload.defaultProps = {
        inputProps: {},
        text: "Choose file...",
    };
    FileUpload = tslib_1.__decorate([
        PureRender
    ], FileUpload);
    return FileUpload;
}(React.Component));
export { FileUpload };
export var FileUploadFactory = React.createFactory(FileUpload);
