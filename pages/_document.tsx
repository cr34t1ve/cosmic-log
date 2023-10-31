import { Html, Head, Main, NextScript } from "next/document";
import { getCssText } from "@/stitches.config";
import { inter } from "@/fonts/fonts";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <style
          id="stitches"
          dangerouslySetInnerHTML={{ __html: getCssText() }}
        />
      </Head>
      <body className={inter.className}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
