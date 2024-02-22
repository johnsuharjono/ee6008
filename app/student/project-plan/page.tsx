import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CardContainer } from '@/components/student/planner/card-container'
import { Grip } from 'lucide-react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

const ProjectPlan = async () => {
  const session = await getServerSession(authOptions)
  const user = session?.user
  if (!user) return null

  const semesterData = await prisma.semester.findFirst({
    where: {
      active: true
    },
    select: {
      projectApplicationsLimit: true
    }
  })

  if (!semesterData)
    return (
      <div>
        <p>No active semester found</p>
      </div>
    )

  const projectApplicationsLimit = semesterData.projectApplicationsLimit

  const data = await prisma.projectPlan.findMany({
    where: {
      studentId: user.studentId
    },
    include: {
      project: {
        include: {
          Programme: {
            select: {
              name: true
            }
          },
          Faculty: {
            include: {
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

  const sanitizedData = data.map((plan) => {
    return {
      id: plan.projectId,
      title: plan.project.title,
      faculty: plan.project.Faculty.User.name,
      programme: plan.project.Programme.name
    }
  })

  return (
    <section className='space-y-6 pb-8 pt-6 md:pb-12 md:pt-10'>
      <div className='container flex max-w-[80rem] flex-col gap-4'>
        <h1 className='text-3xl font-semibold'>Welcome back, {user?.name}!</h1>
        <h3 className='text-muted-foreground text-lg'>
          Start planning your project
        </h3>
        <Alert className='max-w-[800px]'>
          <Grip className='h-4 w-4' />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription className='mt-2'>
            <p className='md:text-md'>
              Drag and drop the projects to your preference. Only the first{' '}
              {projectApplicationsLimit} project will be submitted.
              <br />
              Click on the card to view project details
            </p>
          </AlertDescription>
        </Alert>

        {sanitizedData.length === 0 && <p>No project in your plan exist</p>}
        <CardContainer
          plans={sanitizedData}
          projectApplicationLimit={projectApplicationsLimit}
        />
      </div>
    </section>
  )
}

export default ProjectPlan
