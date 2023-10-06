import Link from 'next/link'

import { studentConfig } from '@/config/nav-config'
import { MainNav } from '@/components/main-nav'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { ModeToggle } from '@/components/mode-toggle'

interface MarketingLayoutProps {
	children: React.ReactNode
}

export default async function MarketingLayout({
	children,
}: MarketingLayoutProps) {
	return (
		<div className='flex min-h-screen flex-col'>
			<header className='container z-40 bg-background'>
				<div className='flex h-20 items-center justify-between py-6'>
					<MainNav
						items={studentConfig.mainNav}
						homeUrl={studentConfig.homeUrl}
					/>
					{/* <nav>
						<Link
							href='/login'
							className={cn(
								buttonVariants({ variant: 'secondary', size: 'sm' }),
								'px-4'
							)}
						>
							Login
						</Link>
					</nav> */}
					<nav className='flex items-center justify-end gap-4'>
						<ModeToggle />
					</nav>
				</div>
			</header>
			<main className='flex-1'>{children}</main>
		</div>
	)
}
