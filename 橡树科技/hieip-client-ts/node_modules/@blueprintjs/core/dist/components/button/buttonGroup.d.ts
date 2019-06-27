/// <reference types="react" />
import * as React from "react";
import { IProps } from "../../common/props";
export interface IButtonGroupProps extends IProps, React.HTMLProps<HTMLDivElement> {
    /**
     * Whether the button group should take up the full width of its container.
     * @default false
     */
    fill?: boolean;
    /**
     * Whether the child buttons should appear with minimal styling.
     * @default false
     */
    minimal?: boolean;
    /**
     * Whether the child buttons should appear with large styling.
     * @default false
     */
    large?: boolean;
    /**
     * Whether the button group should appear with vertical styling.
     * @default false
     */
    vertical?: boolean;
}
export declare class ButtonGroup extends React.Component<IButtonGroupProps, {}> {
    static displayName: string;
    render(): JSX.Element;
}
