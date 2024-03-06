'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Icons } from '@/src/components/icons'
import { Badge } from '@/src/components/ui/badge'
import { cn } from '@/src/lib/utils'
import { SidebarNavItem } from '@/types'

interface DashboardNavProps {
  items: SidebarNavItem[]
}

export function SideNav({ items }: DashboardNavProps) {
  const path = usePathname()

  if (!items?.length) {
    return null
  }

  return (
    <nav className='grid items-start gap-1 min-w-[200px] tracking-wide'>
      {items.map((item, index) => {
        if (item.type === 'link' && item.href) {
          const isActive = path === item.href
          const Icon = Icons[item.icon || 'arrowRight']
          return (
            item.href && (
              <Link
                href={item.href}
                className={cn(
                  'text-md hover:bg-muted/50 hover:text-foreground text-muted-foreground group flex w-full items-center rounded-md border border-transparent px-3 py-1',
                  isActive && 'bg-muted/50 border-border text-foreground',
                  item.disabled && 'pointer-events-none opacity-60'
                )}
                key={index}
              >
                <Icon className='mr-2 h-4 w-4' />
                <span>{item.title}</span>
                {item.disabled && (
                  <span className='ml-auto'>
                    <Badge>WIP</Badge>
                  </span>
                )}
              </Link>
            )
          )
        } else if (item.type === 'header') {
          return (
            <span key={index} className={cn('mb-1 font-medium', index > 0 && 'mt-2')}>
              <span>{item.title}</span>
            </span>
          )
        }
      })}
    </nav>
  )
}
