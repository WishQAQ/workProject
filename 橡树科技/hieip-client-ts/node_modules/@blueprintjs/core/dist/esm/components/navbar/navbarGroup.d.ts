/// <reference types="react" />
import * as React from "react";
import { IProps } from "../../common/props";
export interface INavbarGroupProps extends React.HTMLProps<HTMLDivElement>, IProps {
    /**
     * The side of the navbar on which the group should appear.
     * @default "left"
     */
    align?: "left" | "right";
}
export declare class NavbarGroup extends React.Component<INavbarGroupProps, {}> {
    static displayName: string;
    static defaultProps: INavbarGroupProps;
    render(): JSX.Element;
}
