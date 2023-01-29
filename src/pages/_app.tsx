import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from "../components/Layout";
import 'highlight.js/styles/vs2015.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
  )
}
