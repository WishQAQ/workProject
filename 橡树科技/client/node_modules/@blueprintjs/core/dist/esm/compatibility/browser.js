/*
 * Copyright 2017 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the terms of the LICENSE file distributed with this project.
 */
var userAgent = typeof navigator !== "undefined" ? navigator.userAgent : "";
var browser = {
    isEdge: !!userAgent.match(/Edge/),
    isInternetExplorer: !!userAgent.match(/Trident/) || !!userAgent.match(/rv:11/),
    isWebkit: !!userAgent.match(/AppleWebKit/),
};
export var Browser = {
    isEdge: function () { return browser.isEdge; },
    isInternetExplorer: function () { return browser.isInternetExplorer; },
    isWebkit: function () { return browser.isWebkit; },
};
