#!/usr/bin/env bash
for line in ${FILE_LOCK}
do
    key=`echo ${line}|cut -d "=" -sf 1`
    value=`echo ${line}|cut -d "=" -sf 2`
    if [[ -n ${key} || -n ${value} ]];then
        sysOS=`uname -s`
        if [ ${sysOS} == "Darwin" ];then
            MD5=`md5 -q ${key}`
        elif [ ${sysOS} == "Linux" ];then
            MD5=`md5sum ${key}|cut -d ' ' -f1|xargs`
        else
            echo 无效的系统
            exit 2
        fi
        if [[ ${MD5} != ${value} ]];then
            echo 错误: ${key} 文件被修改 你不能修改这个文件
            echo 预期: \["${value}"]
            echo 结果: \["${MD5}"]
            exit 1
        fi
    fi
done

sh ci/git_stats_check.sh