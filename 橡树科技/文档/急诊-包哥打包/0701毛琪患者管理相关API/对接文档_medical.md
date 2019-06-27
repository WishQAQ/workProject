- 数据结构

  - 系统参数->病历简单元素-文本框 SeInputItemInfo

    | 字段               | 类型     | 注释       |
    | ---------------- | ------ | -------- |
    | elementId        | Long   | 元素id     |
    | tipsText         | String | 提示内容     |
    | isNum            | String | 是否为数字    |
    | isCheckMaxValue  | String | 是否检查最大值  |
    | isCheckMinValue  | String | 是否检查最小值  |
    | isCheckMaxLength | String | 是否检查最大长度 |
    | isCheckMinLength | String | 是否检查最小长度 |
    | isMust           | String | 是否为必输入   |
    | maxValue         | Int    | 最大值      |
    | minValue         | Int    | 最小值      |
    | maxLength        | Int    | 最大长度     |
    | minLength        | Int    | 最小长度     |
    | unit             | String |          |

  - 系统参数->病历简单元素-下拉选择框 SeSelectItemList

    | 字段        | 类型     | 注释   |
    | --------- | ------ | ---- |
    | elementId | Long   | 元素id |
    | serialNo  | Long   | 序号   |
    | name      | String | 下拉名  |
    | inputCode | String | 输入码  |
    | mrContent | String |      |

  - 系统参数->病历简单元素主表 SimpleElementMaster

  | 字段             | 类型                             | 注释                                |
  | -------------- | ------------------------------ | --------------------------------- |
  | parentId       | Long                           | 父类id                              |
  | serialNo       | Long                           | 序号                                |
  | is_dir         | Int                            | 是否为目录                             |
  | name           | String                         | 元素名                               |
  | type           | Int                            | 元素类型 -1: 目录 1:下拉单选 2:文本输入  5:下拉多选 |
  | children       | ArrayList<SimpleElementMaster> | 子目录集合                             |
  | selectChildren | List<SeSelectItemList>         | 下拉子类                              |
  | inputElement   | SeInputItemInfo                | 文本子类                              |

  - 系统参数->病历复杂元素子表 ComplexElementListDoc

  | 字段        | 类型     | 注释   |
  | --------- | ------ | ---- |
  | elementId | Long   |      |
  | serialNo  | Long   |      |
  | itemName  | String |      |
  | inputCode | String |      |
  | mrContent | String |      |

  - 系统参数->病历复杂元素主表 ComplexElementMaster

  | 字段             | 类型                              | 注释                |
  | -------------- | ------------------------------- | ----------------- |
  | parentId       | Long                            | 父类id              |
  | serialNo       | Long                            | 序号                |
  | isDir          | Int                             | 是否为目录 0否          |
  | name           | String                          | 元素名               |
  | type           | Int                             | 类型   -1：目录 7：复杂元素 |
  | children       | ArrayList<ComplexElementMaster> | 子菜单集合             |
  | selectChildren | List<ComplexElementListDoc>     | 下拉集合              |


  - 系统参数->病历模板表 MrTemplate

| 字段             | 类型     | 注释                                    |
| -------------- | ------ | ------------------------------------- |
| name           | String | 病历模板名                                 |
| serialNo       | Long   | 序号                                    |
| type           | String | 类型                                    |
| formView       | Int    | 是否表单模式 0:否 1:是                        |
| section        | String |                                       |
| objectData     | String | 存储病历模板                                |
| parentId       | Long   | 上级id                                  |
| clinicNote     | String |                                       |
| deptCode       | String | 科室编号                                  |
| deptName       | String | 科室名                                   |
| creator        | String | 创建者                                   |
| creatorName    | String | 创建者名                                  |
| creatorTime    | Date   | 创建时间                                  |
| mrThemeClassId | Long   | 病历主题类型,Dict_MRThemeClass.MRThemeClass |


 - 系统参数->病历目录文件夹 MrTypeDict

| 字段               | 类型                    | 注释     |
| ---------------- | --------------------- | ------ |
| mrTypeCode       | Int                   | 节点代码   |
| parentId         | Long                  | 父节点id  |
| mrTypeName       | String                | 节点名    |
| mrClass          | String                |        |
| jobClass         | String                |        |
| serial_no        | Long                  | 序号     |
| ownersection     | String                |        |
| deptCode         | String                | 科室code |
| deptName         | String                | 科室名    |
| createTime       | Date                  | 创建时间   |
| creator          | String                | 创建者    |
| creatorName      | String                | 创建者名   |
| mrThemeClassId   | Long                  | 主题类型   |
| children         | ArrayList<MrTypeDict> | 子文件    |
| templateChildren | ArrayList<MrTemplate> | 子模板    |

 - 电子病历->病历文件索引表 MrFileIndex

| 字段            | 类型      | 注释             |
| ------------- | ------- | -------------- |
| mrFileId      | Long    | 病历模板id         |
| mrClass       | String  |                |
| patientId     | String  | 患者标识           |
| visitId       | String  | 就诊id           |
| visitDate     | Date    | 就诊时间           |
| mrType        | String  | 病历模板类型(一级文件夹名) |
| mrFileName    | String  | 自定义病历文件名       |
| mrContent     | String  | 病历内容 4000      |
| htmlFilePath  | String  | 病历html地址       |
| formView      | Long    | 是否表单模式 0:否 1:是 |
| creator       | String  | 创建者            |
| createDate    | Date    | 创建时间           |
| updateUser    | String  | 修改者            |
| updateDate    | Date    | 修改时间           |
| deleteUser    | String  | 删除者            |
| deleteDate    | Date    | 删除时间           |
| isDel         | Boolean | 是否删除 true是     |
| mrNo          | Long    | 病案号            |
| pvId          | Long    |                |
| qualityStatus | Int     |                |

- 路由

 - 系统参数-简单元素维护路由 simpleElementController  url: post:/sysParam/simpleElement/

   | URL                | 参数                                       | 返回值                       | 注释                                  |
   | ------------------ | ---------------------------------------- | ------------------------- | ----------------------------------- |
   | findAll            | id: Long                                 | List<SimpleElementMaster> | 查询全部简单元素目录 1                        |
   | findById           | id: Long                                 | SimpleElementMaster       | 根据简单元素id查询简单元素主表（包含相应的下拉/文本） 2      |
   | findSelectById     | id: Long                                 | SeSelectItemList          | 根据下拉id查询简单元素下拉 3                    |
   | saveOrUpdateSelect | seSelectItemList: SeSelectItemList       |                           | 添加/修改简单元素下拉 4                       |
   | saveOrUpdate       | simpleElementMaster: SimpleElementMaster |                           | 添加/修改 简单元素(或简单元素+文本) 6 (+4)->7下拉  8 |
   | delete             | id: Long                                 |                           | 删除简单元素/ 简单元素+下拉/文本 9                |
   | deleteSelect       | id: Long                                 |                           | 根据下拉id删除简单元素下拉 5                    |
   | judgeElement       | id: Long                                 | true有 false 没有            | 判断目录文件下是否有菜单 true是                  |
   | findLikeByName     | name: String                             |                           | 根据简单元素名模糊查询简单元素                     |

 - 系统参数-病历模板路由 mrThemeController  url: post:/sysParam/mrTheme/

   | URL              | 参数                     | 返回值              | 注释               |
   | ---------------- | ---------------------- | ---------------- | ---------------- |
   | findAll          |                        | List<MrTypeDict> | 查询目录             |
   | findTpltById     | id: Long               | MrTypeDict       | 根据模板id查询病历模板     |
   | findById         | id: Long               | MrTemplate       | 根据子文件夹id查询病历子文件夹 |
   | saveOrUpdateTplt | mrTemplate: MrTemplate |                  | 添加或修改模板          |
   | saveOrUpdate     | mrTypeDict: MrTypeDict |                  | 添加或修改子文件夹        |
   | deleteTple       | id: Long               |                  | 添加或修改子文件夹        |
   | delete           | id: Long               |                  | 删除子文件夹           |
   | judgeType        | id: Long               | true有 false 没有   | 判断子目录下是否有文件/模板   |

 - 系统参数-复杂病历维护路由 complexElementController  url: post:/sysParam/complexElement/

   | URL                | 参数                                       | 返回值  | 注释                   |
   | ------------------ | ---------------------------------------- | ---- | -------------------- |
   | judgeElement       | id: Long                                 |      | 判断目录文件下是否有菜单 true是   |
   | deleteSelect       | id: Long                                 |      | 根据下拉id删除复杂病历元素下拉 6   |
   | delete             | id: Long                                 |      | 根据元素id删除元素及相关下拉 8    |
   | saveOrUpdateSelect | complexElementListDoc: ComplexElementListDoc |      | 添加/修改复杂病历元素下拉 4+5    |
   | saveOrUpdate       | complexElementMaster: ComplexElementMaster |      | 添加/修改 主元素/目录 9+7     |
   | findSelectById     | id: Long                                 |      | 根据下拉id查询复杂病历元素下拉 3   |
   | findAll            |                                          |      | 查询全部元素 目录 1          |
   | findById           | id: Long                                 |      | 根据元素id查询 2           |
   | findLikeByName     | name: String                             |      | 根据复杂元素name模糊查询复杂病历元素 |

 - 电子病历-病历文件索引路由 mrFileIndexController  url: post:/medicalRecord/

   | URL          | 参数                                       | 返回值               | 注释           |
   | ------------ | ---------------------------------------- | ----------------- | ------------ |
   | findById     | patientId: String, visitId: String, visitDate: Date | List<MrFileIndex> | 查询该患者下未删除的病历 |
   | findAllById  | patientId: String, visitId: String, visitDate: Date | List<MrFileIndex> | 查询该患者下全部病历   |
   | saveOrUpdate | mrFileIndex: MrFileIndex                 |                   | 添加或修改病历      |
   | delete       | id: Long, deleteUser: String             |                   | 根据病历id删除病历   |