import _ from 'lodash'
import { getServerSession } from 'next-auth'

import { columns } from '@/src/components/faculty/view-my-projects-table/columns'
import { DataTable } from '@/src/components/faculty/view-my-projects-table/data-table'
import { Header } from '@/src/components/header'
import { authOptions } from '@/src/lib/auth'
import { prisma } from '@/src/lib/prisma'

const CreateProposal = async () => {
  const session = await getServerSession(authOptions)
  const user = session?.user

  if (!user) return null

  const data = await prisma.project.findMany({
    where: { facultyId: user.facultyId },
    include: {
      Programme: {
        select: {
          Semester: {
            select: {
              name: true
            }
          },
          name: true,
          Leader: {
            select: {
              User: {
                select: {
                  name: true
                }
              }
            }
          }
        }
      }
    }
  })

  const semesterOptions = _.uniq(data.map((project) => project.Programme?.Semester?.name))

  const semesterOptionsSanitized = semesterOptions.map((semester) => ({
    label: semester,
    value: semester
  }))

  const projectSanitized = data.map((project) => {
    return {
      id: project.id,
      title: project.title,
      status: project.status,
      semester: project.Programme?.Semester?.name,
      programme: project.Programme?.name,
      reviewer: project.Programme?.Leader?.User?.name
    }
  })

  return (
    <div className='space-y-8'>
      <div className='flex w-full flex-col gap-1'>
        <Header title='View your projects' description='Check the status of your project below' />

        <DataTable columns={columns} data={projectSanitized} semesterOptions={semesterOptionsSanitized} />
      </div>
    </div>
  )
}

export default CreateProposal
