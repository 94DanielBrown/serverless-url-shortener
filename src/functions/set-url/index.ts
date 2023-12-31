import {formatJSONResponse } from "@libs/api-gateway";
import { APIGatewayProxyEvent} from "aws-lambda";
import { v4 as uuid } from "uuid";
import {dynamo} from "@libs/dynamo";

export const handler = async (event: APIGatewayProxyEvent) => {
    try {
        const body = JSON.parse(event.body);
        const tableName = process.env.URL_TABLE;
        const baseUrl = process.env.BASE_URL;

        const originalUrl = body.url;

        const code = uuid().slice(0,8);

        const shortUrl = `${baseUrl}/${code}`

        console.log(`originalUrl = ${originalUrl}`);
        console.log(`shortUrl = ${shortUrl}`);
        console.log(`code = ${code}`);

        const data = {
            id: code,
            shortUrl,
            originalUrl
        };

        console.log(data);

        await dynamo.write(data, tableName);

        return formatJSONResponse(({
            data: {shortUrl, originalUrl}
        }))

    } catch (error) {
        console.log("error", error);
        return formatJSONResponse({
            statusCode: 502,
            data: {
                message: error.message
            }
        })
    }



}