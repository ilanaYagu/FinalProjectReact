const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios');
const detectLanguage = require('language-detect');
const HttpsProxyAgent = require('https-proxy-agent');

function getConfigWithProxy(config) {
    const updatedConfig = config || {};
    if (process.env.OPENAI_PROXY) {
        core.debug(`Using proxy: ${process.env.OPENAI_PROXY}`);
        updatedConfig.proxy = false;
        updatedConfig.httpsAgent = new HttpsProxyAgent(process.env.OPENAI_PROXY);
    }
    return updatedConfig;
}

async function performCodeReview() {
    try {
        // Get input values
        const inputs = {
            programmingLanguage: core.getInput('PROGRAMMING_LANGUAGE'),
            openaiToken: core.getInput('OPENAI_TOKEN'),
            fullReviewComment: core.getInput('FULL_REVIEW_COMMENT'),
            reviewCommentPrefix: core.getInput('REVIEW_COMMENT_PREFIX'),
            githubToken: core.getInput('GITHUB_TOKEN'),
            githubBaseURL: core.getInput('GITHUB_BASE_URL') || process.env.GITHUB_API_URL,
            promptTemplate: core.getInput('PROMPT_TEMPLATE'),
            maxCodeLength: core.getInput('MAX_CODE_LENGTH'),
            answerTemplate: core.getInput('ANSWER_TEMPLATE'),
        };

        Object.entries(inputs).forEach(([key, value]) =>
            core.debug(`${key}: ${value}`)
        );

        // Get information about the pull request review
        const { comment, repository, issue } = github.context.payload;
        const repoName = repository.name;
        const repoOwner = repository.owner.login;
        const prNumber = issue.number; // get number from a pull request event or comment event

        // Get the code to analyze from the review comment
        let content = comment && comment.body ? comment.body : '';

        const url = `${inputs.githubBaseURL}/repos/${repoOwner}/${repoName}/pulls/${prNumber}`;
        core.debug(`Diff URL: ${url}`);
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${inputs.githubToken}`,
                Accept: 'application/vnd.github.diff',
            },
        });
        const code = response.data;
        core.debug(`Diff code: ${code}`);
        const files = parsePullRequestDiff(code);
        core.debug(`Diff files: ${files}`);

        if (!content || content === inputs.fullReviewComment) {
            // Extract the code from the pull request content
            content = inputs.promptTemplate.replace('${code}', code);
        } else {
            content = content.substring(inputs.reviewCommentPrefix.length);
            content = content.replace('${code}', code);
            const fileNames = findFileNames(content);
            core.debug(`Found file names in comment: ${fileNames}`);
            for (const fileName of fileNames) {
                for (const key of Object.keys(files)) {
                    if (key.includes(fileName)) {
                        core.debug(`Replace \${file:${fileName}} with ${key}'s diff`);
                        content = content.replace(`\${file:${fileName}}`, files[key]);
                        break;
                    }
                }
            }
        }
        content = content.substring(0, inputs.maxCodeLength);

        // Determine the programming language if it was not provided
        if (inputs.programmingLanguage === 'auto') {
            const detectedLanguage = detectLanguage(code);
            core.debug(`Detected programming language: ${detectedLanguage}`);
            inputs.programmingLanguage = detectedLanguage;
        }

        const messages = [
            {
                role: 'system',
                content: `You are a master of programming language ${inputs.programmingLanguage}.`,
            },
            {
                role: 'user',
                content: `Please review the following code: \n${content}`,
            }
        ];


        // Call OpenAI API
        const openaiResponse = await axios.post(
            'https://api.openai.com/v1/engines/davinci-codex/completions',
            {
                model: 'davinci-codex',
                prompt: {
                    messages,
                },
                max_tokens: 150,
                n: 1,
                stop: null,
                temperature: 0.7,
            },
            getConfigWithProxy({
                headers: {
                    Authorization: `Bearer ${inputs.openaiToken}`,
                    'Content-Type': 'application/json',
                },
            })
        );

        const completion = openaiResponse.data.choices[0].message.content.trim();
        core.debug(`Completion: ${completion}`);

        // Format the response
        const reviewComment = inputs.answerTemplate.replace('${answer}', completion);

        // Add a review comment to the pull request
        await axios.post(
            `${inputs.githubBaseURL}/repos/${repoOwner}/${repoName}/issues/${prNumber}/comments`,
            {
                body: reviewComment,
            },
            {
                headers: {
                    Authorization: `Bearer ${inputs.githubToken}`,
                    'Content-Type': 'application/json',
                },
            }
        );
    } catch (error) {
        core.setFailed(error.message);
    }
}

performCodeReview();

