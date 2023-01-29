import { Html, Head, Main, NextScript } from 'next/document'
import React from "react";

export default function Document() {
  return (
    <Html lang="en">
        <Head>
            <title>欢迎大佬</title>
            <meta name="home" content="欢迎大佬" />
            <link rel="icon" href="/chook.svg" />
        </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
