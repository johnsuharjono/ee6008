import { prisma } from '@/src/lib/prisma'

import { columns } from './student-table/columns'
import { DataTable } from './student-table/data-table'

const StudentUser = async () => {
  const studentUsers = await prisma.user.findMany({
    where: {
      role: 'STUDENT'
    },
    include: {
      student: true
    }
  })

  const dataSanitized = studentUsers.map((user) => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      studentId: user.student?.id || '',
      matriculationNumber: user.student?.matriculationNumber || ''
    }
  })

  return (
    <>
      <DataTable columns={columns} data={dataSanitized} />
    </>
  )
}

export default StudentUser
