import type { NextApiRequest, NextApiResponse } from 'next'
import { SupabaseService } from '../cloud/auth';


type LoginData = {
  status: number
  user: any,
  token : string
};


type ErrorResponse = {
  message: string;
};


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LoginData | ErrorResponse>
) {


  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  const { email, password } = req.body;


  try {
    const supabaseService = new SupabaseService()
    const data = await supabaseService.login(email, password);

    if (!data.user) {
      return res.status(500).json({ message: 'Error registering user' });
    }

    res.status(200).json({
      status: 200,
      user: data.user,
      token : data.session!.access_token
    });
    
  } catch (error: any) {
    console.log(error)
    return res.status(500).json({ message: error});
  }

}