export interface ITransferBunkProps {
    currentValue?: string;
    targetValue?: string;
    currentItem?: any;
    targetResult?: any;
    onCurrentChange?: (value: string) => any;
    onTargetChange?: (value: string) => any;
    onHandleConfirm?: () => any;
}
