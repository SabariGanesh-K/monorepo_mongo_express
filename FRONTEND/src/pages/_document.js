import Document, { Head, Html, Main, NextScript } from "next/document";

export default function MyDocument() {
  return (
    <Html lang="en">
      <Head>
    
        <meta httpEquiv="Cache-Control" content="no-cache, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
        <link rel="shortcut icon" href="/static/favicon-32x32.png" />
        {/* Rest of your <Head> content */}
      </Head>
      
        <Main />
        <NextScript />
    </Html>
  );
}
