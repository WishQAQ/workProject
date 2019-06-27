#!/usr/bin/env bash
header=`git log --cherry-pick --right-only --decorate=no origin/development|head -n 1`
commit=`git log|grep "${header}"`
if [ "${commit}" = "" ]
then
echo git检查失败 你需要先合并development分支再提交合并请求
exit 1
else
echo git检查通过
fi