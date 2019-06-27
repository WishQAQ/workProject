"use strict";
/**
 * Copyright 2017 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the terms of the LICENSE file distributed with this project.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var classNames = require("classnames");
var PureRender = require("pure-render-decorator");
var React = require("react");
var Classes = require("../../common/classes");
// this component is simple enough that tests would be purely tautological.
/* istanbul ignore next */
var TextArea = (function (_super) {
    tslib_1.__extends(TextArea, _super);
    function TextArea() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TextArea.prototype.render = function () {
        var _a = this.props, className = _a.className, fill = _a.fill, intent = _a.intent, large = _a.large, htmlProps = tslib_1.__rest(_a, ["className", "fill", "intent", "large"]);
        var rootClasses = classNames(Classes.INPUT, Classes.intentClass(intent), (_b = {},
            _b[Classes.FILL] = fill,
            _b[Classes.LARGE] = large,
            _b), className);
        return React.createElement("textarea", tslib_1.__assign({}, htmlProps, { className: rootClasses }));
        var _b;
    };
    TextArea.displayName = "Blueprint.TextArea";
    TextArea = tslib_1.__decorate([
        PureRender
    ], TextArea);
    return TextArea;
}(React.Component));
exports.TextArea = TextArea;
exports.TextAreaFactory = React.createFactory(TextArea);
