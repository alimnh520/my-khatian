import { Noto_Sans_Bengali } from "next/font/google";
import { Rubik } from "next/font/google";
import "./globals.css";

const noto = Noto_Sans_Bengali({
  subsets: ["bengali"],
  weight: ["400", "600"],
  variable: "--font-noto-bengali",
});
const rubic = Rubik({
  subsets: ['latin'],
  variable: ['--font-rubic']
});

export default function RootLayout({ children }) {
  return (
    <html lang="bn" className={`${noto.variable} ${rubic.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
