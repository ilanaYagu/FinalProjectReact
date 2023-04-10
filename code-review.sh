#!/bin/bash


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

    # Add a comment to the pull request with the suggested changes
    pr_number=$(echo $GITHUB_REF | cut -d/ -f3)
    repo=$(basename `git rev-parse --show-toplevel`)
    api_url="https://api.github.com/repos/$GITHUB_REPOSITORY/issues/$pr_number/comments"
    body="Suggested changes for \`$file\`: \n\n$suggested_changes"
    curl -H "Authorization: token $MY_GITHUB_TOKEN" \
        --header "Content-Type: application/json" \
        --data "{\"body\":\"$body\"}" \
        $api_url
}



# Run code review on all JavaScript files in the src directory
for file in $(find src -type f -name "*.js"); do
    code_review $file "davinci-codex"
done
