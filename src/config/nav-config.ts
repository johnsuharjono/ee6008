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
      title: 'Proposal',
      type: 'header'
    },
    {
      title: 'Add project',
      href: '/faculty/add-project',
      icon: 'addProject',
      type: 'link'
    },
    {
      title: 'Proposed project',
      href: '/faculty/my-proposal',
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
      title: 'Active project',
      type: 'header'
    },
    {
      title: 'Group',
      href: '/faculty/group',
      icon: 'student',
      type: 'link'
    },
    {
      title: 'Mark',
      href: '/faculty/mark',
      icon: 'mark',
      type: 'link'
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
      type: 'link'
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
