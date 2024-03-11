import { getServerSession } from 'next-auth'

import { EditProjectForm } from '@/src/components/form/edit-project-form'
import { authOptions } from '@/src/lib/auth'
import { prisma } from '@/src/lib/prisma'
import { getProjectVenue } from '@/src/server/data/venue'

const EditProjectPage = async ({ params }: { params: { slug: string } }) => {
  const session = await getServerSession(authOptions)

  if (!session) return null

  const projectDetail = await prisma.project.findUnique({
    where: {
      id: params.slug,
      facultyId: session.user.facultyId
    },
    include: {
      Programme: {
        select: {
          name: true,
          semesterId: true
        }
      }
    }
  })

  if (!projectDetail) {
    return null
  }

  const sanitizedProjectDetail = {
    ...projectDetail,
    semesterId: projectDetail.Programme.semesterId,
    programmeName: projectDetail.Programme.name
  }

  // check available programme for the semester
  const programmeData = await prisma.programme.findMany({
    where: {
      semesterId: projectDetail.Programme.semesterId
    },
    select: {
      name: true
    }
  })

  const programmeOptions = programmeData.map((programme) => programme.name)

  const venueData = await getProjectVenue(sanitizedProjectDetail.semesterId)

  return (
    <div className='space-y-8'>
      <div className='flex w-full flex-col gap-1'>
        <h1 className='text-3xl font-semibold'>Edit Project</h1>
      </div>
      <div>
        <EditProjectForm data={sanitizedProjectDetail} programmeOptions={programmeOptions} venueOptions={venueData} />
      </div>
    </div>
  )
}

export default EditProjectPage
