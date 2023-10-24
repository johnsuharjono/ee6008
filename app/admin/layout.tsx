import { adminConfig } from '@/config/nav-config'
import { MainNav } from '@/components/main-nav'

import { ModeToggle } from '@/components/mode-toggle'
import { SideNav } from '@/components/sidebar-nav'
import { Shell } from '@/components/shell'
import { UserNav } from '@/components/user-nav'

interface AdminLayoutProps {
	children: React.ReactNode
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
	return (
		<div className='flex min-h-screen flex-col bg-background/20 space-y-6'>
			<header className='z-40 border-b'>
				<div className='container flex h-16 items-center justify-between py-6'>
					<MainNav items={adminConfig.mainNav} homeUrl={adminConfig.homeUrl} />

					<nav className='flex items-center justify-end gap-4'>
						<UserNav />
						<ModeToggle />
					</nav>
				</div>
			</header>
			<div className='container grid flex-1 gap-8 md:grid-cols-[200px_1fr]'>
				<aside className='hidden w-[200px] flex-col md:flex'>
					<SideNav items={adminConfig.sideNav} />
				</aside>
				<main className='flex w-full flex-1 flex-col overflow-hidden'>
					<Shell>{children}</Shell>
				</main>
			</div>
		</div>
	)
}
