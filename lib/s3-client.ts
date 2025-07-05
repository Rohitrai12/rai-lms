import 'server-only'
import {s3Client} from "@aws-sdk/client-s3";

export const s3 = s3Client({
    region: "auto",
    endpoint: process.env.AWS_ENDPOINT_URL_S3,
    forcePathStyle: true
});