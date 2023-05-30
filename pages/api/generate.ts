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
import { Configuration, OpenAIApi } from "openai"

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
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

  const configuration = new Configuration({
    apiKey: OPENAI_API_KEY,
  });
  // OpenAI instance creation
  const openai = new OpenAIApi(configuration);
  var aiAnswer;

  if (req.method = 'POST') {
    const { url, userId, content,voiceId } = req.body

    console.log(content)
    try {
      //communicate with open ai for summary
      const prompt = `Summarize the following content:\n\n${content}\n\n[SUMMARY:]`;
      const completion = await openai.createCompletion({
        model: "text-davinci-002",
        prompt: prompt,
        max_tokens: 200,
        n: 1, // Generate a single response
      });

      aiAnswer = completion.data.choices[0].text

    } catch (error: any) {
      console.log(error);
    }

    const fileName = 'temp_audio_files/' + generateName();

    const scrapeData = await scrapeUrl(url)
    if (scrapeData) {
      var moreData = {
        title: scrapeData.ogTitle,
        image: scrapeData.ogImage[0].url,
        source: scrapeData.ogSiteName,
        content_url: scrapeData.ogUrl,
        content: aiAnswer
      }
    }

    //NOTE: TextToSpeech saves the file as well
    voice.textToSpeech(API_KEY, voiceId, fileName, aiAnswer)
      .then(async (res: any) => {
        let aws_s3_url = "";
        const fileUploader = new AWSFileUploader();
        const rootDirectory = path.resolve(process.cwd()); // Get the root directory of the project
        const filePath = path.join(fileName);

        const waitForFile = new Promise<void>((resolve) => {
          const checkFile = () => {
            fs.promises.stat(filePath)
              .then(() => {
                resolve();
              })
              .catch(() => {
                setTimeout(checkFile, 1000); // Retry after 1 second
              });
          };
          checkFile();
        });



        waitForFile.then(async () => {
          const fileContent = await fs.promises.readFile(filePath);
          fileUploader.uploadFile(fileContent, fileName)
            .then((s3Object: AWS_OBJECT) => {
              console.log(`File uploaded successfully. S3 path: ${s3Object.path}`)
              aws_s3_url = s3Object.url

              //Create a new record in the ContentGenerated table
              prisma.contentGenerated.create({
                data: {
                  ...moreData,
                  audio_url: aws_s3_url,
                  user: {
                    connect: { id: userId }, // Assuming you have the userId
                  },
                },
              }).then(()=>{
                console.log("added to database")
              })
            })
            .catch((error: any) => {
              console.log('Error uploading file:', error);
              throw error;
            })
        })
      }).then(()=>{
        res.status(200).send({ name: "ok" })
      })

  }
}
