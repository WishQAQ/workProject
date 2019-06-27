/// <reference types="react" />
import * as React from "react";
import { IProps } from "../../common/props";
export interface ILabelProps extends React.AllHTMLAttributes<HTMLDivElement>, IProps {
    /**
     * Whether the label is non-interactive.
     * Be sure to explicitly disable any child controls as well.
     */
    disabled?: boolean;
    /** The helper text to show next to the label. */
    helperText?: React.ReactNode;
    /** The text to show in the label. */
    text: React.ReactNode;
}
export declare class Label extends React.Component<ILabelProps, {}> {
    static displayName: string;
    render(): JSX.Element;
}
export declare const LabelFactory: React.ComponentFactory<Readonly<{
    children?: React.ReactNode;
}> & Readonly<ILabelProps>, Label>;
