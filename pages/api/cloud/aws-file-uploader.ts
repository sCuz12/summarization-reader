
import {S3Client,PutObjectCommand} from '@aws-sdk/client-s3';

export const s3Config = {
    bucketName: String(process.env.AWS_S3_BUCKET),
  };

export interface AWS_OBJECT {
    path : string,
    url  : string
}

export class AWSFileUploader {
    private S3_URL = "https://readitforme.s3.eu-north-1.amazonaws.com/"
    private client: S3Client;
    private readonly bucketName = s3Config.bucketName;
    private accessKeyId = process.env.AWS_ACCESS_KEY;
    private secretAccessKey = process.env.AWS_SECRET_KEY;

    constructor() {
        this.client = new S3Client({
            credentials:{
                accessKeyId: this.accessKeyId!,
                secretAccessKey: this.secretAccessKey!,
            },
            region:'eu-north-1'
        });
        
      }


    public async uploadFile(file:Buffer,filename:string): Promise<AWS_OBJECT>{
        const timeStamp = Date.now();

        const command = new PutObjectCommand({
            Bucket: this.bucketName,
            Key: filename,
            Body: file
          });

        const response = this.client.send(command);
      


        return {
            path : `${this.bucketName}/${filename}`,
            url  : this.S3_URL + `${filename}`
        }
    }

}