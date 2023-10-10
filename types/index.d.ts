import { Icons } from '@/components/icons'

export type NavItem = {
	title: string
	href: string
	disabled?: boolean
}

export type MainNavItem = NavItem

export type SiteConfig = {
	name: string
	description: string
}

export type StudentConfig = {
	homeUrl: string
	mainNav: MainNavItem[]
}

export type FacultyConfig = {
	homeUrl: string
	mainNav: MainNavItem[]
	sideNav: SidebarNavItem[]
}

export type AdminConfig = {
	homeUrl: string
	mainNav: MainNavItem[]
}

export type SidebarNavItem = {
	title: string
	disabled?: boolean
	external?: boolean
	icon?: keyof typeof Icons
} & (
	| {
			href: string
			items?: never
	  }
	| {
			href?: string
			items: NavLink[]
	  }
)
