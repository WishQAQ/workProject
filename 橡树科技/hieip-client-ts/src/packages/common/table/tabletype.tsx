import {ColDef, ColGroupDef} from 'ag-grid/dist/lib/entities/colDef'
import {GridOptions} from 'ag-grid/dist/lib/entities/gridOptions'

/** 表头类型 */
export interface ColumnDefs {
  columnDefs?: (ColDef | ColGroupDef)[]
}

export {ColDef, ColGroupDef}

/**  TableStae  */
export interface TableProps extends GridOptions {
  /** 是否自适应宽度 */
  customWith?: boolean,
  /** table classNmae */
  agtableClassName?: string

  /** 右击菜单 clss  必须  同页面多个表格不能一样 */
  menuclassName?: string
  /** 右击菜单宽度  默认 150 */
  menuWidth?: number
  /** 右击菜单列表数据 */
  ContextMenuList?: (string | any)[]
  /**  右击菜单事件 */
  menuClik?: (menuIndex?: number, dataIndex?: number) => void
  /** 在表格空白处右键是否有效  */
  menuShow?: boolean
  /** 右键点击后是否消失 */
  menuclickShow?: boolean
  /** table 右键事件 */
  tableContextClick?: (dataIndex: number) => Promise<any>

  /** 是否启用分页 */
  clickpage?: boolean
  /** 点击分页的calssName */
  pageclassName?: string
  /**  点击分页事件  */
  onShowSizeChange?: (page: number) => void
  /**  每页条数 */
  pageSize?: number
  /** 数据总数 */
  total?: number
}

/****************************************************************
 * 底部看 ag 表格 参数注释 !*
 *************************************************************** */

/**  表格参数注释 */
interface TbaState {
  /** 表头 */
  columnDefs: any,
  /** 数据源 */
  rowData: any,
  /** 设置为true以允许通过在列标题边缘处拖动鼠标来调整列的大小。 */
  enableColResize: boolean
  /** 如果为true，则单元格将不可选。这意味着单击单元格时单元格不会获得键盘焦点 */
  suppressCellSelection: boolean,
  /** 单击列标题 排序 */
  enableSorting: boolean,
  /** 组头 */
  groupHeaders: boolean
  /** 如果为true，则当您将一列拖出网格时，该列不会被隐藏。 */
  suppressDragLeaveHidesColumns: boolean
  /** 行高 */
  rowHeight: number,
  /** single 或 multiple */
  rowSelection: string,
  /** 动画 */
  animateRows: boolean
  /** 获取新数据不会滚动到顶部 */
  suppressScrollOnNewData: boolean
  /** 设置为true以启用对单元格的单击编辑，单击即可开始编辑 */
  singleClickEdit: boolean
  /** 网格失去焦点时停止单元格编辑 */
  stopEditingWhenGridLosesFocus: boolean

  /** 无线滚动  底部预留还剩多少数据的时候加载    ！默认2 */
  rowBuffer: number
  /** 无线滚动  行模型 数据加载方式  */
  rowModelType: string
  /** 无线滚动  初始显示的行 */
  infiniteInitialRowCount: number

  /**  建议使用自定义分页  */
  /** 是否启用分页 */
  pagination: boolean
  /** 每页加载多少行 如果paginationAutoPageSize 指定，则忽略此属性 */
  paginationPageSize: number
  /** True - 每页加载的行数由ag-Grid自动调整, False（默认） - 使用 paginationPageSize */
  paginationAutoPageSize: boolean
  /** 值改变高亮显示 */
  enableCellChangeFlash: boolean

  /** 单机事件 */
  onCellClicked?(event?: any): void

  /** 双击事件 */
  onCellDoubleClicked?(event?: any): void

  /** 表格加载完后执行 */
  onGridReady?(event?: any): void

  /** 拿到表格所以参数 */
  onRowSelected?(event?: any): void

  /** 单元格右键单击 */
  onCellContextMenu?(event?: any): void

  /** 回掉事件 */
  /** 选择所有行 */
  selectAll(): void

  /** 清除所有行选择 */
  deselectAll(): void
}

/** 表头参数 */
interface Cloumes {
  /** 表头显示名 */
  headerName: string
  /** 字段明 */
  field: string
  /** */
  tooltipField: string
  /** width */
  width: 50
  /** 是否可编辑 */
  editable: true

  /** headerowclass 名称 */
  cellClass: (params: any) => string

  /**  */
  valueFormatter: (params: any) => string
}

/**  更多参数  */
/**  https://www.ag-grid.com/javascript-grid-properties/#gsc.tab=0      */
