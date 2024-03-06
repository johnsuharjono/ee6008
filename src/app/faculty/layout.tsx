import { getServerSession } from 'next-auth'

import { facultyConfig, studentConfig } from '@/config/nav-config'
import { MainNav } from '@/src/components/main-nav'
import { ModeToggle } from '@/src/components/mode-toggle'
import { Shell } from '@/src/components/shell'
import { SideNav } from '@/src/components/sidebar-nav'
import { UserNav } from '@/src/components/user-nav'
import { authOptions } from '@/src/lib/auth'
import { prisma } from '@/src/lib/prisma'
import { SidebarNavItem } from '@/types'

interface FacultyLayoutProps {
  children: React.ReactNode
}

export default async function FacultyLayout({ children }: FacultyLayoutProps) {
  // check if the user is programme leader
  const session = await getServerSession(authOptions)
  const facultyId = session?.user?.facultyId

  if (!facultyId) return null

  // get active semester for faculty member
  const semesterData = await prisma.semester.findFirst({
    where: { active: true }
  })
  const semesterId = semesterData?.id

  const response = await prisma.programme.findMany({
    where: {
      leaderId: facultyId,
      semesterId
    }
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
        type: 'link'
      }
    ]
  }

  return (
    <div className='flex min-h-screen flex-col bg-background/20 space-y-6 p-4 lg:p-8'>
      <header className='container z-40'>
        <Shell className='bg-background/70 flex w-full items-center justify-between px-3 py-3 backdrop-blur-lg md:px-6 md:py-3'>
          <MainNav items={facultyConfig.mainNav} homeUrl={facultyConfig.homeUrl} />
          <nav className='flex items-center justify-end gap-4'>
            <UserNav />
            <ModeToggle />
          </nav>
        </Shell>
      </header>
      <div className='container flex w-full flex-1 gap-6 lg:gap-8'>
        <Shell className='hidden max-h-[calc(100vh-9rem)] max-w-min shrink-0 lg:block'>
          <SideNav items={isProgrammeLeader ? newItems : facultyConfig.sideNav} />
        </Shell>
        <Shell>
          <main className='flex w-full flex-1 flex-col overflow-hidden p-1'>{children}</main>
        </Shell>
      </div>
    </div>
  )
}
