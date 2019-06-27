export interface IHeaderProps {
    onRecallChange?: () => any;
    onSwitchChange?: (checked: boolean) => any;
    onIntoChange?: () => any;
}

export interface IHeaderState {
    [propName: string]: any
}