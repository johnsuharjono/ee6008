import { AdminConfig, FacultyConfig, StudentConfig } from '@/types'

export const studentConfig: StudentConfig = {
  homeUrl: '/student',
  mainNav: [
    {
      title: 'Plan',
      href: '/student/plan'
    },
    {
      title: 'Registration',
      href: '/student/registration'
    },
    {
      title: 'My Project',
      href: '/student/my-project'
    },
    {
      title: 'FAQ',
      href: '/student/faq'
    }
  ]
}

export const facultyConfig: FacultyConfig = {
  homeUrl: '/faculty',
  mainNav: [],
  sideNav: [
    {
      title: 'Dashboard',
      href: '/faculty',
      icon: 'home',
      type: 'link'
    },
    {
      title: 'Add project',
      href: '/faculty/add-project',
      icon: 'addProject',
      type: 'link'
    },
    {
      title: 'View your projects',
      href: '/faculty/view-my-projects',
      icon: 'viewProject',
      type: 'link'
    },
    {
      title: 'View all projects',
      href: '/faculty/view-all-projects',
      icon: 'viewAllProjects',
      type: 'link'
    },
    {
      title: 'Marking',
      href: '/faculty/marking',
      icon: 'mark',
      type: 'link',
      disabled: true
    }
  ]
}

export const adminConfig: AdminConfig = {
  homeUrl: '/admin',
  mainNav: [],
  sideNav: [
    {
      title: 'Users',
      type: 'header'
    },
    {
      title: 'Faculty',
      href: '/admin/users/manage-faculty',
      icon: 'user',
      type: 'link'
    },
    {
      title: 'Student',
      href: '/admin/users/manage-student',
      icon: 'student',
      type: 'link'
    },
    {
      title: 'Semester',
      type: 'header'
    },
    {
      title: 'Setting',
      href: '/admin/semester',
      icon: 'calendar',
      type: 'link'
    },
    {
      title: 'Venue',
      href: '/admin/venue',
      icon: 'venue',
      type: 'link',
      disabled: true
    },
    {
      title: 'Registration',
      type: 'header'
    },
    {
      title: 'View',
      href: '/admin/registration/view',
      icon: 'registration',
      type: 'link'
    },
    {
      title: 'Generate',
      href: '/admin/registration/generate',
      icon: 'generate',
      type: 'link'
    },
    {
      title: 'Upload',
      href: '/admin/registration/upload',
      icon: 'upload',
      type: 'link'
    },
    {
      title: 'Project',
      type: 'header'
    },
    {
      title: 'View',
      href: '/admin/project/view',
      icon: 'viewProject',
      type: 'link'
    }
  ]
}
