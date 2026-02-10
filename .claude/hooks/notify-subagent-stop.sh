#!/bin/bash
# 서브에이전트 작업 완료 시 에이전트 타입을 포함한 macOS 알림 전송
INPUT=$(cat)
AGENT_TYPE=$(echo "$INPUT" | jq -r '.agent_type // "unknown"')
osascript -e "display notification \"${AGENT_TYPE} 에이전트 작업이 완료되었습니다.\" with title \"Claude Code\" sound name \"Purr\""
