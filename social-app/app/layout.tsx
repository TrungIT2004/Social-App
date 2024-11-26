import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
import ReactQueryProvider from './providers/ReactQueryProvider'
import MainMenu from "@/components/mainmenu"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
})
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
})

export const metadata: Metadata = {
  title: "Facebook",
  description: "Made by Hoàng Lê Minh Trung",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <MainMenu />
        <ReactQueryProvider>
          {children}
        </ReactQueryProvider>
      </body>
    </html >
  )
}
