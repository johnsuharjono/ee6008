import { MainNav } from '@/src/components/main-nav'
import { ModeToggle } from '@/src/components/mode-toggle'
import { UserNav } from '@/src/components/user-nav'
import { studentConfig } from '@/src/config/nav-config'

interface StudentLayoutProps {
  children: React.ReactNode
}

export default async function StudentLayout({ children }: StudentLayoutProps) {
  return (
    <div className='container relative mx-auto flex min-h-screen flex-col bg-background/50'>
      <header className='z-40'>
        <div className='flex h-20 items-center justify-between py-6'>
          <MainNav items={studentConfig.mainNav} homeUrl={studentConfig.homeUrl} />

          <nav className='flex items-center justify-end gap-4'>
            <UserNav />
            <ModeToggle />
          </nav>
        </div>
      </header>
      <main className='flex-1'>{children}</main>
    </div>
  )
}
