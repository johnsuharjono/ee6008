import { CreateSemesterForm } from '@/src/components/admin/semester/create-semester-form'
import { Header } from '@/src/components/header'
import { prisma } from '@/src/lib/prisma'

const AddSemester = async () => {
  const faculties = await prisma.faculty.findMany({
    include: {
      User: {
        select: {
          id: true,
          name: true
        }
      }
    }
  })

  return (
    <div className='space-y-8'>
      <Header title='Add new semester' description='Configure the timeline, programme and programme leader!' />

      <CreateSemesterForm faculties={faculties} />
    </div>
  )
}

export default AddSemester
