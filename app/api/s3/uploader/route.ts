import { PutObjectCommand, S3 } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
import {z} from "zod";
import { v4 as uuidv4 } from "uuid";
import {getSignedUrl} from '@aws-sdk/s3-request-presigner'

const fileUploadSchema = {
    fileName: z.string().min(1, "fileName is required"),
    contentType: z.string().min(1, "contentType is required"),
    size: z.number().min(1, "size is required"),
    isImage: z.boolean(),
}

export async function  POST(req: Request) {
    try{
        const body = await req.json();
        const validation = fileUploadSchema.safeParse(body);

        if(!validation.success){
            return NextResponse.json(
                {error: "Invalid Request Body"},
                {status: 400}
            );
        }

        
        const {fileName, contentType, size} = validation.data;

        const uniqe = `${uuidv4()} - ${fileName}`
        
        const commond = new PutObjectCommand({
            Bucket: process.env.NEXT_PUBLIC_BACKET_NAME_STORAGE,
            Key: uniqe,
            ContentType: contentType,
            ContentLength: size
        })

        const presignedUrl = await getSignedUrl(S3, commond, {
            expiresIn: 360,
        });

        const response = {
            presignedUrl,
            key: uniqe
        }

        return NextResponse.json(response);
    } catch (error) {
        return NextResponse.json({error: "Faild to generate presigned url"}, {status: 500})
    }
}