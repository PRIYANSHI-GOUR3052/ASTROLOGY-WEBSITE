import './globals.css'
import { Cormorant_Garamond, Open_Sans } from 'next/font/google'
import ClientLayout from './ClientLayout'

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata = {
  title: 'Nakshatra Gyaan - Your Spiritual Journey Begins Here',
  description: 'Discover your path with comprehensive Vedic astrology and spiritual guidance.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${cormorantGaramond.variable} ${openSans.variable}`}>
      <body className="bg-nebula-indigo text-starlight-silver font-sans relative">
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}
