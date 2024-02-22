import { AdminConfig, FacultyConfig, StudentConfig } from '@/types'

export const studentConfig: StudentConfig = {
	homeUrl: '/student',
	mainNav: [
		{
			title: 'Project Plan',
			href: '/student/project-plan',
		},
		{
			title: 'Project Registration',
			href: '/student/project-registration',
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
			title: 'View your projects',
			href: '/faculty/view-my-projects',
			icon: 'viewProject',
			type: 'link',
		},
		{
			title: 'View all projects',
			href: '/faculty/view-all-projects',
			icon: 'viewAllProjects',
			type: 'link',
		},
		{
			title: 'Marking',
			href: '/faculty/marking',
			icon: 'mark',
			type: 'link',
			disabled: true,
		},
	],
}

export const adminConfig: AdminConfig = {
	homeUrl: '/admin',
	mainNav: [],
	sideNav: [
		{
			title: 'Faculty',
			href: '/admin/users/manage-faculty',
			icon: 'user',
			type: 'link',
		},
		{
			title: 'Student',
			href: '/admin/users/manage-student',
			icon: 'student',
			type: 'link',
		},
		{
			title: 'Semester',
			href: '/admin/semester',
			icon: 'calendar',
			type: 'link',
		},
		{
			title: 'Registration',
			href: '/admin/registration',
			icon: 'registration',
			type: 'link',
		},
	],
}
