import localFont from "next/font/local";
import { Inter } from "next/font/google";

export const cabinetGrotesk = localFont({
  src: "./CabinetGrotesk-Variable.woff2",
  weight: "400 500 600 700",
  fallback: ["system-ui", "arial"],
});

export const BerkeleyMono = localFont({
  src: "./BerkeleyMono-Bold.woff2",
  weight: "400",
  fallback: ["monospace"],
});

export const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--inter",
});
