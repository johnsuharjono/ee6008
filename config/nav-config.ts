import { AdminConfig, FacultyConfig, StudentConfig } from '@/types'

export const studentConfig: StudentConfig = {
	homeUrl: '/student',
	mainNav: [
		{
			title: 'Project Plan',
			href: '/student/project-plan',
		},
		{
			title: 'FAQ',
			href: '/student/faq',
		},
	],
}

export const facultyConfig: FacultyConfig = {
	homeUrl: '/faculty',
	mainNav: [],
	sideNav: [
		{
			title: 'Dashboard',
			href: '/faculty',
			icon: 'home',
		},
		{
			title: 'Add project',
			href: '/faculty/add-project',
			icon: 'addProject',
		},
		{
			title: 'View all project',
			href: '/faculty/view-projects',
			icon: 'viewProject',
		},
		{
			title: 'Marking',
			href: '/faculty/marking',
			icon: 'mark',
		},
	],
}

export const adminConfig: AdminConfig = {
	homeUrl: '/admin',
	mainNav: [
		{
			title: 'Project proposals',
			href: '/faculty/proposals',
		},
	],
}
