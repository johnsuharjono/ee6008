import FacultyUser from '@/components/admin/users/faculty/faculty-user'
import AddUser from '@/components/admin/users/add-user/add-user'
import { UserRole } from '@prisma/client'
import { Header } from '@/components/header'

const ManageFaculty = () => {
  return (
    <div className='space-y-4'>
      <Header
        title='Manage faculty user'
        description='Configure faculty account!'
      />
      <FacultyUser />
      <AddUser role={UserRole.FACULTY} />
    </div>
  )
}

export default ManageFaculty
