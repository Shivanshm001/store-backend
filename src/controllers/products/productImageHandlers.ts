import { config } from "../../config/config";
import { S3Client, DeleteObjectCommand, DeleteObjectCommandInput, GetObjectCommand, GetObjectCommandInput, PutObjectCommand, PutObjectCommandInput } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";



const s3: S3Client = new S3Client({
    region: config.BUCKET_REGION,
    credentials: {
        accessKeyId: config.AWS_ACCESS_KEY,
        secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
    },
});


export async function uploadImageToS3(image: Express.Multer.File, imageName: string) {
    try {
        const params: PutObjectCommandInput = {
            Bucket: config.BUCKET_NAME,
            Key: imageName,
            Body: image?.buffer,
            ContentType: image?.mimetype
        }
        await s3.send(new PutObjectCommand(params));

    } catch (error) {
        throw new Error("Error uploading image to S3.");
    }
}


export async function getImageFromS3(imageName: string) {
    try {
        const params: GetObjectCommandInput = {
            Bucket: config.BUCKET_NAME,
            Key: imageName
        }

        const imageUrl = await getSignedUrl(s3, new GetObjectCommand(params), { expiresIn: 36000 });
        return imageUrl;
    } catch (error) {
        console.log(error)
        throw new Error("Error getting image url for S3 bucket.");
    }
}

export async function deleteImageFromS3(imageName: string) {
    try {
        const params: DeleteObjectCommandInput = {
            Bucket: config.BUCKET_NAME,
            Key: imageName
        }
        await s3.send(new DeleteObjectCommand(params));
    } catch (error) {

    }
}