import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Enochian Chess",
  description: "The Golden Dawn's four-player chess variant and divination system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Cinzel:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans antialiased bg-[#0F0F0F] text-[#E5E5E5] min-h-screen">
        {children}
      </body>
    </html>
  );
}
