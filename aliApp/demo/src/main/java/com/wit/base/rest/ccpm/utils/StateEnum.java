package com.wit.base.rest.ccpm.utils;

/**
 * Created by zj on 2018/12/7.
 */
public enum  StateEnum{

//-2:已撤销,-1:未通过,0未上报,1已上报且未审核,2已上报且审核中,3已通过）',
    all,
    revoke,
    no_pass,
    no_report,
    report_no_audit,
    pass,

}
