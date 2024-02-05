import { facultyConfig, studentConfig } from '@/config/nav-config'
import { MainNav } from '@/components/main-nav'

import { ModeToggle } from '@/components/mode-toggle'
import { SideNav } from '@/components/sidebar-nav'
import { Shell } from '@/components/shell'
import { UserNav } from '@/components/user-nav'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { SidebarNavItem } from '@/types'

interface FacultyLayoutProps {
	children: React.ReactNode
}

export default async function FacultyLayout({ children }: FacultyLayoutProps) {
	// check if the user is programme leader
	const session = await getServerSession(authOptions)
	const facultyId = session?.user?.facultyId

	if (!facultyId) return null

	// TODO: get semester from dropdown
	const semester = '23S2'
	const semesterData = await prisma.semester.findFirst({
		where: { name: semester },
		select: { id: true },
	})
	const semesterId = semesterData?.id

	const response = await prisma.programme.findMany({
		where: {
			leaderId: facultyId,
			semesterId,
		},
	})

	const isProgrammeLeader = response.length > 0

	let newItems: SidebarNavItem[] = []

	if (isProgrammeLeader) {
		newItems = [
			...facultyConfig.sideNav,
			{
				title: 'Review projects',
				href: '/faculty/review-projects',
				icon: 'reviewProjects',
				type: 'link',
			},
		]
	}

	return (
		<div className='flex min-h-screen flex-col bg-background/20 space-y-6 p-4 lg:p-8'>
			<header className='container z-40'>
				<Shell className='bg-background/70 flex w-full items-center justify-between px-3 py-3 backdrop-blur-lg md:px-6 md:py-3'>
					<MainNav
						items={facultyConfig.mainNav}
						homeUrl={facultyConfig.homeUrl}
					/>
					<nav className='flex items-center justify-end gap-4'>
						<UserNav />
						<ModeToggle />
					</nav>
				</Shell>
			</header>
			<div className='container flex w-full flex-1 gap-6 lg:gap-8'>
				<Shell className='hidden max-h-[calc(100vh-9rem)] max-w-min shrink-0 lg:block'>
					<SideNav
						items={isProgrammeLeader ? newItems : facultyConfig.sideNav}
					/>
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
