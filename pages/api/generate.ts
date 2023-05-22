// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fetch from 'node-fetch'; 
import type { NextApiRequest, NextApiResponse } from 'next'
import dotenv from 'dotenv';
const voice = require('elevenlabs-node');
import AWS from 'aws-sdk';
import { AWSFileUploader, AWS_OBJECT } from './cloud/aws-file-uploader';
import fs from 'fs'
import { generateName } from './utils/functions';

dotenv.config();


type Data = {
  name: string
}

// Create an instance of the S3 service
const s3 = new AWS.S3();
const BUCKET_NAME = "readitforme"
import path from 'path';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  const API_KEY = process.env.ELEVENLABS_API;

  if(req.method = 'POST'){
    const text = req.body
    const fileName = generateName();

    //NOTE: TextToSpeech saves the file as well
    voice.textToSpeech(API_KEY,'21m00Tcm4TlvDq8ikWAM',fileName,text)
    
    .then(async (res: any)=>{
      let aws_s3_url = "" ;
      const fileUploader = new AWSFileUploader();
   
      setTimeout(async () => {
        const rootDirectory = path.resolve(process.cwd()); // Get the root directory of the project
        const filePath = path.join(rootDirectory,fileName);
        const fileContent = await fs.promises.readFile(filePath);

        fileUploader.uploadFile(fileContent,fileName)
        .then((s3Object: AWS_OBJECT)=>{
          console.log(`File uploaded successfully. S3 path: ${s3Object.path}`)
          console.log(s3Object.url);
          aws_s3_url = s3Object.url
        })
        .catch((error:any)=>{
          console.log('Error uploading file:', error)
        })
      }, 5000);
   
    })
  }
}
