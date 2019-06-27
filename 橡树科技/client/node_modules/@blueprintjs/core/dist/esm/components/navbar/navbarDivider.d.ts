/// <reference types="react" />
import * as React from "react";
import { IProps } from "../../common/props";
export interface INavbarDividerProps extends React.HTMLProps<HTMLDivElement>, IProps {
}
export declare class NavbarDivider extends React.Component<INavbarDividerProps, {}> {
    static displayName: string;
    render(): JSX.Element;
}
