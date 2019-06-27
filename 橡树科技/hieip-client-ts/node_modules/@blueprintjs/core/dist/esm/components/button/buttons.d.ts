/// <reference types="react" />
import * as React from "react";
import { AbstractButton, IButtonProps } from "./abstractButton";
export { IButtonProps };
export declare class Button extends AbstractButton<HTMLButtonElement> {
    static displayName: string;
    render(): JSX.Element;
}
export declare const ButtonFactory: React.ComponentFactory<Readonly<{
    children?: React.ReactNode;
}> & Readonly<React.HTMLProps<HTMLButtonElement> & IButtonProps>, Button>;
export declare class AnchorButton extends AbstractButton<HTMLAnchorElement> {
    static displayName: string;
    render(): JSX.Element;
}
export declare const AnchorButtonFactory: React.ComponentFactory<Readonly<{
    children?: React.ReactNode;
}> & Readonly<React.HTMLProps<HTMLAnchorElement> & IButtonProps>, AnchorButton>;
