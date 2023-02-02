import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from "../components/Layout";
import 'highlight.js/styles/vs2015.css'
import Head from 'next/head'
import React from "react";

export default function App({ Component, pageProps }: AppProps) {
  return (
      <>
          <Head>
              <title>欢迎大佬</title>
          </Head>
          <Layout>
              <Component {...pageProps} />
          </Layout>
      </>
  )
}
