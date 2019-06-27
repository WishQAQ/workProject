import React from 'react'
import * as style from './style/index.scss'
import { DragMove } from 'pkg/common/dragging'
import { AutoComplete, Button, Form, Input, Radio, Select } from 'antd'
import { CInputTableProps, InputTable } from 'pkg/common/inputTable'
import { SelectItem } from 'src/packages/ui/SelectItem'
import debug from 'debug'
import { FluxComponent } from '../../../../tools/flux/FluxComponent'
import { classifyModalService, ClassifyModalState } from '../../../../service/medical/tpl-maintenance/classify-modal'
import { FileVisitTypeDictEntityDict, MrGradingClassEntityHandMonitor } from '../../../../packages/entity/medical'

const tract = debug('trace:病历:medical')
const FormItem = Form.Item
const Option = Select.Option
const AutoCompleteOption = AutoComplete.Option
const RadioGroup = Radio.Group
export default class ClassifyModal extends FluxComponent<ClassifyModalState> {
    title = '模板分类'
    classifyModalService = classifyModalService

    /*
        // 保存提交事件
        onSubmit(err, value) {
            if (!err) {
                /!** 通过验证 *!/
                tract('Received values of form: ', value)
            }
        }
    
        // 数据集选择事件
        onInputTable1 = (v) => {
            const {formDataValue} = this.state
            formDataValue.dataSetId.value = v.data.drugName
            this.setState({
                formDataValue: formDataValue
            })
        }
        // 监控代码选择事件
        onInputTable2 = (v) => {
            const {formDataValue} = this.state
            formDataValue.monitorCode.value = v.data.drugName
            this.setState({
                formDataValue: formDataValue
            })
        }*/

    render() {
        let {
            classifyModalVisible,
            bdDsOptionList,
            bdDsDataList,
            data, dsName,
            dataTotal,
            fileVisitTypeDictList,
            mrGradingClassList
        } = this.state
        return (
            <div className={style.modalWrap}>
                <DragMove title="分类信息"
                          visible={classifyModalVisible}
                          footer="false"
                          className={`${style.classifyModal} ${style.tplMaintenanceModal}`}
                >
                    <ClassifyModalForm
                        formData={data}
                        dsName={dsName}
                        dataTotal={dataTotal}
                        bdDsDataList={bdDsDataList}
                        bdDsOptionList={bdDsOptionList}
                        mrGradingClassList={mrGradingClassList}
                        fileVisitTypeDictList={fileVisitTypeDictList}
                        onCancel={this.classifyModalService.onCancel}
                        inputTableCallBack={this.classifyModalService.inputTableCallBack}
                        onSubmit={this.classifyModalService.save as any}/>
                </DragMove>
            </div>
        )
    }
}

interface Props {
    form: any,
    onSubmit?: (val: object) => void,
    formData?: any,
    dsName?: string,
    dataTotal?: number,
    bdDsDataList?: any,
    bdDsOptionList?: any,
    onCancel?: () => void,
    mrGradingClassList?: MrGradingClassEntityHandMonitor[],
    fileVisitTypeDictList?: FileVisitTypeDictEntityDict[]
    inputTableCallBack?: (val: object) => void,
}

class VerifyForm extends React.Component <Props> {
    /** 点击保存 */
    handleSubmit = (e) => {
        /** 验证表单 */
        e.preventDefault()
        this.props.form.validateFieldsAndScroll(this.props.onSubmit)
    }

    render() {
        const { getFieldDecorator } = this.props.form
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    label="父类类型"
                >
                    {getFieldDecorator('parentMrClassName', {
                        rules: [{
                            required: false
                        }]
                    })(
                        <Input className={style.bodyInput} disabled={true}/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('dsCode', {
                        rules: [{
                            required: false
                        }]
                    })(
                        <Input type="hidden"/>
                    )}
                </FormItem>
                <FormItem
                    label="数据集ID"
                >
                    {getFieldDecorator('dsName', {
                        rules: [{
                            required: false
                        }]
                    })(
                        <InputTable
                            className={`${style.bodyInput} ${style.inputtable}`}
                            option={{
                                total: this.props.dataTotal,
                                columns: this.props.bdDsOptionList,
                                pageSize: 7,
                                showValue: 'dsName',
                                multiSaveKey: 'id'
                            }}
                            data={this.props.bdDsDataList ? this.props.bdDsDataList : []}
                            callBackMethods={this.props.inputTableCallBack}
                        />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('id', {
                        rules: [{
                            required: false
                        }]
                    })(
                        <Input type="hidden"/>
                    )}
                </FormItem>
                <FormItem
                    label="分类名字"
                >
                    {getFieldDecorator('mrClassName', {
                        rules: [{
                            required: true,
                            message: '请输入分类名字'
                        }]
                    })(
                        <Input className={style.bodyInput}/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('parentMrClassCode', {
                        rules: [{
                            required: false
                        }]
                    })(
                        <Input type="hidden"/>
                    )}
                </FormItem>
                <FormItem
                    label="打开方式"
                >
                    {getFieldDecorator('oneFileFlag', {
                        rules: [{
                            required: false

                        }]
                    })(
                        <RadioGroup>
                            <Radio key={0} value={0}>病历打开</Radio>
                            <Radio key={1} value={1}>病程打开</Radio>
                            <Radio key={2} value={2}>护理记录打开</Radio>
                        </RadioGroup>
                    )}
                </FormItem>
                <FormItem
                    label="分类类型"
                >
                    {getFieldDecorator('mrClassType', {
                        rules: [{
                            required: true,
                            message: '请输入分类类型'
                        }]
                    })(
                        <SelectItem
                            showSearch={true}
                            labelClass={style.classifyTypeLabel}
                            selectItemClass={style.classifyTypeSelItem}
                            selectClass={style.classifyTypeSel}
                        >
                            {
                                this.props.fileVisitTypeDictList.map((item, i) => {
                                    return (
                                        <Option key={item.id} value={item.id}>{item.fileVisitTypeName}</Option>
                                    )
                                })
                            }
                        </SelectItem>
                    )}
                </FormItem>
                <FormItem
                    label="监控代码"
                >
                    {getFieldDecorator('gradingClassCode', {
                        rules: [{
                            required: false,
                            message: '请输入监控代码'
                        }]
                    })(
                        <SelectItem
                            showSearch={true}
                            labelClass={style.classifyTypeLabel}
                            selectItemClass={style.classifyTypeSelItem}
                            selectClass={style.classifyTypeSel}
                        >
                            {
                                this.props.mrGradingClassList.map((item, i) => {
                                    return (
                                        <Option key={item.id} value={item.id}>{item.gradingClassName}</Option>
                                    )
                                })
                            }
                        </SelectItem>
                    )}
                </FormItem>
                <FormItem
                    label="排序号"
                >
                    {getFieldDecorator('mrSortNo', {
                        rules: [{
                            required: true,
                            pattern: /^\d{1}$/,
                            message: '请输入一位数排序号'
                        }]
                    })(
                        <Input className={style.bodyInput}/>
                    )}
                </FormItem>
                <FormItem>
                    <Button onClick={this.props.onCancel}>取消</Button>
                    <Button type="primary" htmlType="submit">保存</Button>
                </FormItem>
            </Form>
        )
    }
}

export const ClassifyModalForm = Form.create({
    mapPropsToFields(props: any) {
        return {
            id: Form.createFormField({
                value: props.formData.id
            }),
            parentMrClassCode: Form.createFormField({
                value: props.formData.parentMrClassCode
            }),
            parentMrClassName: Form.createFormField({
                value: props.formData.parentMrClassName
            }),
            dsName: Form.createFormField({
                value: props.formData.dsName
            }),
            dsCode: Form.createFormField({
                value: props.formData.dsCode
            }),
            mrClassName: Form.createFormField({
                value: props.formData.mrClassName
            }),
            mrClassType: Form.createFormField({
                value: props.formData.mrClassType
            }),
            oneFileFlag: Form.createFormField({
                value: props.formData.oneFileFlag ? props.formData.oneFileFlag : 0
            }),
            gradingClassCode: Form.createFormField({
                value: props.formData.gradingClassCode
            }),
            mrSortNo: Form.createFormField({
                value: props.formData.mrSortNo
            })
        }
    }
})(VerifyForm)
