import AddUser from '@/src/components/admin/users/add-user/add-user'
import FacultyUser from '@/src/components/admin/users/faculty/faculty-user'
import { Header } from '@/src/components/header'
import { UserRole } from '@prisma/client'

const ManageFaculty = () => {
  return (
    <div className='space-y-4'>
      <Header title='Manage faculty user' description='Configure faculty account!' />
      <FacultyUser />
      <AddUser role={UserRole.FACULTY} />
    </div>
  )
}

export default ManageFaculty
