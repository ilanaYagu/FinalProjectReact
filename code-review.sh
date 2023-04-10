#!/bin/bash

export OPENAI_API_KEY=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

# Install the OpenAI API client
pip install openai

# Define the function to perform code review using the OpenAI API
function code_review {
    file=$1
    model=$2
    response=$(openai api completions.create \
        --engine $model \
        --prompt "Code review for $file" \
        --temperature 0.5 \
        --max-tokens 1024 \
        --stop "###")

    # Extract the suggested changes from the OpenAI API response
    suggested_changes=$(echo $response | jq -r '.choices[].text')

    # Print the suggested changes
    echo "Suggested changes for $file:"
    echo "$suggested_changes"
}

# Run code review on all JavaScript files in the src directory
for file in $(find src -type f -name "*.js"); do
    code_review $file "davinci-codex"
done
