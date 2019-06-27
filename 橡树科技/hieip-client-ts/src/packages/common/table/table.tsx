/**
 * Created by mod on 2017/12/12.
 *
 *  封装ag-table
 *  继承 GridOptions 参数
 *  常用 api 底部
 */

import * as React from 'react'
import {is, Map} from 'immutable'
import {AgGridReact} from 'ag-grid-react'
import {TableProps} from './tabletype'
import './style/ag.less'
import * as style from './style/table.scss'
import {Dropdown, Menu, Pagination} from 'antd'

/** state */
interface TableState {
  /** 右击菜单是否显示 */
  isVisible?: boolean
  /** 右击当前的行 */
  rowIndex?: number
  /** 加载中图标 */
  components?: any
  /** 表格api */
  tbapi?: any
  /** 表格无数据显示样式  */
  overlayNoRowsTemplate?: string
  /** 表格加载中显示样式  */
  overlayLoadingTemplate?: string
  /** 表格分页总条数  */
  total?: number
  /** 表格分页每页数量  */
  pageSize?: number
}

/** ag-grid-react */
export class Table extends React.Component<TableProps, TableState> {
  static defaultProps = {
    enableColResize: true,
    suppressCellSelection: true,
    enableSorting: false,
    headerHeight: 30,
    rowHeight: 30,
    animateRows: true,
    suppressDragLeaveHidesColumns: true,
    rowSelection: 'single',
    cacheOverflowSize: 1,
    maxConcurrentDatasourceRequests: 1,
    maxBlocksInCache: 2,
  }

  tbapi: any

  /** @param args */
  constructor(args) {
    super(args)
    this.state = {
      isVisible: true,
      pageSize: this.props.pageSize,
      total: this.props.total,
      overlayLoadingTemplate: `<span class="${style.ag_table_zwsj}">努力加载中</span>`,
      overlayNoRowsTemplate: `<div class="${style.ag_table_zwsj}">暂无数据</div>`
    }

    this.onGridReady = this.onGridReady.bind(this)
    this.onChangePag = this.onChangePag.bind(this)
    this.cotmunuClick = this.cotmunuClick.bind(this)
    this.myCellContextMenu = this.myCellContextMenu.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (!is(nextProps.rowData, this.state.pageSize)) {
      this.setState({
        pageSize: nextProps.pageSize,
        total: nextProps.total
      })
    }
  }

  /** 判断是否更新 */
  shouldComponentUpdate(nextProps) {
    return Map(nextProps) !== Map(this.props)
  }

  /** 初始化 菜单 */
  componentDidMount() {
    setTimeout(() => {
      this.setState({isVisible: false})
    }, 0)
    window.addEventListener('mousedown', this.widClickvisF)
  }

  /** 移除点击事件 */
  componentWillUnmount() {
    window.removeEventListener('mousedown', this.widClickvisF)
  }

  /** render @returns {any} */
  render(): JSX.Element {
    const {agtableClassName, clickpage, pageclassName, ContextMenuList, children, ...other} = this.props
    const others: any = other
    delete others.onGridReady
    return (
      <div style={{height: '100%', width: '100%'}}>
        <div className={`${style.ag_table} ${agtableClassName} ag-fresh`}
             onMouseDown={this.myCellContextMenu}
             onScroll={this.onScrolls}
             style={{height: clickpage ? 'calc(100% - 2rem)' : '100%', width: '100%'}}>
          <AgGridReact
            onGridReady={this.onGridReady}
            overlayLoadingTemplate={this.state.overlayLoadingTemplate}
            overlayNoRowsTemplate={this.state.overlayNoRowsTemplate}
            {...others}
          >
            {children}
          </AgGridReact>
          {clickpage ?
            <div className={`${style.table_pageation} ${pageclassName || ''}`}>
              <Pagination onChange={this.onChangePag}
                          size={'small'}
                          defaultCurrent={1}
                          total={this.state.total || 1}
                          pageSize={this.state.pageSize || 0}/>
            </div> : null}
          {
            ContextMenuList && ContextMenuList.length ?
              <Dropdown overlay={this.menuNodes()}
                        visible={this.state.isVisible}
                        placement="bottomLeft"
                        className="dropdown">
                <div style={{display: 'none'}}/>
              </Dropdown>
              : null
          }
        </div>
      </div>
    )
  }

  /** 点击右键关闭菜单， 下标返回给父级组件 */
  private cotmunuClick(e) {
    const {menuClik, menuclickShow} = this.props
    const {rowIndex} = this.state
    if (!menuclickShow) {
      this.setState({isVisible: false})
    }
    if (menuClik) {
      menuClik(parseInt(e.key, 0), rowIndex)
    }
  }

  /** 生成菜单列表 */
  private munonodes = (arr) => {
    return arr.map((v, index) => {
      return <Menu.Item key={index}><span>{v}</span></Menu.Item>
    })
  }
  /** 生成菜单列表 */
  private menuNodes = () => {
    const {ContextMenuList} = this.props
    if (ContextMenuList instanceof Array) {
      if (ContextMenuList && ContextMenuList.length) {
        return <Menu style={{display: 'none'}} className={`${this.props.menuclassName} ${style.table_Rmenu}`}
                     onClick={this.cotmunuClick}>{this.munonodes(ContextMenuList)}</Menu>
      }
    } else {
      return ContextMenuList
    }
  }

  /** 获取表格 api */
  private onGridReady(params) {
    const {customWith, onGridReady} = this.props
    /** 默认为 T ，自适应宽度 */
    if (!customWith) {
      params.api.sizeColumnsToFit()
    }
    this.tbapi = params
    if (onGridReady) {
      onGridReady(params)
    }
  }

  /** 右击事件 */
  private myCellContextMenu(e) {
    const {ContextMenuList, menuShow} = this.props
    if (ContextMenuList && e.buttons === 2) {
      e.stopPropagation()
      e.preventDefault()
      let tbrowIndex: number
      const rowIndex = e.target.parentNode.getAttribute('row-index')
      let menuDom: any = null
      const menuAll = document.querySelectorAll('.ant-dropdown')
      /** 准确找到菜单位置 */
      for (let i = 0; i < menuAll.length; i++) {
        if (menuAll[i].children[0].className.indexOf(this.props.menuclassName) > -1) menuDom = menuAll[i]
      }
      if (menuDom) {
        const ul = menuDom.children[0]

        const Wwidth: number = window.innerWidth
        const Wheigth: number = window.innerHeight
        const Wbox: number = ul.clientWidth || 150
        const Hbox: number = ul.clientHeight || 80

        ul.style.display = 'block'
        /** 限制菜单位置 */
        ul.style.left = e.clientX + Wbox > Wwidth ? Wwidth - Wbox : e.clientX + 'px'
        ul.style.top = e.clientY + Hbox > Wheigth ? Wheigth - Hbox : e.clientY + 'px'
        tbrowIndex = parseInt(rowIndex === null ? -1 : rowIndex, 0)
      }

      if (!(/ag-header/.test(e.target.parentNode.className))) {
        if(this.tbapi){
          this.tbapi.api.forEachNode(function (node) {
            if (node.rowIndex === tbrowIndex) node.setSelected(true)
          })
        }
        if (menuShow) {
          this.menuOpen(tbrowIndex)
        } else {
          if (typeof rowIndex !== 'object') {
            this.menuOpen(tbrowIndex)
          }
        }
      }
    }
  }

  /**
   * 打开菜单
   * @param tbrowIndex
   */
  private menuOpen = (tbrowIndex) => {
    const {tableContextClick} = this.props
    if (tableContextClick) {
      tableContextClick(tbrowIndex).then(() => {
        setTimeout(() => {
          this.setState({isVisible: true, rowIndex: tbrowIndex})
        }, 0)
      })
    } else {
      this.setState({isVisible: true, rowIndex: tbrowIndex})
    }
  }

  /** 移除右键菜单 */
  private widClickvisF = (e) => {
    const {ContextMenuList} = this.props
    const {innerText} = e.target
    if (ContextMenuList) {
      if (innerText) {
        if (this.state.isVisible && ContextMenuList.toString().indexOf(e.target.innerText) === -1) {
          this.setState({isVisible: !1})
        }
      } else {
        this.setState({isVisible: !1})
      }
    }
  }

  /**
   * 滚动关闭右键菜单
   */
  private onScrolls = () => {
    this.setState({isVisible: !1})
  }

  /**
   * 点击分页
   * @param page
   */
  private onChangePag(page) {
    this.props.onShowSizeChange(page)
  }
}