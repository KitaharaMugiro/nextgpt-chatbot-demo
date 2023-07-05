export async function checkEmbeddings(content: string, apiKey: string) {
    console.log("______________________")
    console.log("content: ", content)
    const url = "http://oai.langcore.org/v1/chat/completions"  //1
    const headers = {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
    }

    const data = {
        messages: [
            {
                role: "user",
                content,
            },
        ],
        functions: [
            {
                "name": "check",
                "description": "ユーザの質問に答えるのに外部データが必要であるかを判断する。知らない知識を聞かれたら外部データを活用してください。",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "check": {
                            "type": "boolean",
                            "description": "ユーザの質問に回答するために、外部データを検索する必要があればtrue、そうでないならfalseを返してください。",
                        },
                        "query": {
                            "type": "string",
                            "description": "外部データを検索するための検索文章。checkがfalseであれば不要。",
                        },
                    },
                    "required": ["check", "query"],
                },
            }
        ],
        function_call: { name: "check" },
        model: "gpt-3.5-turbo-0613",
    }

    const res = await fetch(
        url,
        {
            headers: headers,
            method: 'POST',
            body: JSON.stringify(data)
        }
    )

    const resJson = await res.json()
    const messageContent = resJson.choices[0].message
    if (messageContent.function_call) {
        const functionName = messageContent.function_call.name
        const argumentsOfFunction = messageContent.function_call.arguments
        try {
            return JSON.parse(argumentsOfFunction)
        } catch {
            return {
                check: false,
                query: ""
            }
        }
    }
    return {
        check: false,
        query: ""
    }
}