import './globals.css'
import ThemeProvider from '@/components/ThemeProvider'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Script from 'next/script'

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>

      <body className="bg-gray-50 dark:bg-gray-950 text-black dark:text-white">

        {/* ✅ AdSense Script (CORRECT PLACE) */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7275210805094277"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        <ThemeProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>

      </body>
    </html>
  )
}