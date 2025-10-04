import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Nirog - Your All-in-One HealthTech Platform",
  description:
    "Connect with verified doctors, manage health records, book appointments, and access medical learning resources. Your complete digital healthcare ecosystem.",
  keywords: "healthcare, doctors, appointments, medical records, telemedicine, health platform",
  authors: [{ name: "Nirog Team" }],
  creator: "Nirog",
  publisher: "Nirog",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://nirog.com"),
  openGraph: {
    title: "Nirog - Your All-in-One HealthTech Platform",
    description: "Connect with verified doctors, manage health records, and access quality healthcare services.",
    url: "https://nirog.com",
    siteName: "Nirog",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nirog - Your All-in-One HealthTech Platform",
    description: "Connect with verified doctors, manage health records, and access quality healthcare services.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-sans antialiased">
        <script
          dangerouslySetInnerHTML={{
            __html: `console.log("[v0] Layout loaded successfully");`,
          }}
        />
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
