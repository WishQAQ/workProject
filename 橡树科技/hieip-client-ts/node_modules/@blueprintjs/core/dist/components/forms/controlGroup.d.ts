/// <reference types="react" />
import * as React from "react";
import { IProps } from "../../common/props";
export interface IControlGroupProps extends React.AllHTMLAttributes<HTMLDivElement>, IProps {
    /**
     * Whether the control group should take up the full width of its container.
     */
    fill?: boolean;
    /**
     * Whether the button group should appear with vertical styling.
     */
    vertical?: boolean;
}
export declare class ControlGroup extends React.Component<IControlGroupProps, {}> {
    static displayName: string;
    render(): JSX.Element;
}
export declare const ControlGroupFactory: React.ComponentFactory<Readonly<{
    children?: React.ReactNode;
}> & Readonly<IControlGroupProps>, ControlGroup>;
