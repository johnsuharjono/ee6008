import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'
import type { Metadata } from 'next'
import Background from '@/components/background'
import { Toaster } from 'sonner'
import SessionProvider from '@/components/session-provider'
import { GeistSans } from 'geist/font/sans'
export const metadata: Metadata = {
	title: 'NTU EE6008',
	description: 'Project Management System for EE6008',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<>
			<html lang='en' suppressHydrationWarning>
				<body className={GeistSans.className} suppressHydrationWarning>
					<SessionProvider>
						<ThemeProvider
							attribute='class'
							defaultTheme='system'
							enableSystem
							disableTransitionOnChange
						>
							<Background>{children}</Background>
						</ThemeProvider>
						<Toaster richColors />
					</SessionProvider>
				</body>
			</html>
		</>
	)
}
