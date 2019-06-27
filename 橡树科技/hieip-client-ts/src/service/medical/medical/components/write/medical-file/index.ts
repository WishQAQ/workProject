import { BaseService } from 'tools/flux/BaseService'
import debug from 'debug'
import { Page } from 'pkg/entity/medical'
import { keywordService } from '../keyword/index'
import { doctorService } from '../doctor/index'
import { contentWriteService } from '../content-write'

const log = debug('trace:病历:medical')

export interface MedicalFileState {
    editorState: EditorState
    pageHeader: EditorState
    pageFooter: EditorState
}
export interface EditorState {
    entityMap: object,
    blocks: Array<Blocks>
}
export interface Blocks {
    key: string,
    text: string,
    type: string,
    depth: number,
    inlineStyleRanges: Array<object>,
    entityRanges: Array<object>,
    data: object
}

class MedicalFileService extends BaseService<MedicalFileState> {
    defaultState = {
        editorState: {
            entityMap: {},
            blocks: [{
                key: 'e23a8',
                text: '身体',
                type: 'unstyled',
                depth: 0,
                inlineStyleRanges: [],
                entityRanges: [],
                data: {}
            }]
        },
        pageHeader: {
            entityMap: {},
            blocks: [{
                key: 'e23a89',
                text: '头部',
                type: 'unstyleds',
                depth: 0,
                inlineStyleRanges: [],
                entityRanges: [],
                data: {}
            }]
        },
        pageFooter: null
    }

    /**
     * 按钮集
     */
    btnClick = (type: string) => {
        log('当前点击按钮下标为 %s', type)
        /** 获取所有控件 control.getAllControl(false) */
        /** 获取所有控件 control.getAllControl(true) */
        /** 找到所有模板文本与对应的编码 control.everyTemplateText() */
        /** 返回编辑器的DOM page.medicalDom() */
    }
}

export const medicalFileService = new MedicalFileService('medicalFile')