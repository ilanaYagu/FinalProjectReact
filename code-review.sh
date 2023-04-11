#!/bin/bash

REPOSITORY_CODE=$(find src -type f -name "*.ts" -o -name "*.tsx" | xargs cat)
OPENAI_API_KEY=$1

curl -s -H "Content-Type: application/json" \
     -H "Authorization: Bearer $OPENAI_API_KEY" \
     -d "{\"model\": \"text-davinci-002\", \"prompt\": \"Review the following TypeScript code in a React application:\n\n${REPOSITORY_CODE}\", \"max_tokens\": 200, \"n\": 1, \"stop\": null, \"temperature\": 0.5, \"top_p\": 1, \"frequency_penalty\": 0, \"presence_penalty\": 0}" \
     -X POST https://api.openai.com/v1/engines/davinci-codex/completions \
     > review.json

