import { formatInTimeZone } from 'date-fns-tz'
import { RocketIcon } from 'lucide-react'
import { getServerSession } from 'next-auth'

import { Header } from '@/src/components/header'
import { columns } from '@/src/components/student/projects/columns'
import { DataTable } from '@/src/components/student/projects/data-table'
import { Alert, AlertDescription, AlertTitle } from '@/src/components/ui/alert'
import { authOptions } from '@/src/lib/auth'
import { prisma } from '@/src/lib/prisma'
import { getAvailableProjects } from '@/src/server/student'

export default async function Home() {
  const session = await getServerSession(authOptions)
  const activeSemester = await prisma.semester.findFirst({
    where: {
      active: true
    },
    select: {
      name: true,
      timeline: {
        select: {
          studentRegistrationStart: true,
          studentRegistrationEnd: true
        }
      }
    }
  })

  if (!activeSemester || !activeSemester.timeline) return <NotStudentRegistrationPeriod />

  const currentDate = new Date()
  const studentRegistrationStart = new Date(activeSemester.timeline.studentRegistrationStart)
  const studentRegistrationEnd = new Date(activeSemester.timeline.studentRegistrationEnd)

  if (currentDate < studentRegistrationStart || currentDate > studentRegistrationEnd) {
    return <NotStudentRegistrationPeriod startDate={studentRegistrationStart} endDate={studentRegistrationEnd} />
  }

  const projects = await getAvailableProjects()
  const programmeFilterOptions = Array.from(new Set(projects.map((project) => project.programme))).map((programme) => ({
    label: programme,
    value: programme
  }))

  return (
    <section className='space-y-6 py-6'>
      <div className='flex flex-col gap-4'>
        <Header
          title={`Welcome back, ${session?.user.name}!`}
          description={`Here are the list of projects available for ${activeSemester?.name}`}
        />
        <DataTable columns={columns} data={projects} programmeFilterOptions={programmeFilterOptions} />
      </div>
    </section>
  )
}

const NotStudentRegistrationPeriod = ({ startDate, endDate }: { startDate?: Date; endDate?: Date }) => {
  const timezone = 'Asia/Singapore'

  if (!startDate || !endDate)
    return (
      <div className='space-y-4'>
        <Header
          title='Student Registration'
          description='You can only register for projects during the student registration period'
        />
      </div>
    )

  return (
    <div className='space-y-4'>
      <Header
        title='Student Registration'
        description='You can only register for projects during the student registration period'
      />
      {startDate && endDate && (
        <Alert>
          <RocketIcon className='h-4 w-4' />
          <AlertTitle>Please comeback later!</AlertTitle>
          <AlertDescription>
            Project Registration will open from {formatInTimeZone(startDate, timezone, 'd MMMM yyyy, HH:mm:ss')} to{' '}
            {formatInTimeZone(endDate, timezone, 'd MMMM yyyy HH:mm:ss zzzz')}
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}
