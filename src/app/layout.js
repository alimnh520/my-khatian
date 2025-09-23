import "./globals.css";


export const metadata = {
  title: "জলিল গাজী || খতিয়ান",
  description: "This is the online land calculate website",
  icons: {
    icon: '/logo.png'
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <body>
        {children}
      </body>
    </html>
  );
}
