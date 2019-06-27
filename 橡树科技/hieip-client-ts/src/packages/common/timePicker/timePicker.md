#公共时间组件

-可用参数
	
	/** 样式名 */
	className?: string;
	/** 第一个文本框显示的值 */
    oValue?: Date;
    /** 范围时间情况下，第二个文本框显示的值 */
    oValue2?: Date;
    /**
     * 是否加载组件的同时获取焦点 */
     * @default false
     */
    autoFocus?: boolean;
    /**
     * 是否使用范围时间选择器
     * @default false
     */
    isRange?: boolean;
    /** 输入时触发的外部事件 */
    dateChange?: (e: any) => void;
    /**
     * 时间格式
     * @default 'YYYY-MM-DD'
     /*
    format?: string;
    /** 最小时间 */
    minDate?: Date;
    /** 最大时间 */
    maxDate?: Date;
    /** 是否禁用 */
    disabled?: boolean;
    /** ref */
    ref?: any;