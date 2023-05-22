import type { NextApiRequest, NextApiResponse } from 'next'
import { SupabaseService } from '../cloud/auth';


type RegisterData = {
    status : number
    user : any
};
  

type ErrorResponse = {
    error: string;
};
  

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ErrorResponse|RegisterData>
  ) {

    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method Not Allowed' });
        return;
    }
    
    const { email, password } = req.body;

    try {
        const supabaseService = new SupabaseService()
        const user            = await supabaseService.register(email,password)

        if(!user){
            return res.status(500).json({ error: 'Error registering user' });
        }

        res.status(200).json({
            status : 200,
            user: user
        });
    }catch(error:any){
        console.log(error.message);
        res.status(500).json({ error: error.message});
    }

  }