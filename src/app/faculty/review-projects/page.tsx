import _ from 'lodash'
import { getServerSession } from 'next-auth'

import { columns } from '@/src/components/faculty/review-projects-table/columns'
import { DataTable } from '@/src/components/faculty/review-projects-table/data-table'
import { Header } from '@/src/components/header'
import { Badge } from '@/src/components/ui/badge'
import { authOptions } from '@/src/lib/auth'
import { prisma } from '@/src/lib/prisma'

const ReviewProjects = async () => {
  const session = await getServerSession(authOptions)
  const user = session?.user

  if (!user) return null

  const programmeUnderFaculty = await prisma.programme.findMany({
    where: {
      leaderId: user.facultyId
    }
  })

  const data = await prisma.project.findMany({
    where: {
      Programme: {
        leaderId: user.facultyId
      }
    },
    include: {
      Faculty: {
        select: {
          User: {
            select: {
              name: true
            }
          }
        }
      },
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
      description: project.description,
      programme: project.Programme?.name,
      proposer: project.Faculty.User.name,
      semester: project.Programme?.Semester?.name,
      status: project.status
    }
  })

  return (
    <div className='space-y-4'>
      <Header title='Review projects!' description='Approve or reject project under your programme' />

      <div className='flex gap-2 items-center'>
        {programmeUnderFaculty.map((programme) => (
          <Badge className='max-w-fit' key={programme.id}>
            {programme.name}
          </Badge>
        ))}
      </div>

      <DataTable columns={columns} data={projectSanitized} semesterOptions={semesterOptionsSanitized} />
    </div>
  )
}

export default ReviewProjects
