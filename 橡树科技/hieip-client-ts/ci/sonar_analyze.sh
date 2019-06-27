#!/usr/bin/env bash

echo now dir: `pwd`

sonar-scanner \
  -Dsonar.projectKey=hieip-client-ts \
  -Dsonar.host.url=http://qube.oakhit.com \
  -Dsonar.login=${sonar_login} \
  -Dsonar.gitlab.commit_sha=${CI_BUILD_REF} \
  -Dsonar.gitlab.ref_name=${CI_BUILD_REF_NAME} \
  -Dsonar.gitlab.project_id=${CI_PROJECT_PATH} \
  -Dsonar.issuesReport.html.enable=true \
  -Dsonar.sourceEncoding=utf-8 \
  -Dsonar.report.export.path=sonar-report.json \
  -Dsonar.analysis.mode=preview

if [ $? -eq 0 ]; then
    echo "sonarqube code-analyze over."
else
    exit 1
fi