import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Kanit } from 'next/font/google'
import { CookiesProvider } from 'react-cookie';

const kanit = Kanit({
  subsets: ['latin'],
  weight: '400'
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={kanit.className}>
      <CookiesProvider>
        <Component {...pageProps} />
      </CookiesProvider>
    </main>
  )
}