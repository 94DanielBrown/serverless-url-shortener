import type { AWS } from "@serverless/typescript";

const functions: AWS["functions"] = {
    setUrl: {
        handler: "src/functions/set-url/index.handler",
        events: [
            {
                httpApi: {
                    path: "/",
                    method: "POST"
                }
            }
        ],
    },
    getUrl: {
        handler: "src/functions/get-url/index.handler",
        events: [
            {
                httpApi: {
                    path: "/{code}",
                    method: "GET"
                }
            }
        ]
    }
}

export default functions;