
import { createClient } from '@supabase/supabase-js'

export class SupabaseService {
    private supabase;

    constructor() {
        this.supabase = createClient(
            process.env.SUPABASE_URL!,
            process.env.SUPABASE_KEY!
        )
    }

    public async register(email: string, password: string) {
        try {
            const { data, error } = await this.supabase.auth.signUp({
                email: email,
                password: password
            });

            if (error) {
                throw new Error(error.message);
            }
            // Successful registration
            return data.user;
        } catch (error: any) {
            throw new Error(error.message)
        }

    }


    public async login(email: string, password: string) {

        try {
            const { data, error } = await this.supabase.auth.signInWithPassword({
                email: email,
                password: password
            })

            if(error) {
                throw new Error(error.message)
            }
            
            //success return data
            return data;

        } catch (error: any) {
            console.log(error.message);
            throw new Error(error.message)
         
        }

    }

}