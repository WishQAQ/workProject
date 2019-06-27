/// <reference types="react" />
/**
 * Copyright 2016 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the terms of the LICENSE file distributed with this project.
 */
import * as React from "react";
export interface IKeyComboProps {
    allowInInput?: boolean;
    combo: string;
    disabled?: boolean;
    preventDefault?: boolean;
    stopPropagation?: boolean;
}
export declare class KeyCombo extends React.Component<IKeyComboProps, {}> {
    render(): JSX.Element;
}
