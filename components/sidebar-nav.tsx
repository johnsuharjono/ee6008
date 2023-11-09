'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { SidebarNavItem } from '@/types'
import { cn } from '@/lib/utils'
import { Icons } from '@/components/icons'
import { Separator } from './ui/separator'

interface DashboardNavProps {
	items: SidebarNavItem[]
}

export function SideNav({ items }: DashboardNavProps) {
	const path = usePathname()

	if (!items?.length) {
		return null
	}

	return (
		<nav className='grid items-start gap-2'>
			{items.map((item, index) => {
				if (item.type === 'link' && item.href) {
					const isActive = path?.startsWith(item.href)
					const Icon = Icons[item.icon || 'arrowRight']
					return (
						item.href && (
							<Link
								href={item.href}
								className={cn(
									'text-md hover:bg-muted/50 hover:text-foreground text-muted-foreground group flex w-full min-w-[200px] items-center rounded-md border border-transparent px-3 py-1',
									isActive && 'bg-muted/50 border-border text-foreground',
									item.disabled && 'pointer-events-none opacity-60'
								)}
							>
								<Icon className='mr-2 h-4 w-4' />
								<span>{item.title}</span>
							</Link>
						)
					)
				} else if (item.type === 'header') {
					return (
						<span
							key={index}
							className={cn('text-lg mb-1 font-semibold', index > 0 && 'mt-4')}
						>
							<span>{item.title}</span>
						</span>
					)
				}
			})}
		</nav>
	)
}
