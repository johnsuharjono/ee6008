import Link from 'next/link'

import { facultyConfig, studentConfig } from '@/config/nav-config'
import { MainNav } from '@/components/main-nav'

import { ModeToggle } from '@/components/mode-toggle'
import { SideNav } from '@/components/sidebar-nav'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Shell } from '@/components/shell'

interface MarketingLayoutProps {
	children: React.ReactNode
}

export default async function FacultyLayout({
	children,
}: MarketingLayoutProps) {
	return (
		<div className='flex min-h-screen flex-col bg-background/50 space-y-6'>
			<header className='z-40 border-b'>
				<div className='container flex h-16 items-center justify-between py-6'>
					<MainNav
						items={facultyConfig.mainNav}
						homeUrl={facultyConfig.homeUrl}
					/>
					<nav className='flex items-center justify-end gap-4'>
						<Link
							href='/login'
							className={cn(
								buttonVariants({ variant: 'secondary', size: 'sm' }),
								'px-4'
							)}
						>
							Login
						</Link>
						<ModeToggle />
					</nav>
				</div>
			</header>
			<div className='container grid flex-1 gap-12 md:grid-cols-[200px_1fr]'>
				<aside className='hidden w-[200px] flex-col md:flex'>
					<SideNav items={facultyConfig.sideNav} />
				</aside>
				<main className='flex w-full flex-1 flex-col overflow-hidden'>
					<Shell>{children}</Shell>
				</main>
			</div>
		</div>
	)
}
