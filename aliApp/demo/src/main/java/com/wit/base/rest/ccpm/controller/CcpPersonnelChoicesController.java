package com.wit.base.rest.ccpm.controller;

import com.alibaba.fastjson.JSON;
import com.jfinal.aop.Before;
import com.jfinal.ext.interceptor.GET;
import com.wit.base.rest.ccpm.dto.PersonnelChoicesDTO;
import com.wit.base.rest.ccpm.service.CcpPersonnelChoicesServiceImpl;
import com.wit.base.rest.ccpm.service.ICcpPersonnelChoicesService;
import com.wit.base.rest.ccpm.utils.BaseException;
import com.wit.base.rest.ccpm.utils.DataTemplate;
import com.wit.base.rest.ccpm.utils.ObjectUtil;
import io.jboot.web.controller.JbootController;
import io.jboot.web.controller.annotation.RequestMapping;
import org.apache.log4j.Logger;

/**
 * 人员选择控制器
 */
@RequestMapping("/api/v1/fee/personnelChoices")
public class CcpPersonnelChoicesController extends JbootController {
    private Logger log = Logger.getLogger(CcpPersonnelChoicesController.class);

    //人员选择逻辑层
    ICcpPersonnelChoicesService choicesService = new CcpPersonnelChoicesServiceImpl();

    /**
     * 获取查询类型
     */
    @Before(GET.class)
    public void getQueryType() {
        String userKey = getPara("user_key");// TODO 测试传入user_key，需删除
        String identity = getPara("identity");//业务标识
        try {
            String choicesType = choicesService.getQueryType(userKey, identity);
            renderJson(DataTemplate.wrapSuccessData(JSON.parse(choicesType)));
        } catch (BaseException e) {
            renderJson(DataTemplate.wrapErrorData(e.getMessage()));
        }
    }

    /**
     * 查询
     */
    @Before(GET.class)
    public void query(){
        String userKey = getPara("user_key");// TODO 测试传入user_key，需删除
        String identity = getPara("identity");//业务标识
        String orgCode = getPara("org_code");//组织code
        String orgGroupKey = getPara("org_group_key");//组织code
        String pageStr = getPara("page");//当前页
        String sizeStr = getPara("page_size");//当前页显示条数
        String pagePerStr = getPara("page_excp_per");//当前页
        String sizePerStr = getPara("size_excp_per");//当前页显示条数
        String memName = getPara("mem_name");//党员姓名
        String joinPartyTime = getPara("join_party_time");//加入组织时间
        String sexStr = getPara("sex");//性别，0为女，1为男
        String educationLevelKey = getPara("education_level_key");//学历key，格式为逗号拼接
        String ageStr = getPara("age");//年龄，格式为  10-20,30-40
        String orgCodeRange = getPara("org_code_range");//业务模块需要选择的组织范围
        String keyword = getPara("keyword");//查询组织或者人员名
        String org = getPara("org");//关键字查询组织或者人员1:组织
        if(!ObjectUtil.stringIsEmptyOrUndefined(keyword)){//关键字查询不为空，业务标识默认为条件查询
            identity = "condition";
            if("1".equals(org)){
                identity = "org";
            }
        }
        //标识必须存在
        if(ObjectUtil.stringIsEmptyOrUndefined(identity)){
            renderJson(DataTemplate.wrapErrorData("业务标识不能为空"));
            return;
        }
        int page = 1;//默认为第一页
        int size = 10;//默认显示10条
        int pagePer = 1;//不在党小组的异常人员分页
        int sizePer = 10;//不在党小组的异常人员分页
        try {
            if(!ObjectUtil.stringIsEmptyOrUndefined(pageStr)){
                page = Integer.parseInt(pageStr);
            }
            if(!ObjectUtil.stringIsEmptyOrUndefined(sizeStr)){
                size = Integer.parseInt(sizeStr);
            }
            if(!ObjectUtil.stringIsEmptyOrUndefined(pagePerStr)){
                pagePer = Integer.parseInt(pagePerStr);
            }
            if(!ObjectUtil.stringIsEmptyOrUndefined(sizePerStr)){
                sizePer = Integer.parseInt(sizePerStr);
            }
        }catch (Exception e){
            renderJson(DataTemplate.wrapErrorData("分页参数格式错误"));
            return;
        }
        Integer sex = null;
        try {
            if(!ObjectUtil.stringIsEmptyOrUndefined(sexStr)){
                sex = Integer.parseInt(sexStr);
            }
        }catch (Exception e){
            renderJson(DataTemplate.wrapErrorData("性别数据格式错误"));
            return;
        }
        int[][] age = null;//年龄段
        if(!ObjectUtil.stringIsEmptyOrUndefined(ageStr)){
            //年龄，格式为  10-20,30-40
            String[] ageRange = ageStr.split(",");
            age = new int[ageRange.length][2];
            for (int i = 0; i < ageRange.length; i++) {
                String[] ageRangeArray = ageRange[i].split("-");
                for (int j = 0; j < 2; j++) {//格式已确定,下标0开始，1为结束
                    try {
                        age[i][j] = Integer.parseInt(ageRangeArray[j]);
                    }catch (Exception e){
                        renderJson(DataTemplate.wrapErrorData("年龄范围数据格式错误"));
                        return;
                    }
                }
            }
        }
        try {
            PersonnelChoicesDTO dto = new PersonnelChoicesDTO(page,size,orgCode,identity,memName,joinPartyTime,sex,age,educationLevelKey,
                    orgGroupKey,orgCodeRange,pagePer,sizePer,keyword);
            choicesService.query(userKey, dto);//传入的dto作为返回数据
            renderJson(DataTemplate.wrapSuccessData(dto));
        } catch (BaseException e) {
            renderJson(DataTemplate.wrapErrorData(e.getMessage()));
        }catch (Exception e){
            log.error("选择器系统异常",e);
            renderJson(DataTemplate.wrapErrorData("选择器系统异常"));
        }

    }

}
