import { MainNav } from '@/src/components/main-nav'
import { ModeToggle } from '@/src/components/mode-toggle'
import { Shell } from '@/src/components/shell'
import { SideNav } from '@/src/components/sidebar-nav'
import { UserNav } from '@/src/components/user-nav'
import { adminConfig } from '@/src/config/nav-config'

interface AdminLayoutProps {
  children: React.ReactNode
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className='container relative mx-auto flex min-h-screen w-full flex-col items-center justify-center gap-6 p-4'>
      <header className='sticky top-4 z-50 w-full border-border'>
        <Shell className='flex w-full items-center justify-between bg-background/70 px-3 py-3 backdrop-blur-lg md:px-6 md:py-3'>
          <MainNav items={adminConfig.mainNav} homeUrl={adminConfig.homeUrl} />
          <nav className='flex items-center justify-end gap-4'>
            <UserNav />
            <ModeToggle />
          </nav>
        </Shell>
      </header>
      <div className='flex w-full flex-1 gap-6 lg:gap-8'>
        <Shell className='hidden max-h-[calc(100vh-7rem)] max-w-min shrink-0 bg-background/70 md:p-4 lg:sticky lg:top-[106px] lg:block'>
          <SideNav items={adminConfig.sideNav} />
        </Shell>
        <Shell>
          <main className='flex w-full flex-1 flex-col overflow-hidden p-1'>{children}</main>
        </Shell>
      </div>
    </div>
  )
}
