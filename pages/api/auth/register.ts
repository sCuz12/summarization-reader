import type { NextApiRequest, NextApiResponse } from 'next'
import { SupabaseService } from '../cloud/auth';
import { passwordsMatchValidator } from '../utils/functions';
import { PrismaClient } from '@prisma/client';


type RegisterData = {
    status : number
    user : any
};
  

type ErrorResponse = {
    message: string;
};
  

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ErrorResponse|RegisterData>
  ) {

    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Method Not Allowed' });
        return;
    }

    const prisma = new PrismaClient();
    
    const { email, password,confirmPassword } = req.body;

    const passwordMatched = passwordsMatchValidator(password,confirmPassword);

    if(!passwordMatched) {
        return res.status(500).json({ message: 'Password not matching' }); 
    }

    try {
        const supabaseService = new SupabaseService()
        const user            = await supabaseService.register(email,password)
      
        if(!user){
            return res.status(500).json({ message: 'Error registering user' });
        }
    
        const prismaUser = await prisma.user.create({
            data:{
                email : user.email,
                id : user.id
            }
        })

        res.status(200).json({
            status : 200,
            user: user
        });
    }catch(error:any){
        res.status(500).json({ message: error.message});
    }

  }