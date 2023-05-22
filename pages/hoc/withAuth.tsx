import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react'
import { Context } from '../../context';

type Props = {}

const withAuth = (WrappedComponent: React.ComponentType<any>) => {
    // eslint-disable-next-line react/display-name
    return (props:any) => {
        const router = useRouter();

        const { state } = useContext(Context); // Retrieve authentication state from the context
        const { user } = state;
        console.log(user);

        useEffect(() => {
            if (!user) {
              // Redirect the user to the login page if not authenticated
              router.push('/auth/login');
            }
        }, []);

        if (!useContext) {
            return null; // Show a loading spinner or custom message while checking authentication
        }

        return <WrappedComponent {...props} />
        
      
    };
};

export default withAuth;