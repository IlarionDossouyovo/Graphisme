# Order Processing Automation

## Description
This automation checks for new pending orders every 5 minutes and processes them automatically through the multi-agent workflow.

## Trigger
- **Type**: Cron
- **Schedule**: `*/5 * * * *` (every 5 minutes)
- **Timezone**: Africa/Porto-Novo

## Action
1. Call the order processing API: `POST /api/automation/trigger` with `{"action": "process_all"}`
2. Log the results
3. Send summary to admin (optional)

## Requirements
- Ollama must be running with models: llama3.2:latest, llama3.1:8b, qwen2.5-coder:7b
- Application must be accessible at the configured URL

## Usage
Deploy via OpenHands Cloud with the prompt preset:
```bash
curl -X POST "${OPENHANDS_HOST}/api/automation/v1/preset/prompt" \
  -H "Authorization: Bearer ${OPENHANDS_API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Order Processor - Graphisme",
    "prompt": "Call the API at YOUR_APP_URL/api/automation/trigger with action=process_all to process any pending orders. Report the number of orders processed.",
    "trigger": {"type": "cron", "schedule": "*/5 * * * *", "timezone": "Africa/Porto-Novo"}
  }'
```
