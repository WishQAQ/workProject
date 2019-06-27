/// <reference types="react" />
import * as React from "react";
import { IProps } from "../../common/props";
export interface IFileUploadProps extends React.AllHTMLAttributes<HTMLLabelElement>, IProps {
    /**
     * Whether the file upload is non-interactive.
     * Setting this to `true` will automatically disable the child input too.
     */
    disabled?: boolean;
    /**
     * Whether the file upload should take up the full width of its container.
     */
    fill?: boolean;
    /**
     * The props to pass to the child input.
     * `disabled` will be ignored in favor of the top-level prop.
     * `type` will be ignored, because the input _must_ be `type="file"`.
     * Pass `onChange` here to be notified when the user uploads a file.
     */
    inputProps?: React.HTMLProps<HTMLInputElement>;
    /**
     * Whether the file upload should appear with large styling.
     */
    large?: boolean;
    /**
     * Callback invoked on `input` `change` events.
     *
     * This callback is offered as a convenience; it is equivalent to passing
     * `onChange` to `inputProps`.
     *
     * __Note:__ If you pass `onChange` as a top-level prop, it will be passed
     * to the wrapping `label` rather than the `input`, which may not be what
     * you expect.
     */
    onInputChange?: React.FormEventHandler<HTMLInputElement>;
    /**
     * The text to display.
     * @default "Choose file..."
     */
    text?: string;
}
export declare class FileUpload extends React.Component<IFileUploadProps, {}> {
    static displayName: string;
    static defaultProps: IFileUploadProps;
    render(): JSX.Element;
    private handleInputChange;
}
export declare const FileUploadFactory: React.ComponentFactory<Readonly<{
    children?: React.ReactNode;
}> & Readonly<IFileUploadProps>, FileUpload>;
