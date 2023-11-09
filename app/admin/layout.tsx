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
		<div className='flex min-h-screen flex-col bg-background/20 space-y-6 p-4 lg:p-8'>
			<header className='container z-40'>
				<Shell className='bg-background/70 flex w-full items-center justify-between px-3 py-3 backdrop-blur-lg md:px-6 md:py-3'>
					<MainNav items={adminConfig.mainNav} homeUrl={adminConfig.homeUrl} />
					<nav className='flex items-center justify-end gap-4'>
						<UserNav />
						<ModeToggle />
					</nav>
				</Shell>
			</header>
			<div className='container flex w-full flex-1 gap-6 lg:gap-8'>
				<Shell className='hidden max-h-[calc(100vh-9rem)] w-[300px] shrink-0 lg:block'>
					<SideNav items={adminConfig.sideNav} />
				</Shell>
				<Shell>
					<main className='flex w-full flex-1 flex-col overflow-hidden p-1'>
						{children}
					</main>
				</Shell>
			</div>
		</div>
	)
}
