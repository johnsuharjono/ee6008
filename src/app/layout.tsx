import './globals.css'

import { GeistSans } from 'geist/font/sans'

import Background from '@/src/components/background'
import SessionProvider from '@/src/components/session-provider'
import { ThemeProvider } from '@/src/components/theme-provider'
import { Toaster } from '@/src/components/ui/sonner'

import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'NTU EE6008',
  description: 'Project Management System for EE6008'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <html lang='en' suppressHydrationWarning>
        <body className={GeistSans.className} suppressHydrationWarning>
          <SessionProvider>
            <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
              <Background>{children}</Background>
            </ThemeProvider>
            <Toaster />
          </SessionProvider>
        </body>
      </html>
    </>
  )
}
