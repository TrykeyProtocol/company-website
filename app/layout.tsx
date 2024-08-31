import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/library/providers/themeprovider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Trykey",
  description:
    "Trykey is making use of robotics, artificial intelligence and blockchain to help investors track the income generated by their physical assets in any location world wide",
  openGraph: {
    images: [
      {
        url: "opengraph-image.png",
        alt: "trykey landing page",
      },
    ],
    type: "website",
    url: "https://www.trykeyprotocol.com/",
    title: "Trykey",
    description:
      "Trykey is making use of robotics, artificial intelligence and blockchain to help investors track the income generated by their physical assets in any location world wide",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
