#!/usr/bin/env bash
sonar-scanner \
  -Dsonar.projectKey=hieip-client-ts \
  -Dsonar.host.url=http://qube.oakhit.com \
  -Dsonar.login=20e3c67eb33193bcb45571b985d0f9cc0e3284eb \
  -Dsonar.issuesReport.html.enable=true \
  -Dsonar.sourceEncoding=utf-8 \
  -Dsonar.report.export.path=sonar-report.json \
  -Dsonar.analysis.mode=preview
