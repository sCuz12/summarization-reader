import { UserProvider } from '../context'
import '../styles/globals.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>

  )
}

export default MyApp
