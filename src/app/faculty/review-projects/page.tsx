import _ from 'lodash'
import { getServerSession } from 'next-auth'
import Link from 'next/link'

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

  const activeSemester = await prisma.semester.findFirst({
    where: {
      active: true
    },
    include: {
      timeline: {
        select: {
          facultyProposalReviewStart: true,
          facultyProposalReviewEnd: true
        }
      }
    }
  })

  const notFoundJSX = (
    <div className='space-y-4'>
      <Header
        title='Review projects!'
        description='You can only review projects during the faculty proposal review period'
      />
      <div>
        <Link className='text-primary hover:underline' href={'/faculty'}>
          Back to dashboard
        </Link>
      </div>
    </div>
  )

  // check if the current date is between the faculty proposal review start and end date
  if (!activeSemester || !activeSemester.timeline) return notFoundJSX

  const currentDate = new Date()
  const facultyProposalReviewStart = new Date(activeSemester.timeline.facultyProposalReviewStart)
  const facultyProposalReviewEnd = new Date(activeSemester.timeline.facultyProposalReviewEnd)

  if (currentDate < facultyProposalReviewStart || currentDate > facultyProposalReviewEnd) return notFoundJSX

  const programmeUnderFaculty = await prisma.programme.findMany({
    where: {
      leaderId: user.facultyId,
      semester: {
        active: true
      }
    }
  })

  const data = await prisma.project.findMany({
    where: {
      programme: {
        leaderId: user.facultyId,
        semester: {
          active: true
        }
      }
    },
    include: {
      faculty: {
        select: {
          user: {
            select: {
              name: true
            }
          }
        }
      },
      programme: {
        select: {
          semester: {
            select: {
              name: true
            }
          },
          name: true,
          leader: {
            select: {
              user: {
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

  const semesterOptions = _.uniq(data.map((project) => project.programme?.semester?.name))

  const semesterOptionsSanitized = semesterOptions.map((semester) => ({
    label: semester,
    value: semester
  }))

  const projectSanitized = data.map((project) => {
    return {
      id: project.id,
      title: project.title,
      description: project.description,
      programme: project.programme?.name,
      faculty: project.faculty.user.name,
      semester: project.programme?.semester?.name,
      status: project.status
    }
  })

  return (
    <div className='space-y-4'>
      <Header title='Review projects!' description='Approve or reject project under your programme' />

      <div className='flex items-center gap-2'>
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
