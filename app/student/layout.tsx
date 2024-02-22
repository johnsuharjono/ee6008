import Link from 'next/link'

import { studentConfig } from '@/config/nav-config'
import { MainNav } from '@/components/main-nav'

import { ModeToggle } from '@/components/mode-toggle'
import { UserNav } from '@/components/user-nav'

interface StudentLayoutProps {
  children: React.ReactNode
}

export default async function StudentLayout({ children }: StudentLayoutProps) {
  return (
    <div className='flex min-h-screen flex-col bg-background/50'>
      <header className='container z-40'>
        <div className='flex h-20 items-center justify-between py-6'>
          <MainNav
            items={studentConfig.mainNav}
            homeUrl={studentConfig.homeUrl}
          />

          <nav className='flex items-center justify-end gap-4'>
            <UserNav />
            <ModeToggle />
          </nav>
        </div>
      </header>
      <main className='flex-1 container'>{children}</main>
    </div>
  )
}
