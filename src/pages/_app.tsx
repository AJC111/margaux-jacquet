import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CustomCursor from '@/components/CustomCursor'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <CustomCursor />
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  )
}
