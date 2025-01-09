import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Inter } from "next/font/google"
import { Navbar } from "../components/Navbar"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

export const metadata = {
  title: "Mutual Aid Postings",
  description: "A platform for mutual aid opportunities in our community",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main className="min-h-screen bg-background">{children}</main>
      </body>
    </html>
  )
}
