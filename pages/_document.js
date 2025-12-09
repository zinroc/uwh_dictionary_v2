import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {process.env.METICULOUS_AI_TOKEN && (
            <script
              data-project-token={process.env.METICULOUS_AI_TOKEN}
              src="https://snippet.meticulous.ai/v1/meticulous.js"
            />
          )}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
