import { NextApiHandler, NextApiResponse } from "next";
import { ContentData } from "../../../types/user";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
    req: any,
    res: NextApiResponse<ContentData[]>
  ) {

      // not needed in NextJS v12+
      const body = req.body
      const {userID} = req.body

      const userContent = await prisma.contentGenerated.findMany({
        where : {
            userId : userID
        } ,
        select: {
            id: true,
            content: true,
            audio_url: true,
        },
      })

      return res.json(userContent);

  }