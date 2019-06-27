/*
 * Copyright 2016 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the terms of the LICENSE file distributed with this project.
 */
import { InteractionModeEngine } from "../common/interactionMode";
export var FOCUS_DISABLED_CLASS = "pt-focus-disabled";
var fakeFocusEngine = {
    isActive: function () { return true; },
    start: function () { return true; },
    stop: function () { return true; },
};
var focusEngine = typeof document !== "undefined"
    ? new InteractionModeEngine(document.documentElement, FOCUS_DISABLED_CLASS)
    : fakeFocusEngine;
export var FocusStyleManager = {
    alwaysShowFocus: function () { return focusEngine.stop(); },
    isActive: function () { return focusEngine.isActive(); },
    onlyShowFocusOnTabs: function () { return focusEngine.start(); },
};
