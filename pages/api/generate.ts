// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next'
import dotenv from 'dotenv';
const voice = require('elevenlabs-node');
import AWS from 'aws-sdk';
import { AWSFileUploader, AWS_OBJECT } from './cloud/aws-file-uploader';
import fs from 'fs'
import { generateName } from './utils/functions';
import path from 'path';
import { scrapeUrl } from "./utils/scrapper";

dotenv.config();


type Data = {
  name: string
}

// Create an instance of the S3 service
const s3 = new AWS.S3();
const BUCKET_NAME = "readitforme"
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  const API_KEY = process.env.ELEVENLABS_API;

  if(req.method = 'POST'){
    const {url,userId} = req.body

    const fileName = generateName();  
    
    const scrapeData = await scrapeUrl(url)
    if(scrapeData) {
      var moreData = {
        title : scrapeData.ogTitle,
        image : scrapeData.ogImage[0].url,
        source : scrapeData.ogSiteName,
        content_url : scrapeData.ogUrl,
      }
    }
    
    //NOTE: TextToSpeech saves the file as well
    voice.textToSpeech(API_KEY,'21m00Tcm4TlvDq8ikWAM',fileName,'test')
    
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
          //Create a new record in the ContentGenerated table
          return prisma.contentGenerated.create({
            data: {
              ...moreData,
              audio_url : aws_s3_url,
              user: {
                connect: { id: userId }, // Assuming you have the userId
              },
            },
          });
        })
        .catch((error:any)=>{
          console.log('Error uploading file:', error)
        })
      }, 5000);
   
    })
  }
}
