import localFont from 'next/font/local';
import { Inter } from 'next/font/google';

export const cabinetGrotesk = localFont({
  src: './CabinetGrotesk-Variable.woff2',
  weight: '400 500 600 700',
  fallback: ['system-ui', 'arial'],
});

export const BerkeleyMono = localFont({
  src: './BerkeleyMono-Bold.woff2',
  weight: '400',
  fallback: ['monospace'],
});

export const inter = Inter({ weight: '400', subsets: ['latin'], variable: '--inter' });

export const CUSTOM_FONTS = [
  {
    family: 'Inter',
    style: 'normal',
    weight: '400',
    source: `url("./inter-variable.ttf") format("ttf")`,
  },
  // {
  //   family: "Inter",
  //   style: "italic",
  //   weight: "900",
  //   source: `url("./fonts/Inter-BlackItalic.woff2") format("woff2")`,
  // },
];
