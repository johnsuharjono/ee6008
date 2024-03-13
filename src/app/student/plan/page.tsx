import { Grip } from 'lucide-react'
import { getServerSession } from 'next-auth'
import Link from 'next/link'

import { CardContainer } from '@/src/components/student/planner/card-container'
import { Alert, AlertDescription, AlertTitle } from '@/src/components/ui/alert'
import { Button } from '@/src/components/ui/button'
import { authOptions } from '@/src/lib/auth'
import { getActiveSemester } from '@/src/server/data/semester'
import { getStudentProjectPlan } from '@/src/server/student'

const StudentPlanPage = async () => {
  const session = await getServerSession(authOptions)
  const user = session?.user
  if (!user) return null
  if (!user.studentId) return null

  const semesterData = await getActiveSemester()

  if (!semesterData)
    return (
      <div>
        <p>No active semester found</p>
      </div>
    )

  const projectApplicationsLimit = semesterData.projectApplicationsLimit

  const data = await getStudentProjectPlan(user.studentId)

  return (
    <section className='space-y-6 pb-8 pt-6 md:pb-12 md:pt-10'>
      <div className='container flex max-w-[80rem] flex-col gap-4'>
        <h1 className='text-3xl font-semibold'>Welcome back, {user?.name}!</h1>
        <h3 className='text-muted-foreground text-lg'>Start planning your project</h3>
        <Alert className='max-w-[800px]'>
          <Grip className='h-4 w-4' />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription className='mt-2'>
            <p className='md:text-md'>
              Drag and drop the projects to your preference. Only the first {projectApplicationsLimit} project will be
              submitted.
              <br />
              Click on the card to view project details
            </p>
          </AlertDescription>
        </Alert>

        {data.length === 0 ? (
          <div className='grid gap-4'>
            <p>You dont have any project on your plan, start by adding project from the homepage.</p>
            <div>
              <Button>
                <Link href={'/student'}>Back to homepage</Link>
              </Button>
            </div>
          </div>
        ) : (
          <CardContainer plans={data} projectApplicationLimit={projectApplicationsLimit} />
        )}
      </div>
    </section>
  )
}

export default StudentPlanPage
