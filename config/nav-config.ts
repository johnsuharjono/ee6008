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
			type: 'link',
		},
		{
			title: 'Add project',
			href: '/faculty/add-project',
			icon: 'addProject',
			type: 'link',
		},
		{
			title: 'View all project',
			href: '/faculty/view-projects',
			icon: 'viewProject',
			type: 'link',
		},
		{
			title: 'Marking',
			href: '/faculty/marking',
			icon: 'mark',
			type: 'link',
		},
	],
}

export const adminConfig: AdminConfig = {
	homeUrl: '/admin',
	mainNav: [],
	sideNav: [
		{
			title: 'Users management',
			type: 'header',
		},
		{
			title: 'Faculty',
			href: '/admin/users/manage-faculty',
			icon: 'user',
			type: 'link',
		},
		{
			title: 'Student',
			href: '/admin/users/manage-student',
			icon: 'user',
			type: 'link',
		},
		{
			title: 'Timeline',
			type: 'header',
		},
		{
			title: 'Manage',
			href: '/admin/timeline',
			icon: 'calendar',
			type: 'link',
		},
	],
}
