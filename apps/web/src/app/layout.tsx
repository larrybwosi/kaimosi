import type React from "react"
import type { Metadata, Viewport } from "next"
import { DM_Sans, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { AuthProvider } from "@/lib/auth-context"
import "./globals.css"

const _dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" })
const _playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" })

export const metadata: Metadata = {
  metadataBase: new URL("https://maplewood.town"),
  title: {
    default: "Maplewood - Charming Small Town | Tourism, History & Culture",
    template: "%s | Maplewood Town",
  },
  description:
    "Discover Maplewood - a vibrant small town since 1847. Explore historic attractions, award-winning restaurants, boutique shops, universities, and community events. Plan your visit today!",
  keywords: [
    "Maplewood",
    "small town tourism",
    "historic downtown",
    "local restaurants",
    "boutique shopping",
    "universities",
    "colleges",
    "community events",
    "bed and breakfast",
    "hiking trails",
    "family vacation",
    "weekend getaway",
  ],
  authors: [{ name: "Maplewood Tourism Board" }],
  creator: "Maplewood Town",
  publisher: "Maplewood Tourism Board",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://maplewood.town",
    siteName: "Maplewood Town",
    title: "Maplewood - Where Heritage Meets Tomorrow",
    description:
      "Discover the charm of Maplewood - a vibrant small town rich in history, culture, and community. Explore attractions, restaurants, shops, and accommodations.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Maplewood Town - Historic Downtown",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Maplewood - Charming Small Town",
    description: "Discover heritage, culture, and community in Maplewood. Plan your visit today!",
    images: ["/twitter-image.jpg"],
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
  alternates: {
    canonical: "https://maplewood.town",
  },
  verification: {
    google: "google-site-verification-code",
  },
    generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#2d5a3d" },
    { media: "(prefers-color-scheme: dark)", color: "#1a3a24" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TouristDestination",
              name: "Maplewood",
              description: "A charming small town rich in history, culture, and community since 1847.",
              url: "https://maplewood.town",
              touristType: ["Cultural tourism", "Nature tourism", "Food tourism"],
              geo: {
                "@type": "GeoCoordinates",
                latitude: 40.7128,
                longitude: -74.006,
              },
              containsPlace: [
                {
                  "@type": "TouristAttraction",
                  name: "Maple Grove Park",
                },
                {
                  "@type": "TouristAttraction",
                  name: "Historic Downtown District",
                },
              ],
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <AuthProvider>{children}</AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
