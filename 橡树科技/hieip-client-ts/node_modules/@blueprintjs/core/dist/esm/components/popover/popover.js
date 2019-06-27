/*
 * Copyright 2015 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the terms of the LICENSE file distributed with this project.
 */
import * as tslib_1 from "tslib";
import * as classNames from "classnames";
import * as PureRender from "pure-render-decorator";
import * as React from "react";
import { findDOMNode } from "react-dom";
import * as Tether from "tether";
import { AbstractComponent } from "../../common/abstractComponent";
import * as Classes from "../../common/classes";
import * as Errors from "../../common/errors";
import * as PosUtils from "../../common/position";
import * as TetherUtils from "../../common/tetherUtils";
import * as Utils from "../../common/utils";
import { isDarkTheme } from "../../common/utils/isDarkTheme";
import { Overlay } from "../overlay/overlay";
import { Tooltip } from "../tooltip/tooltip";
import * as Arrows from "./arrows";
var SVG_SHADOW_PATH = "M8.11 6.302c1.015-.936 1.887-2.922 1.887-4.297v26c0-1.378" +
    "-.868-3.357-1.888-4.297L.925 17.09c-1.237-1.14-1.233-3.034 0-4.17L8.11 6.302z";
var SVG_ARROW_PATH = "M8.787 7.036c1.22-1.125 2.21-3.376 2.21-5.03V0v30-2.005" +
    "c0-1.654-.983-3.9-2.21-5.03l-7.183-6.616c-.81-.746-.802-1.96 0-2.7l7.183-6.614z";
var SMART_POSITIONING = {
    attachment: "together",
    to: "scrollParent",
};
export var PopoverInteractionKind;
(function (PopoverInteractionKind) {
    PopoverInteractionKind[PopoverInteractionKind["CLICK"] = 0] = "CLICK";
    PopoverInteractionKind[PopoverInteractionKind["CLICK_TARGET_ONLY"] = 1] = "CLICK_TARGET_ONLY";
    PopoverInteractionKind[PopoverInteractionKind["HOVER"] = 2] = "HOVER";
    PopoverInteractionKind[PopoverInteractionKind["HOVER_TARGET_ONLY"] = 3] = "HOVER_TARGET_ONLY";
})(PopoverInteractionKind || (PopoverInteractionKind = {}));
var Popover = (function (_super) {
    tslib_1.__extends(Popover, _super);
    function Popover(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.hasDarkParent = false;
        // a flag that is set to true while we are waiting for the underlying Portal to complete rendering
        _this.isContentMounting = false;
        _this.refHandlers = {
            popover: function (ref) {
                _this.popoverElement = ref;
                _this.updateTether();
                _this.updateArrowPosition();
            },
            target: function (ref) {
                _this.targetElement = ref;
            },
        };
        _this.handleContentMount = function () {
            if (Utils.isFunction(_this.props.popoverDidOpen) && _this.isContentMounting) {
                _this.props.popoverDidOpen();
                _this.isContentMounting = false;
            }
        };
        _this.handleTargetFocus = function (e) {
            if (_this.props.openOnTargetFocus && _this.isHoverInteractionKind()) {
                _this.handleMouseEnter(e);
            }
        };
        _this.handleTargetBlur = function (e) {
            if (_this.props.openOnTargetFocus && _this.isHoverInteractionKind()) {
                // if the next element to receive focus is within the popover, we'll want to leave the
                // popover open. we must do this check *after* the next element focuses, so we use a
                // timeout of 0 to flush the rest of the event queue before proceeding.
                requestAnimationFrame(function () {
                    if (_this.popoverElement == null || !_this.popoverElement.contains(document.activeElement)) {
                        _this.handleMouseLeave(e);
                    }
                });
            }
        };
        _this.handleMouseEnter = function (e) {
            // if we're entering the popover, and the mode is set to be HOVER_TARGET_ONLY, we want to manually
            // trigger the mouse leave event, as hovering over the popover shouldn't count.
            if (_this.props.inline &&
                _this.isElementInPopover(e.target) &&
                _this.props.interactionKind === PopoverInteractionKind.HOVER_TARGET_ONLY &&
                !_this.props.openOnTargetFocus) {
                _this.handleMouseLeave(e);
            }
            else if (!_this.props.isDisabled) {
                // only begin opening popover when it is enabled
                _this.setOpenStateByPropCallback(true, e, _this.props.hoverOpenDelay);
            }
        };
        _this.handleMouseLeave = function (e) {
            // user-configurable closing delay is helpful when moving mouse from target to popover
            _this.setOpenStateByPropCallback(false, e, _this.props.hoverCloseDelay);
        };
        _this.handlePopoverClick = function (e) {
            var eventTarget = e.target;
            var shouldDismiss = eventTarget.closest("." + Classes.POPOVER_DISMISS) != null;
            var overrideDismiss = eventTarget.closest("." + Classes.POPOVER_DISMISS_OVERRIDE) != null;
            if (shouldDismiss && !overrideDismiss) {
                _this.setOpenStateByPropCallback(false, e);
            }
        };
        _this.handleOverlayClose = function (e) {
            var eventTarget = e.target;
            // if click was in target, target event listener will handle things, so don't close
            if (!Utils.elementIsOrContains(_this.targetElement, eventTarget) || e.nativeEvent instanceof KeyboardEvent) {
                _this.setOpenStateByPropCallback(false, e);
            }
        };
        _this.handleTargetClick = function (e) {
            // ensure click did not originate from within inline popover before closing
            if (!_this.props.isDisabled && !_this.isElementInPopover(e.target)) {
                if (_this.props.isOpen == null) {
                    _this.setOpenStateDirectly(function (previousIsOpen) { return !previousIsOpen; });
                }
                else {
                    _this.setOpenStateByPropCallback(!_this.props.isOpen, e);
                }
            }
        };
        var isOpen = props.defaultIsOpen && !props.isDisabled;
        if (props.isOpen != null) {
            isOpen = props.isOpen;
        }
        _this.state = {
            ignoreTargetDimensions: false,
            isOpen: isOpen,
            targetHeight: 0,
            targetWidth: 0,
        };
        return _this;
    }
    Popover.prototype.render = function () {
        var className = this.props.className;
        var isOpen = this.state.isOpen;
        var targetProps;
        if (this.isHoverInteractionKind()) {
            targetProps = {
                onBlur: this.handleTargetBlur,
                onFocus: this.handleTargetFocus,
                onMouseEnter: this.handleMouseEnter,
                onMouseLeave: this.handleMouseLeave,
            };
            // any one of the CLICK* values
        }
        else {
            targetProps = {
                onClick: this.handleTargetClick,
            };
        }
        targetProps.className = classNames(Classes.POPOVER_TARGET, (_a = {},
            _a[Classes.POPOVER_OPEN] = isOpen,
            _a), className);
        targetProps.ref = this.refHandlers.target;
        var children = this.understandChildren();
        var targetTabIndex = this.props.openOnTargetFocus && this.isHoverInteractionKind() ? 0 : undefined;
        var target = React.cloneElement(children.target, 
        // force disable single Tooltip child when popover is open (BLUEPRINT-552)
        isOpen && children.target.type === Tooltip
            ? { isDisabled: true, tabIndex: targetTabIndex }
            : { tabIndex: targetTabIndex });
        var isContentEmpty = children.content == null;
        if (isContentEmpty && !this.props.isDisabled && isOpen !== false && !Utils.isNodeEnv("production")) {
            console.warn(Errors.POPOVER_WARN_EMPTY_CONTENT);
        }
        return React.createElement(this.props.rootElementTag, targetProps, target, React.createElement(Overlay, { autoFocus: this.props.autoFocus, backdropClassName: Classes.POPOVER_BACKDROP, backdropProps: this.props.backdropProps, canEscapeKeyClose: this.props.canEscapeKeyClose, canOutsideClickClose: this.props.interactionKind === PopoverInteractionKind.CLICK, className: this.props.portalClassName, didOpen: this.handleContentMount, enforceFocus: this.props.enforceFocus, hasBackdrop: this.props.isModal, inline: this.props.inline, isOpen: isOpen && !isContentEmpty, lazy: this.props.lazy, onClose: this.handleOverlayClose, transitionDuration: this.props.transitionDuration, transitionName: Classes.POPOVER }, this.renderPopover(children.content)));
        var _a;
    };
    Popover.prototype.componentDidMount = function () {
        this.componentDOMChange();
    };
    Popover.prototype.componentWillReceiveProps = function (nextProps) {
        _super.prototype.componentWillReceiveProps.call(this, nextProps);
        if (nextProps.isOpen == null && nextProps.isDisabled && !this.props.isDisabled) {
            // ok to use setOpenState here because isDisabled and isOpen are mutex.
            this.setOpenStateByPropCallback(false);
        }
        else if (nextProps.isOpen !== this.props.isOpen) {
            // propagate isOpen prop directly to state, circumventing onInteraction callback
            // (which would be invoked if this went through setOpenState)
            this.setOpenStateDirectly(nextProps.isOpen);
        }
    };
    Popover.prototype.componentWillUpdate = function (_, nextState) {
        if (!this.state.isOpen && nextState.isOpen) {
            this.isContentMounting = true;
            Utils.safeInvoke(this.props.popoverWillOpen);
        }
        else if (this.state.isOpen && !nextState.isOpen) {
            Utils.safeInvoke(this.props.popoverWillClose);
        }
    };
    Popover.prototype.componentDidUpdate = function () {
        this.componentDOMChange();
    };
    Popover.prototype.componentWillUnmount = function () {
        _super.prototype.componentWillUnmount.call(this);
        this.destroyTether();
    };
    Popover.prototype.validateProps = function (props) {
        if (props.useSmartPositioning || props.constraints != null) {
            console.warn(Errors.POPOVER_WARN_DEPRECATED_CONSTRAINTS);
        }
        if (props.isOpen == null && props.onInteraction != null) {
            console.warn(Errors.POPOVER_WARN_UNCONTROLLED_ONINTERACTION);
        }
        if (props.inline && (props.useSmartPositioning || props.constraints != null || props.tetherOptions != null)) {
            console.warn(Errors.POPOVER_WARN_INLINE_NO_TETHER);
        }
        if (props.isModal && props.inline) {
            console.warn(Errors.POPOVER_WARN_MODAL_INLINE);
        }
        if (props.isModal && props.interactionKind !== PopoverInteractionKind.CLICK) {
            throw new Error(Errors.POPOVER_MODAL_INTERACTION);
        }
        var childrenCount = React.Children.count(props.children);
        var hasContentProp = props.content !== undefined;
        var hasTargetProp = props.target !== undefined;
        if (childrenCount === 0 && !hasTargetProp) {
            throw new Error(Errors.POPOVER_REQUIRES_TARGET);
        }
        if (childrenCount > 2) {
            console.warn(Errors.POPOVER_WARN_TOO_MANY_CHILDREN);
        }
        if (childrenCount > 0 && hasTargetProp) {
            console.warn(Errors.POPOVER_WARN_DOUBLE_TARGET);
        }
        if (childrenCount === 2 && hasContentProp) {
            console.warn(Errors.POPOVER_WARN_DOUBLE_CONTENT);
        }
    };
    Popover.prototype.componentDOMChange = function () {
        if (this.targetElement == null) {
            return;
        }
        if (this.props.useSmartArrowPositioning) {
            this.setState({
                targetHeight: this.targetElement.clientHeight,
                targetWidth: this.targetElement.clientWidth,
            });
        }
        if (!this.props.inline) {
            this.updateTether();
        }
        if (!this.props.inline && this.state.isOpen) {
            this.checkDOMForDarkTheme();
        }
    };
    Popover.prototype.renderPopover = function (content) {
        var _a = this.props, inline = _a.inline, interactionKind = _a.interactionKind;
        var popoverHandlers = {
            // always check popover clicks for dismiss class
            onClick: this.handlePopoverClick,
        };
        if (interactionKind === PopoverInteractionKind.HOVER ||
            (inline && interactionKind === PopoverInteractionKind.HOVER_TARGET_ONLY)) {
            popoverHandlers.onMouseEnter = this.handleMouseEnter;
            popoverHandlers.onMouseLeave = this.handleMouseLeave;
        }
        var positionClasses = TetherUtils.getAttachmentClasses(this.props.position).join(" ");
        var containerClasses = classNames(Classes.TRANSITION_CONTAINER, (_b = {}, _b[positionClasses] = inline, _b));
        var popoverClasses = classNames(Classes.POPOVER, (_c = {},
            _c[Classes.DARK] = this.props.inheritDarkTheme && this.hasDarkParent && !inline,
            _c), this.props.popoverClassName);
        var styles = this.getArrowPositionStyles();
        var transform = { transformOrigin: this.getPopoverTransformOrigin() };
        return (React.createElement("div", { className: containerClasses, ref: this.refHandlers.popover, style: styles.container },
            React.createElement("div", tslib_1.__assign({ className: popoverClasses, style: transform }, popoverHandlers),
                React.createElement("div", { className: Classes.POPOVER_ARROW, style: styles.arrow },
                    React.createElement("svg", { viewBox: "0 0 30 30" },
                        React.createElement("path", { className: Classes.POPOVER_ARROW + "-border", d: SVG_SHADOW_PATH }),
                        React.createElement("path", { className: Classes.POPOVER_ARROW + "-fill", d: SVG_ARROW_PATH }))),
                React.createElement("div", { className: Classes.POPOVER_CONTENT }, content))));
        var _b, _c;
    };
    // content and target can be specified as props or as children.
    // this method normalizes the two approaches, preferring child over prop.
    Popover.prototype.understandChildren = function () {
        var _a = this.props, children = _a.children, contentProp = _a.content, targetProp = _a.target;
        // #validateProps asserts that 1 <= children.length <= 2 so content is optional
        var _b = React.Children.toArray(children), targetChild = _b[0], contentChild = _b[1];
        return {
            content: ensureElement(contentChild == null ? contentProp : contentChild),
            target: ensureElement(targetChild == null ? targetProp : targetChild),
        };
    };
    Popover.prototype.getArrowPositionStyles = function () {
        if (this.props.useSmartArrowPositioning) {
            var dimensions = { height: this.state.targetHeight, width: this.state.targetWidth };
            return Arrows.getArrowPositionStyles(this.props.position, this.props.arrowSize, this.state.ignoreTargetDimensions, dimensions, this.props.inline);
        }
        else {
            return {};
        }
    };
    Popover.prototype.getPopoverTransformOrigin = function () {
        // if smart positioning is enabled then we must rely on CSS classes to put transform origin
        // on the correct side and cannot override it in JS. (https://github.com/HubSpot/tether/issues/154)
        if (this.props.useSmartArrowPositioning && !this.props.useSmartPositioning) {
            var dimensions = { height: this.state.targetHeight, width: this.state.targetWidth };
            return Arrows.getPopoverTransformOrigin(this.props.position, this.props.arrowSize, dimensions);
        }
        else {
            return undefined;
        }
    };
    Popover.prototype.updateArrowPosition = function () {
        if (this.popoverElement != null) {
            var arrow = this.popoverElement.getElementsByClassName(Classes.POPOVER_ARROW)[0];
            var centerWidth = (this.state.targetWidth + arrow.clientWidth) / 2;
            var centerHeight = (this.state.targetHeight + arrow.clientHeight) / 2;
            var ignoreWidth = centerWidth > this.popoverElement.clientWidth && PosUtils.isPositionHorizontal(this.props.position);
            var ignoreHeight = centerHeight > this.popoverElement.clientHeight && PosUtils.isPositionVertical(this.props.position);
            if (!this.state.ignoreTargetDimensions && (ignoreWidth || ignoreHeight)) {
                this.setState({ ignoreTargetDimensions: true });
            }
            else if (this.state.ignoreTargetDimensions && !ignoreWidth && !ignoreHeight) {
                this.setState({ ignoreTargetDimensions: false });
            }
        }
    };
    Popover.prototype.updateTether = function () {
        var _this = this;
        if (this.state.isOpen && !this.props.inline && this.popoverElement != null) {
            var _a = this.props, constraints = _a.constraints, position = _a.position, _b = _a.tetherOptions, tetherOptions = _b === void 0 ? {} : _b, useSmartPositioning = _a.useSmartPositioning;
            // the .pt-popover-target span we wrap the children in won't always be as big as its children
            // so instead, we'll position tether based off of its first child.
            // NOTE: use findDOMNode(this) directly because this.targetElement may not exist yet
            var target = findDOMNode(this).childNodes[0];
            // constraints is deprecated but must still be supported through tetherOptions until v2.0
            var options = constraints == null && !useSmartPositioning
                ? tetherOptions
                : tslib_1.__assign({}, tetherOptions, { constraints: useSmartPositioning ? [SMART_POSITIONING] : constraints });
            var finalTetherOptions = TetherUtils.createTetherOptions(this.popoverElement, target, position, options);
            if (this.tether == null) {
                this.tether = new Tether(finalTetherOptions);
            }
            else {
                this.tether.setOptions(finalTetherOptions);
            }
            // if props.position has just changed, Tether unfortunately positions the popover based
            // on the margins from the previous position. delay a frame for styles to catch up.
            setTimeout(function () { return _this.tether.position(); });
        }
        else {
            this.destroyTether();
        }
    };
    Popover.prototype.destroyTether = function () {
        if (this.tether != null) {
            this.tether.destroy();
        }
    };
    // a wrapper around setState({isOpen}) that will call props.onInteraction instead when in controlled mode.
    // starts a timeout to delay changing the state if a non-zero duration is provided.
    Popover.prototype.setOpenStateByPropCallback = function (isOpen, e, timeout) {
        var _this = this;
        // cancel any existing timeout because we have new state
        Utils.safeInvoke(this.cancelOpenTimeout);
        if (timeout > 0) {
            this.cancelOpenTimeout = this.setTimeout(function () { return _this.setOpenStateByPropCallback(isOpen, e); }, timeout);
        }
        else {
            if (this.props.isOpen == null) {
                this.setOpenStateDirectly(isOpen);
            }
            else {
                Utils.safeInvoke(this.props.onInteraction, isOpen);
            }
            if (!isOpen) {
                Utils.safeInvoke(this.props.onClose, e);
            }
        }
    };
    Popover.prototype.setOpenStateDirectly = function (isOpen) {
        var _this = this;
        if (Utils.isFunction(isOpen)) {
            this.setState(function (previousState) {
                var nextIsOpen = isOpen(previousState.isOpen);
                if (nextIsOpen) {
                    _this.checkDOMForDarkTheme();
                }
                return { isOpen: nextIsOpen };
            });
        }
        else {
            if (isOpen) {
                this.checkDOMForDarkTheme();
            }
            this.setState({ isOpen: isOpen });
        }
    };
    Popover.prototype.isElementInPopover = function (element) {
        return this.popoverElement != null && this.popoverElement.contains(element);
    };
    Popover.prototype.isHoverInteractionKind = function () {
        return (this.props.interactionKind === PopoverInteractionKind.HOVER ||
            this.props.interactionKind === PopoverInteractionKind.HOVER_TARGET_ONLY);
    };
    // This may cause a preemptive DOM reflow so should be avoided when the tether is not present
    Popover.prototype.checkDOMForDarkTheme = function () {
        this.hasDarkParent = isDarkTheme(this.targetElement);
    };
    Popover.defaultProps = {
        arrowSize: 30,
        className: "",
        defaultIsOpen: false,
        hoverCloseDelay: 300,
        hoverOpenDelay: 150,
        inheritDarkTheme: true,
        inline: false,
        interactionKind: PopoverInteractionKind.CLICK,
        isDisabled: false,
        isModal: false,
        openOnTargetFocus: true,
        popoverClassName: "",
        position: PosUtils.Position.RIGHT,
        rootElementTag: "span",
        transitionDuration: 300,
        useSmartArrowPositioning: true,
        useSmartPositioning: false,
    };
    Popover.displayName = "Blueprint.Popover";
    Popover = tslib_1.__decorate([
        PureRender
    ], Popover);
    return Popover;
}(AbstractComponent));
export { Popover };
/**
 * Converts a react child to an element: non-empty strings or numbers are wrapped in `<span>`;
 * empty strings are discarded.
 */
function ensureElement(child) {
    // wrap text in a <span> so children are always elements
    if (typeof child === "string") {
        // cull whitespace strings
        return child.trim().length > 0 ? React.createElement("span", null, child) : undefined;
    }
    else if (typeof child === "number") {
        return React.createElement("span", null, child);
    }
    else {
        return child;
    }
}
export var PopoverFactory = React.createFactory(Popover);
