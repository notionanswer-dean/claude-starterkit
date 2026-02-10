#!/bin/bash
# Claude 작업 완료 시 macOS 네이티브 알림 전송
osascript -e 'display notification "Claude 작업이 완료되었습니다." with title "Claude Code" sound name "Glass"'
