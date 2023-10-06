import { AdminConfig, FacultyConfig, StudentConfig } from '@/types'

export const studentConfig: StudentConfig = {
	homeUrl: '/student',
	mainNav: [
		{
			title: 'Selected projects',
			href: '/student/selected',
		},
		{
			title: 'FAQ',
			href: '/student/faq',
		},
	],
}

export const facultyConfig: FacultyConfig = {
	homeUrl: '/faculty',
	mainNav: [
		{
			title: 'Project proposals',
			href: '/faculty/proposals',
		},
		{
			title: 'Mark entry',
			href: '/faculty/mark',
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
