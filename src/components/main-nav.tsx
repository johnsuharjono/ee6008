'use client'

import { Menu } from 'lucide-react'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'
import * as React from 'react'

import { Icons } from '@/src/components/icons'
import { Button } from '@/src/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/src/components/ui/sheet'
import { siteConfig } from '@/src/config/site'
import { cn } from '@/src/lib/utils'
import { MainNavItem } from '@/types'

interface MainNavProps {
  items?: MainNavItem[]
  children?: React.ReactNode
  homeUrl: string
  showDesktopNav?: boolean
}

export function MainNav({ items, homeUrl, children, showDesktopNav = true }: MainNavProps) {
  const segment = useSelectedLayoutSegment()

  return (
    <div className='flex gap-2 md:gap-6'>
      {/* Mobile Nav */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant='outline' size='icon' className='shrink-0 md:hidden'>
            <Menu className='h-5 w-5' />
            <span className='sr-only'>Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side='left'>
          <nav className='grid gap-6 text-lg font-medium'>
            <Link href={homeUrl} className='flex items-center gap-2 text-lg font-semibold'>
              <Icons.logo className='h-6 w-6' />
              <span className={cn(`text-xl font-semibold tracking-tight`)}>{siteConfig.name}</span>
            </Link>
            {items?.map((item, index) => (
              <Link
                key={index}
                href={item.disabled ? '#' : item.href}
                className={cn(
                  'flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm',
                  item.href.startsWith(`/${segment}`) ? 'text-foreground' : 'text-muted-foreground',
                  item.disabled && 'cursor-not-allowed opacity-80'
                )}
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      <Link href={homeUrl} className='flex items-center md:hidden'>
        <span className={cn(`text-xl font-semibold tracking-wide`)}>{siteConfig.name}</span>
      </Link>

      {/* Desktop Nav */}
      <Link href={homeUrl} className='hidden items-center space-x-2 md:flex'>
        <Icons.logo />
        <span className={cn(`hidden text-xl font-semibold tracking-tight sm:inline-block`)}>{siteConfig.name}</span>
      </Link>
      {showDesktopNav && items?.length ? (
        <nav className='hidden gap-6 md:flex'>
          {items?.map((item, index) => (
            <Link
              key={index}
              href={item.disabled ? '#' : item.href}
              className={cn(
                'flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm',
                item.href.startsWith(`/${segment}`) ? 'text-foreground' : 'text-foreground/60',
                item.disabled && 'cursor-not-allowed opacity-80'
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      ) : null}
    </div>
  )
}
