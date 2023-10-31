import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { inter } from "@/fonts/fonts";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </>
  );
}
