type positionType = 'top' | 'bottom' | 'left' | 'right';

export interface IDrawerProps {
    /** 开启和关闭侧边栏的标志 */
    open: boolean;
    /** 是否开启蒙层 */
    isOverlay?: boolean;
    /** 侧边栏滑出位置 */
    position?: positionType,
    /** 关闭侧边栏执行后的回调函数 */
    onClose?: (v: boolean) => any,
    /** 开启侧边栏后执行的回调函数 */
    onOpen?: (v: boolean) => any,
    /** 蒙层容器类名 */
    overlayClass?: string,
    /** 侧边栏容器类名 */
    drawerClass?: string,
}
