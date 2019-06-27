"use strict";
/*
 * Copyright 2015 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the terms of the LICENSE file distributed with this project.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The four basic intents.
 */
var Intent;
(function (Intent) {
    Intent[Intent["NONE"] = -1] = "NONE";
    Intent[Intent["PRIMARY"] = 0] = "PRIMARY";
    Intent[Intent["SUCCESS"] = 1] = "SUCCESS";
    Intent[Intent["WARNING"] = 2] = "WARNING";
    Intent[Intent["DANGER"] = 3] = "DANGER";
})(Intent = exports.Intent || (exports.Intent = {}));
