import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CustomCursor from '@/components/CustomCursor'
import TouchParticles from '@/components/TouchParticles'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <CustomCursor />
      <TouchParticles />
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  )
}
