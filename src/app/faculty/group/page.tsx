import _ from 'lodash'
import { getServerSession } from 'next-auth'

import { ProjectMemberCard } from '@/src/components/faculty/project-member-card'
import { Header } from '@/src/components/header'
import { authOptions } from '@/src/lib/auth'
import { prisma } from '@/src/lib/prisma'
import { ProjectStatus } from '@prisma/client'

const GroupPage = async () => {
  const session = await getServerSession(authOptions)
  const user = session?.user

  if (!user) return null

  const myProjectsData = await prisma.project.findMany({
    where: {
      status: ProjectStatus.APPROVED,
      facultyId: user.facultyId,
      programme: {
        semester: {
          active: true
        }
      }
    },
    include: {
      students: {
        select: {
          matriculationNumber: true,
          user: {
            select: {
              name: true,
              email: true
            }
          }
        }
      }
    }
  })

  const sanitizedProjectData = myProjectsData.map((project) => {
    return {
      id: project.id,
      projectCode: project.projectCode,
      title: project.title,
      status: project.status,
      students: project.students.map((student) => {
        return {
          name: student.user.name,
          email: student.user.email,
          matriculationNumber: student.matriculationNumber
        }
      })
    }
  })
  return (
    <div className='space-y-4'>
      <Header title='Project group' description='Check the members of your project below' />
      <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-3'>
        {sanitizedProjectData.map((project) => (
          <ProjectMemberCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  )
}

export default GroupPage
